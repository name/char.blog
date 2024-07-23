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
    { title: "digital gardens - char.blog" },
    { name: "description", content: "infra, swe, and ml ~ dm's open." },
  ];
};

export default function Index() {
  const { track } = useLoaderData<typeof loader>();

  if (!track) {
    return <p>Having problems!!</p>;
  }

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
            <p className="text-xs p-2">thinking ~alot</p>
          </section>
          <section className="my-2 border border-black divide-y divide-black">
            <h2 className="font-bold text-xs p-2">Recently played</h2>
            <div className="p-2">
              <img className="border border-black" src={track.coverArt} alt={track.title} />
              <div className="text-xs overflow-hidden">
                <MusicCard
                  title={track.title}
                  artist={track.artist}
                  coverArt={track.coverArt}
                  previewUrl={track.previewUrl}
                  songUrl={track.songUrl}
                >
                  <div className="hover:bg-green-400 hover:text-white cursor-pointer mt-2">
                    <div className="truncate font-bold">{track.title}</div>
                    <div className="truncate">by {track.artist}</div>
                  </div>
                </MusicCard>
              </div>
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
            <h2 className="font-bold text-xs p-2">Digital Gardens</h2>
            <p className="text-xs p-2">
              this is a list of digital gardens that i love or get inspired by. if you have one, please share it with me!
            </p>
          </section>
          <section className="my-2 border border-black divide-y divide-black">
            <h2 className="font-bold text-xs p-2">Links</h2>
            <ul className="p-2 text-xs">
              <li><a href="https://hitorilabs.com/" className="hover:text-green-400">✸ hitorilabs.com</a></li>
              <li><a href="https://juw.ee/" className="hover:text-green-400">✸ juw.ee</a></li>
              <li><a href="https://ana.sh/" className="hover:text-green-400">✸ ana.sh</a></li>
              <li><a href="https://qtnx.ai/" className="hover:text-green-400">✸ qtnx.ai</a></li>
              <li><a href="https://echo4eva.com/" className="hover:text-green-400">✸ echo4eva.com</a></li>
              <li><a href="https://shen.land/" className="hover:text-green-400">✸ shen.land</a></li>
              <li><a href="https://simo.sh/" className="hover:text-green-400">✸ simo.sh</a></li>
              <li><a href="https://kennethnym.com/" className="hover:text-green-400">✸ kennethnym.com</a></li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
