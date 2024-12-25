import React from "react";

import { Button } from "@/components";

interface TrackProps {
  name: string;
  image?: string;
  artist: string;
  album: string;
  spotify_url: string;
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
  spotify_url,
}: TrackProps) {
  return (
    <div className="flex items-center justify-between bg-slate-950 hover:bg-slate-900 rounded-xl p-1 w-full">
      <div className="flex gap-4 items-center">
        <a className="cursor-pointer" href={spotify_url} target="_blank" rel="noopener noreferrer" title="Listen on spotify">
          <img
            width={30}
            src="/icons/spotify.svg"
            alt="spotify icon"
          />
        </a>

        {image ? 
          <img className="w-10" src={image} alt={name} /> :
          <img className="w-10" src="/icons/music.svg" alt="Music note icon" />
        }

        <div className="flex flex-col">
          <p title={name} className="text-slate-100 font-mono text-sm xl:text-base whitespace-nowrap overflow-hidden text-ellipsis w-[200px] sm:w-full lg:w-  [200px] xl:w-full">
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
