"use client";
import React from "react";

import { Button, Header, SearchBar, Track } from "@/components";
import { AccessTokenContext } from "@/contexts/accessToken";
import { TracksContext } from "@/contexts/tracks";
import { iTrack } from "@/config/types";

export default function Home() {
  const [token, setToken] = React.useState("");
  const [playlistName, setPlaylistName] = React.useState("New Playlist");
  const [playlist, setPlaylist] = React.useState<iTrack[]>([]);
  const { accessToken } = React.useContext(AccessTokenContext);
  const { tracks } = React.useContext(TracksContext);

  React.useEffect(() => {
    setToken(accessToken);
  }, [accessToken]);

  const onPlaylistNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPlaylistName(event.target.value);
  };
  const addTrackToPlaylist = (newTrack: iTrack) => {
    const isInTheList = playlist.some(track => track.id === newTrack.id);
    if (isInTheList) return;
    const list = [...playlist];
    list.push(newTrack);
    setPlaylist(list);
  };
  const removeTrackFromPlaylist = (trackID: string) => {
    const list = playlist.filter(track => track.id !== trackID);
    setPlaylist(list);
  };
  const onSavePlaylistButtonClick = () => {
    if (playlist.length <= 0) return;
  };

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center pt-24 dark:bg-slate-900">
        <SearchBar />

        <div className="flex gap-20 mt-5">
          <section className="flex flex-col items-center gap-5">
            <h2 className="p-2 text-2xl font-mono font-bold dark:text-slate-100">
              Results
            </h2>

            <div className="flex flex-col gap-2 overflow-y-auto h-80 p-2">
              {tracks.map(track => (
                <Track
                  key={track.id}
                  name={track.name}
                  src={track.album.images[0]?.url}
                  artist={track.artists[0]?.name}
                  album={track.album.name}
                  preview_url={track.preview_url}
                  type="add"
                  onClick={() => addTrackToPlaylist(track)}
                />
              ))}
            </div>
          </section>

          <section className="flex flex-col items-center gap-5">
            <input
              className="bg-transparent font-bold font-mono cursor-pointer text-center outline-0 text-2xl dark:text-slate-100 border-none rounded-xl p-2 focus:border-indigo-700"
              type="text"
              title="Click to change playlist name"
              placeholder="Playlist Title"
              value={playlistName}
              onChange={onPlaylistNameInputChange}
            />

            <div className="flex flex-col gap-2 overflow-y-auto max-h-80 p-2">
              {playlist.map(track => (
                <Track
                  key={track.id}
                  name={track.name}
                  src={track.album.images[0]?.url}
                  artist={track.artists[0]?.name}
                  album={track.album.name}
                  preview_url={track.preview_url}
                  type="remove"
                  onClick={() => removeTrackFromPlaylist(track.id)}
                />
              ))}
            </div>

            <Button onClick={onSavePlaylistButtonClick}>Save Spotify</Button>
          </section>
        </div>
      </main>
    </>
  );
}
