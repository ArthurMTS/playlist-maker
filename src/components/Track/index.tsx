import { Button } from "@/components";

interface TrackProps {
  name: string;
  artist: string;
  album: string;
  type: "add" | "remove";
  onClick?: () => void;
}

export function Track({ name, artist, album, type, onClick }: TrackProps) {
  return (
    <div className="flex items-center w-96 justify-between bg-slate-700 dark:bg-slate-950 rounded-xl p-3">
      <div className="flex flex-col">
        <p className="text-slate-100 text-lg">{name}</p>
        <div className="flex gap-2 items-center">
          <p className="text-slate-300 text-sm">{artist}</p>
          <span className="text-slate-300">|</span>
          <p className="text-slate-300 text-sm">{album}</p>
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
