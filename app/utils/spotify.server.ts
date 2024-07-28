// app/utils/spotify.server.ts

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${BASIC}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN ?? "",
    }),
  });

  return response.json().then(res => res.access_token);
}

async function getNowPlaying() {
  const accessToken = await getAccessToken();

  try {
    const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (nowPlayingResponse.status === 200) {
      const item = await nowPlayingResponse.json();
      
      if (item.item) {
        const coverArt = item.item.album?.images?.[0]?.url || 
                         item.item.show?.images?.[0]?.url || 
                         null;

        return {
          title: item.item.name,
          artist: item.currently_playing_type === 'episode' 
            ? item.item.show?.name || 'Unknown Show'
            : item.item.artists?.map((artist: { name: string }) => artist.name).join(', ') || 'Unknown Artist',
          itemUrl: item.item.external_urls?.spotify || null,
          coverArt,
          previewUrl: item.item.audio_preview_url || item.item.preview_url || null,
          isPlaying: item.is_playing,
          type: item.currently_playing_type,
        };
      }
    } else if (nowPlayingResponse.status === 204 || nowPlayingResponse.status > 400) {
      // No track currently playing, fetch recently played
      const recentlyPlayedResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (recentlyPlayedResponse.status === 200) {
        const data = await recentlyPlayedResponse.json();
        const recentItem = data.items?.[0]?.track;
        if (recentItem) {
          return {
            title: recentItem.name,
            artist: recentItem.artists?.map((artist: { name: string }) => artist.name).join(', ') || 'Unknown Artist',
            itemUrl: recentItem.external_urls?.spotify || null,
            coverArt: recentItem.album?.images?.[0]?.url || null,
            previewUrl: recentItem.preview_url || null,
            isPlaying: false,
            type: 'track',
          };
        }
      }
    }
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
  }

  return 'No data available';
}

export { getNowPlaying };
