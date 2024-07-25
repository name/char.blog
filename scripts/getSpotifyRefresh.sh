#!/bin/bash

# Parameters
client_id="REPLACE_WITH_YOUR_CLIENT_ID"
client_secret="REPLACE_WITH_YOUR_CLIENT_SECRET"
redirect_uri="https://lennyomg.github.io/Spotify-PowerShell/index.html"
scope="user-read-currently-playing user-modify-playback-state"

# Step 1: Get Authorization Code
url="https://accounts.spotify.com/authorize?client_id=$client_id&response_type=code&redirect_uri=$redirect_uri&scope=$scope"
xdg-open "$url" 2>/dev/null || open "$url" 2>/dev/null || echo "Please open $url in your browser"
echo "Please authorize the application and enter the code from the redirect URL:"
read -p "Authorization Code: " auth_code

# Step 2: Exchange Authorization Code for Access and Refresh Tokens
token_response=$(curl -s -X POST https://accounts.spotify.com/api/token \
  -H "Authorization: Basic $(echo -n "$client_id:$client_secret" | base64)" \
  -d grant_type=authorization_code \
  -d code="$auth_code" \
  -d redirect_uri="$redirect_uri")

access_token=$(echo "$token_response" | jq -r .access_token)
refresh_token=$(echo "$token_response" | jq -r .refresh_token)

echo "Access Token: $access_token"
echo "Refresh Token: $refresh_token"

# Step 3: Refresh Access Token
refresh_response=$(curl -s -X POST https://accounts.spotify.com/api/token \
  -H "Authorization: Basic $(echo -n "$client_id:$client_secret" | base64)" \
  -d grant_type=refresh_token \
  -d refresh_token="$refresh_token")

new_access_token=$(echo "$refresh_response" | jq -r .access_token)
echo "New Access Token: $new_access_token"
