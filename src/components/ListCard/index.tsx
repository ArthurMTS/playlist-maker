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

export function ListCard({
  list,
  onClick,
  title,
  button,
  redirect,
  href,
  playlist = false,
}: ListCardProps) {
  return (
    <section className="w-full flex flex-col items-center gap-1 mb-2 w-1/3">
      {title}

      <div className="flex flex-col overflow-y-auto p-1 max-h-80 w-full gap-1 sm:w-9/12 lg:w-5/6">
        {list.map((track) => (
          <Track
            key={track.id}
            name={track.name}
            image={track.album.images[0]?.url}
            artist={track.artists[0]?.name}
            album={track.album.name}
            preview_url={track.preview_url}
            remove={playlist}
            onClick={() => onClick(track)}
          />
        ))}
      </div>

      {list.length > 0 ? button : ""}
      {href !== "" ? redirect : ""}
    </section>
  );
}
