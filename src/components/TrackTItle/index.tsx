interface TrackTitleProps {
  name: string;
  textSize: number;
}

export function TrackTitle({ name, textSize }: TrackTitleProps) {
  return (
    <p title={name} className="text-slate-100 font-mono text-sm xl:text-base">
      {name.length > textSize ? name.slice(0, textSize) + "..." : name}
    </p>
  );
}
