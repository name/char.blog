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
    { title: "homelab - char.blog" },
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
            <h2 className="font-bold text-xs p-2">Homelab</h2>
            <p className="text-xs p-2">
              this post will be updated as i continue to build out my homelab. i'm looking to migrate some additional services out of a rackspace and into my own infrastructure.
            </p>
          </section>
          <section className="my-2 border border-black divide-y divide-black">
            <h2 className="font-bold text-xs p-2">Services</h2>
            <ul className="p-2 text-xs">
              <li>✸ this website</li>
              <li>✸ personal projects</li>
              <li>✸ mysql database clusters</li>
              <li>✸ kubernetes cluster (x2)</li>
              <li>✸ hyper-v cluster (x3)</li>
              <li>✸ nginx</li>
              <li>✸ bitwarden</li>
              <li>✸ teamspeak</li>
              <li>✸ plex</li>
              <li>✸ grafana</li>
              <li>✸ dns servers</li>
              <li>✸ other stuff</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
