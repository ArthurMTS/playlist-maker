"use client";
import React from "react";

import { Button, Header, SearchBar, ListCard } from "@/components";
import { TracksContext } from "@/contexts/tracks";
import { UserContext } from "@/contexts/user";

export default function Home() {
  const [playlistName, setPlaylistName] = React.useState("New Playlist");
  const { tracks, playlist, addToPlaylist, removeFromPlaylist } =
    React.useContext(TracksContext);
  const { username } = React.useContext(UserContext);

  const onPlaylistNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPlaylistName(event.target.value);
  };
  const onSavePlaylistButtonClick = () => {
    if (playlist.length <= 0) return;
  };

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center pt-20 dark:bg-slate-900">
        {username !== "" ? (
          <>
            <SearchBar />

            <div className="flex gap-2 mt-2 flex-col lg:flex-row xl:mt-8">
              <ListCard
                title={
                  <h2 className="p-2 text-base font-mono font-bold dark:text-slate-100 sm:text-lg xl:text-3xl">
                    Results
                  </h2>
                }
                list={tracks}
                onClick={addToPlaylist}
              />

              <ListCard
                title={
                  <input
                    className="bg-transparent font-bold font-mono cursor-pointer text-center outline-0 text-base dark:text-slate-100 border-none rounded-xl p-2 focus:border-indigo-700 sm:text-lg xl:text-3xl"
                    type="text"
                    title="Click to change playlist name"
                    placeholder="Playlist Title"
                    value={playlistName}
                    onChange={onPlaylistNameInputChange}
                  />
                }
                list={playlist}
                button={
                  <Button onClick={onSavePlaylistButtonClick}>
                    Save Spotify
                  </Button>
                }
                onClick={removeFromPlaylist}
                playlist
              />
            </div>
          </>
        ) : (
          ""
        )}
      </main>
    </>
  );
}
