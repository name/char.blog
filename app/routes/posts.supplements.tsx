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
    { title: "supplements - char.blog" },
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
            <h2 className="font-bold text-xs p-2">Supplements</h2>
            <p className="text-xs p-2">
            This document is an updated list of the supplements/drugs that I take daily. It contains information on exactly what I take, how much of it, how much it costs, and some information which should roughly explain my reasons for taking it. <br></br><br></br>
            This isn't meant to push any specific agenda or give advice. Think of it as a collection of bite-sized summaries that might be useful. <br></br><br></br>
            I'm not a doctor, so don't take this as medical advice. When it comes to supplements, it's a super personal decision. Your age, diet, lifestyle, genes, risk tolerance, and budget all play a role in what might work for you.
            </p>
          </section>
          <section className="my-2 border border-black divide-y divide-black">
            <h2 className="font-bold text-xs p-2">Current Supplements</h2>
            <p className="text-xs p-2">
              <strong>Vitamin D3</strong><br />
              - Dosage: 10,000 IU (every 10 days)<br />
              - Info: Vitamin D3 is crucial for bone health, immune function, and may offer protection against certain diseases.<br /><br />

              <strong>Vitamin K2 MK-7</strong><br />
              - Dosage: 200µg (100µg x 2)<br />
              - Info: Vitamin K2 MK-7 is important for bone and cardiovascular health, with potential benefits for reducing the risk of heart disease and improving bone health.<br /><br />

              <strong>Iron</strong><br />
              - Dosage: 34mg (x1)<br />
              - Info: Iron is essential for transporting oxygen in the blood and preventing anaemia.<br /><br />

              <strong>Zinc</strong><br />
              - Dosage: 15mg (x1)<br />
              - Info: Zinc plays a role in immune function and wound healing.<br /><br />

              <strong>Copper</strong><br />
              - Dosage: 1mg (x1)<br />
              - Info: Copper is important for energy production and nervous system health.<br /><br />

              <strong>Vitamin C</strong><br />
              - Dosage: 75mg (x1)<br />
              - Info: Vitamin C is an antioxidant that supports the immune system and skin health.<br /><br />

              <strong>Vitamin K2 MK-4</strong><br />
              - Dosage: 200µg (100µg x 2)<br />
              - Info: Vitamin K2 MK-4 is also important for bone health and blood clotting.<br /><br />

              <strong>Vitamin B12</strong><br />
              - Dosage: 5,000µg (x1)<br />
              - Info: Vitamin B12 is vital for nerve function and the production of DNA and red blood cells.<br /><br />

              <strong>Glycine</strong><br />
              - Dosage: 1-2g (every night before bed)<br />
              - Info: Glycine has shown improvements for sleep quality and to reduce sleepiness and fatigue the day after.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
