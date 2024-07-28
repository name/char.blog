import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { getNowPlaying } from "~/utils/spotify.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MusicCard } from '~/components/MusicCard';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from '@remix-run/react';

export const loader: LoaderFunction = async () => {
  const track = await getNowPlaying();
  return json({ track });
};

export const meta: MetaFunction = () => {
  return [
    { title: "char.blog" },
    { name: "description", content: "infra, swe, and ml ~ dm's open." },
  ];
};

export default function Index() {
  const { track } = useLoaderData<typeof loader>();

  const isTrackObject = typeof track === 'object' && track !== null;

  return (
    <div className="p-4 divide-y divide-black">
      <header className="wrapper-header pb-2">
        <span className="">チャーリー</span>
        <h1 className="font-bold text-lg"><a href="/">char.blog</a></h1>
        <p className="text-sm">infra, swe, and ml ~ dm's open.</p>
      </header>
      <div className="bg-white grid grid-cols-[5fr_13fr] pt-2">
        <aside className="block isolate min-w-0">
          <section className="my-2 border border-black divide-y divide-black">
            <h2 className="font-bold text-xs p-2">Status</h2>
            <p className="text-xs p-2">currently relaxing</p>
          </section>
          <section className="my-2 border border-black divide-y divide-black">
            <h2 className="font-bold text-xs p-2">Recently played</h2>
            <div className="p-2">
              {isTrackObject ? (
                <>
                  <img className="border border-black" src={track.coverArt || ''} alt={track.title} />
                  <div className="text-xs overflow-hidden">
                    <MusicCard
                      title={track.title}
                      artist={track.artist}
                      coverArt={track.coverArt || ''}
                      previewUrl={track.previewUrl || ''}
                      songUrl={track.itemUrl || ''}
                    >
                      <div className="hover:bg-green-400 hover:text-white cursor-pointer mt-2">
                        <div className="truncate font-bold">{track.title}</div>
                        <div className="truncate">by {track.artist}</div>
                      </div>
                    </MusicCard>
                  </div>
                </>
              ) : (
                <p className="text-xs">{track}</p>
              )}
            </div>
          </section>
          <section className="my-2 border border-black divide-y divide-black">
            <h2 className="font-bold text-xs p-2">Links</h2>
            <ul className="p-2 text-xs">
              <li>x.com/<a href="https://x.com/cunjur" target="_blank" className="hover:text-green-400">cunjur</a></li>
              <li>github.com/<a href="https://github.com/name" target="_blank" className="hover:text-green-400">name</a></li>
              <li><a href="mailto:char@char.blog" target="_blank" className="hover:text-green-400">char@char.blog</a></li>
            </ul>
          </section>
          <section className="my-2 border border-black divide-y divide-black">
            <h2 className="font-bold text-xs p-2">Visitors</h2>
            <a href="https://info.flagcounter.com/1VOn"><img src="https://s01.flagcounter.com/count2/1VOn/bg_FFFFFF/txt_000000/border_FFFFFF/columns_2/maxflags_10/viewers_3/labels_0/pageviews_0/flags_0/percent_1/" alt="Flag Counter"></img></a>
          </section>
        </aside>
        <main className="block isolate min-w-0 ml-2">
          <section className="my-2 border border-black divide-y divide-black">
            <h2 className="font-bold text-xs p-2">About me</h2>
            <p className="text-xs p-2">
              i'm a technical consultant with an interest in infra, swe, and ml.<br></br>
              most of my work is in system architecture, networking, and security.<br></br>
              i enjoy listening to music (jazz, artcore, dnb), reading (non-fiction, manga), and running.
            </p>
          </section>
          <section className="my-2 border border-black divide-y divide-black">
            <h2 className="font-bold text-xs p-2">Recent posts</h2>
            <ul className="p-2 text-xs">
              <li><a href="/posts/supplements" className="hover:text-green-400">24-07-28 :: supplements</a></li>
              <li><a href="/posts/homelab" className="hover:text-green-400">24-07-23 :: homelab</a></li>
              <li><a href="/posts/new" className="hover:text-green-400">24-07-23 :: new website</a></li>
              <li><a href="/posts/gardens" className="hover:text-green-400">24-07-14 :: digital gardens</a></li>
            </ul>
          </section>
          <section className="my-2 border border-black divide-y divide-black">
            <h2 className="font-bold text-xs p-2">Network</h2>
            <p className="text-xs p-2">
              if your inquiry is related to a network i manage or control, please send an email to my email listed on the respective whois contact. if it's a p1 issue or a security vulnerability, please include "p1" or "security" in the subject line.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
