import React from "react";

import { Button } from "@/components";
import { useAudio } from "@/hooks/useAudio";

interface TrackProps {
  name: string;
  image?: string;
  artist: string;
  album: string;
  preview_url: string | null;
  remove?: boolean;
  onClick?: () => void;
}

export function Track({
  name,
  image,
  artist,
  album,
  remove,
  onClick,
  preview_url,
}: TrackProps) {
  const [playing, toggle] = useAudio(preview_url || "");

  return (
    <div className="flex items-center justify-between bg-slate-950 hover:bg-slate-900 rounded-xl p-1 w-full">
      <div className="flex gap-4 items-center">
        <Button
          className="rounded-full p-1 bg-transparent hover:bg-transparent"
          onClick={typeof toggle === "boolean" ? () => {} : toggle}
        >
          <img
            src={playing ? "/icons/pause.svg" : "/icons/play.svg"}
            alt="toggle playing"
          />
        </Button>

        {image ? <img className="w-10" src={image} alt={name} /> : ""}

        <div className="flex flex-col">
        <p title={name} className="text-slate-100 font-mono text-sm xl:text-base whitespace-nowrap overflow-hidden text-ellipsis w-[200px] sm:w-full lg:w-[200px] xl:w-full">
          {name}
        </p>
          <div className="gap-2 items-center flex"> 
            <p title={artist} className="text-slate-300 text-xs whitespace-nowrap overflow-hidden text-ellipsis w-24 sm:w-40 lg:w-24 xl:w-40">
              {artist}
            </p>

            <span className="text-slate-300">|</span>

            <p title={album} className="text-slate-300 text-xs whitespace-nowrap overflow-hidden text-ellipsis w-24 sm:w-full lg:w-24 xl:w-full">
              {album}
            </p>
          </div>
        </div>
      </div>

      <Button
        className={`p-1 ${remove ? "bg-rose-600 hover:bg-red-700" : ""}`}
        onClick={onClick}
      >
        <img
          src={remove ? "/icons/trash.svg" : "/icons/plus.svg"}
          alt={remove ? "Remove icon" : "Add icon"}
        />
      </Button>
    </div>
  );
}
