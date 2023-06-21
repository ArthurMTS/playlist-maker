"use client";
import React from "react";

import { iTrack } from "@/config/types";

interface iTracksContext {
  tracks: iTrack[];
  setTracks: (tracks: iTrack[]) => void;
  playlist: iTrack[];
  setPlaylist: (tracks: iTrack[]) => void;
  addToPlaylist: (newTrack: iTrack) => void;
  removeFromPlaylist: (trackToRemove: iTrack) => void;
}

interface TracksProviderProps {
  children: React.ReactNode;
}

export const TracksContext = React.createContext({} as iTracksContext);

export const TracksProvider = ({ children }: TracksProviderProps) => {
  const [tracks, setTracks] = React.useState<iTrack[]>([]);
  const [playlist, setPlaylist] = React.useState<iTrack[]>([]);

  const addToPlaylist = (newTrack: iTrack) => {
    const isInTheList = playlist.some((track) => track.id === newTrack.id);
    if (isInTheList) return;
    const list = [...playlist];
    list.push(newTrack);
    setPlaylist(list);
  };
  const removeFromPlaylist = (trackToRemove: iTrack) => {
    const list = playlist.filter((track) => track.id !== trackToRemove.id);
    setPlaylist(list);
  };

  return (
    <TracksContext.Provider
      value={{
        tracks,
        setTracks,
        playlist,
        setPlaylist,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {children}
    </TracksContext.Provider>
  );
};
