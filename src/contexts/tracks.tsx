"use client";
import React from "react";

import { iTrack } from "@/config/types";

interface iTracksContext {
  tracks: iTrack[];
  setTracks: (tracks: iTrack[]) => void;
}

interface TracksProviderProps {
  children: React.ReactNode;
}

export const TracksContext = React.createContext(
  {} as iTracksContext,
);

export const TracksProvider = ({ children }: TracksProviderProps) => {
  const [tracks, setTracks] = React.useState<iTrack[]>([]);

  return (
    <TracksContext.Provider value={{ tracks, setTracks }}>
      {children}
    </TracksContext.Provider>
  );
};
