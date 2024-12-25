"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button, Header, ListCard } from "@/components";
import { AccessTokenContext } from "@/contexts/accessToken";
import { TracksContext } from "@/contexts/tracks";
import { UserContext } from "@/contexts/user";
import { createPlaylist, populatePlaylist } from "@/utils/spotify";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [playlistTitle, setPlaylistTitle] = React.useState("New Playlist");
  const [hrefToPlaylist, setHrefToPlaylist] = React.useState("");
  const { tracks, playlist, setPlaylist, addToPlaylist, removeFromPlaylist } =
    React.useContext(TracksContext);
  const { accessToken } = React.useContext(AccessTokenContext);
  const { user } = React.useContext(UserContext);

  const success = () => toast("Playlist created!");

  const error = () => toast("Something went wrong!");

  const ontitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPlaylistTitle(event.target.value);
  
  const onSavePlaylistButtonClick = async () => {
    if (playlist.length <= 0 || !user || !accessToken) return;

    try {
      const newPlaylist = await createPlaylist(accessToken, playlistTitle, user.id);
      const uris = playlist.map((track) => track.uri);
      await populatePlaylist(accessToken, newPlaylist.id, uris);
      setHrefToPlaylist(newPlaylist.external_urls.spotify);
      success();
    } catch (err) {
      console.error(err);
      error();
    } finally {
      setPlaylistTitle("New Playlist");
      setPlaylist([]);
    }
  };

  return (
    <>
      <Header />
      <main className={`h-full min-h-screen flex bg-slate-200 dark:bg-slate-950 ${user ? "lg:min-h-[74.6vh]" : "lg:min-h-[85.5vh]"}`}>
        <ToastContainer />
        {user ? (
          <div className="flex gap-10 mt-4 flex-col lg:flex-row w-full lg:justify-center">
            <ListCard
              title={
                <h2 className="p-2 text-xl font-mono font-bold dark:text-slate-100">
                  Results
                </h2>
              }
              list={tracks}
              onClick={addToPlaylist}
            />

            <ListCard
              title={
                <input
                  className="bg-transparent font-bold font-mono cursor-pointer text-center outline-0 text-xl dark:text-slate-100 border-none rounded-xl p-2 focus:border-indigo-700"
                  type="text"
                  title="Click to change playlist name"
                  placeholder="Playlist Title"
                  value={playlistTitle}
                  onChange={ontitleInputChange}
                />
              }
              list={playlist}
              href={hrefToPlaylist}
              onClick={removeFromPlaylist}
              playlist
              button={
                <Button
                  className="px-2 py-1 text-lg font-mono mt-2 rounded"
                  onClick={onSavePlaylistButtonClick}
                >
                  Create Playlist
                </Button>
              }
              redirect={
                <a
                  className="text-lg text-slate-100 bg-indigo-700 px-2 py-1 font-mono rounded-full hover:scale-105"
                  href={hrefToPlaylist}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setHrefToPlaylist("")}
                >
                  Look your new playlist
                </a>
              }
            />
          </div>
        ) : (
          ""
        )}
      </main>
      <Footer />
    </>
  );
}
