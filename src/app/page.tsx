"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button, Header, SearchBar, ListCard } from "@/components";
import { TracksContext } from "@/contexts/tracks";
import { AccessTokenContext } from "@/contexts/accessToken";
import { UserContext } from "@/contexts/user";
import { createPlaylist, populatePlaylist } from "@/utils/spotify";

export default function Home() {
  const [playlistName, setPlaylistName] = React.useState("New Playlist");
  const [href, setHref] = React.useState("");
  const { tracks, playlist, setPlaylist, addToPlaylist, removeFromPlaylist } =
    React.useContext(TracksContext);
  const { accessToken } = React.useContext(AccessTokenContext);
  const { user } = React.useContext(UserContext);

  const success = () => toast("Playlist create!");
  const error = () => toast("Someting gone wrong!");
  const onPlaylistNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPlaylistName(event.target.value);
  };
  const onSavePlaylistButtonClick = async () => {
    if (playlist.length <= 0 || !user) return;

    try {
      const newPlaylist = await createPlaylist(
        accessToken,
        playlistName,
        user?.id,
      );
      const uris = playlist.map(track => track.uri);
      await populatePlaylist(accessToken, newPlaylist.id, uris);
      setHref(newPlaylist.external_urls.spotify);
      setPlaylistName("New Playlist");
      setPlaylist([]);
      success();
    } catch (err) {
      console.error(err);
      error();
    }
  };

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center pt-20 dark:bg-slate-900">
        <ToastContainer />
        {user ? (
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
                  <Button
                    className="p-1 mt-2"
                    onClick={onSavePlaylistButtonClick}
                  >
                    Save Spotify
                  </Button>
                }
                href={href}
                redirect={
                  <a
                    className="text-lg text-slate-100 bg-indigo-700 p-1 rounded-xl hover:scale-105"
                    href={href}
                    target="_blank"
                    onClick={() => setHref("")}
                  >
                    Take a look!
                  </a>
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
