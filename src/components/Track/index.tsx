import React from "react";

import { Button } from "@/components";
import { useAudio } from "@/hooks/useAudio";

interface TrackProps {
  name: string;
  src?: string;
  artist: string;
  album: string;
  preview_url: string | null;
  type: "add" | "remove";
  onClick?: () => void;
}

export function Track({
  name,
  src,
  artist,
  album,
  type,
  onClick,
  preview_url,
}: TrackProps) {
  const [playing, toggle] = useAudio(preview_url || "");

  return (
    <div className="flex items-center w-96 justify-between bg-slate-700 dark:bg-slate-950 rounded-xl p-3">
      <div className="flex gap-4 items-center">
        <Button className="rounded-full bg-blue-500 hover:bg-blue-600" onClick={toggle}>
          <img src={playing ? "/icons/pause.svg" : "/icons/play.svg"} alt="play icon" />
        </Button>

        {src ? <img className="w-10" src={src} alt={name} /> : ""}

        <div className="flex flex-col">
          <p title={name} className="text-slate-100 text-lg">
            {name.length > 20 ? name.slice(0, 20) + "..." : name}
          </p>
          <div className="flex gap-2 items-center">
            <p className="text-slate-300 text-xs">{artist}</p>
            <span className="text-slate-300">|</span>
            <p title={album} className="text-slate-300 text-xs">
              {album.length > 15 ? album.slice(0, 15) + "..." : album}
            </p>
          </div>
        </div>
      </div>

      {type === "add" ? (
        <Button onClick={onClick}>
          <img src="/icons/plus.svg" alt="Add icon" />
        </Button>
      ) : type === "remove" ? (
        <Button className="bg-red-600 hover:bg-red-700" onClick={onClick}>
          <img src="/icons/trash.svg" alt="Remove icon" />
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}
