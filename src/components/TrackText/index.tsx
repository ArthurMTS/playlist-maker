interface TrackTextProps {
  text: string;
  textSize: number;
}

export function TrackText({ text, textSize }: TrackTextProps) {
  return (
    <p className="text-slate-300 text-xs">
      {text.length > textSize ? text.slice(0, textSize) + "..." : text}
    </p>
  );
}
