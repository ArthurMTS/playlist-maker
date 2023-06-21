import React from "react";

import { Button } from "@/components";
import { useAudio } from "@/hooks/useAudio";
import { getTextSize } from "@/utils/functions";

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
  const [textSize, setTextSize] = React.useState(25);

  React.useEffect(() => {
    window.addEventListener("resize", () => setTextSize(getTextSize()));

    return window.removeEventListener("resize", () =>
      setTextSize(getTextSize())
    );
  }, []);

  return (
    <div className="flex items-center justify-between bg-slate-950 hover:bg-slate-900 rounded-xl p-1 w-full">
      <div className="flex gap-4 items-center">
        <Button
          className="rounded-full p-1 bg-transparent hover:bg-transparent"
          onClick={toggle}
        >
          <img
            src={playing ? "/icons/pause.svg" : "/icons/play.svg"}
            alt="play icon"
          />
        </Button>

        {src ? <img className="w-10" src={src} alt={name} /> : ""}

        <div className="flex flex-col">
          <p
            title={name}
            className="text-slate-100 font-mono text-sm xl:text-base"
          >
            {name.length > textSize ? name.slice(0, textSize) + "..." : name}
          </p>
          <div className="gap-2 items-center hidden sm:flex">
            <p className="text-slate-300 text-xs">
              {artist.length > textSize
                ? artist.slice(0, textSize) + "..."
                : artist}
            </p>
            <span className="text-slate-300">|</span>
            <p title={album} className="text-slate-300 text-xs">
              {album.length > textSize
                ? album.slice(0, textSize) + "..."
                : album}
            </p>
          </div>
        </div>
      </div>

      {type === "add" ? (
        <Button className="p-1" onClick={onClick}>
          <img src="/icons/plus.svg" alt="Add icon" />
        </Button>
      ) : type === "remove" ? (
        <Button className="p-1 bg-rose-600 hover:bg-red-700" onClick={onClick}>
          <img src="/icons/trash.svg" alt="Remove icon" />
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}
