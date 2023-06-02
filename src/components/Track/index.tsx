import { Button } from "@/components";

interface TrackProps {
  name: string;
  src?: string;
  artist: string;
  album: string;
  type: "add" | "remove";
  onClick?: () => void;
}

export function Track({ name, src, artist, album, type, onClick }: TrackProps) {
  return (
    <div className="flex items-center w-96 justify-between bg-slate-700 dark:bg-slate-950 rounded-xl p-3">
      <div className="flex gap-4 items-center">
        {src ? <img className="w-10" src={src} alt={name} /> : ""}
        <div className="flex flex-col">
          <p title={name} className="text-slate-100 text-lg">
            {name.length > 25 ? name.slice(0, 25) + "..." : name}
          </p>
          <div className="flex gap-2 items-center">
            <p className="text-slate-300 text-xs">{artist}</p>
            <span className="text-slate-300">|</span>
            <p title={album} className="text-slate-300 text-xs">
              {album.length > 25 ? album.slice(0, 25) + "..." : album}
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
