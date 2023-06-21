import React from "react";

import { Button, TrackText, TrackTitle } from "@/components";
import { useAudio } from "@/hooks/useAudio";
import { getTextSize } from "@/utils/functions";

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
          onClick={typeof toggle === "boolean" ? () => {} : toggle}
        >
          <img
            src={playing ? "/icons/pause.svg" : "/icons/play.svg"}
            alt="toggle playing"
          />
        </Button>

        {image ? <img className="w-10" src={image} alt={name} /> : ""}

        <div className="flex flex-col">
          <TrackTitle name={name} textSize={textSize} />
          <div className="gap-2 items-center hidden sm:flex">
            <TrackText text={artist} textSize={textSize} />
            <span className="text-slate-300">|</span>
            <TrackText text={album} textSize={textSize} />
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
