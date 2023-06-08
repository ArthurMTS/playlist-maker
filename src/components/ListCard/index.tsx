import React from "react";

import { Track } from "@/components";
import { iTrack } from "@/config/types";

interface ListCardProps {
  list: iTrack[];
  onClick: (value: iTrack) => void;
  title: React.ReactNode;
  button?: React.ReactNode;
  redirect?: React.ReactNode;
  href?: string;
  playlist?: boolean;
}

export function ListCard({ list, onClick, title, button, redirect, href, playlist = false }: ListCardProps) {
  return (
    <section className="flex flex-col items-center gap-1 mb-4">
      {title}

      <div className="flex flex-col gap-1 overflow-y-auto max-h-60 p-1 lg:max-h-80 xl:gap-2 xl:p-2">
        {list.map(track => (
          <Track
            key={track.id}
            name={track.name}
            src={track.album.images[0]?.url}
            artist={track.artists[0]?.name}
            album={track.album.name}
            preview_url={track.preview_url}
            type={playlist ? "remove" : "add"}
            onClick={() => onClick(track)}
          />
        ))}
      </div>

      {list.length > 0 ? button : ""}
      {href !== "" ? redirect : ""}
    </section>
  );
}
