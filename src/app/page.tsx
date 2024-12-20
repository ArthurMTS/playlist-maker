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
  const [title, setTitle] = React.useState("New Playlist");
  const [href, setHref] = React.useState("");
  const { tracks, playlist, setPlaylist, addToPlaylist, removeFromPlaylist } =
    React.useContext(TracksContext);
  const { accessToken } = React.useContext(AccessTokenContext);
  const { user } = React.useContext(UserContext);

  const success = () => toast("Playlist create!");
  const error = () => toast("Someting gone wrong!");
  const ontitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onSavePlaylistButtonClick = async () => {
    if (playlist.length <= 0 || !user) return;

    try {
      const newPlaylist = await createPlaylist(accessToken, title, user?.id);
      const uris = playlist.map((track) => track.uri);
      await populatePlaylist(accessToken, newPlaylist.id, uris);
      setHref(newPlaylist.external_urls.spotify);
      setTitle("New Playlist");
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
      <main className="h-screen flex flex-col items-center pt-36 bg-slate-200 dark:bg-slate-950 sm:pt-24">
        <ToastContainer />
        {user ? (
          <div className="flex gap-10 my-4 flex-col lg:flex-row w-full justify-center">
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
                  value={title}
                  onChange={ontitleInputChange}
                />
              }
              list={playlist}
              href={href}
              onClick={removeFromPlaylist}
              playlist
              button={
                <Button
                  className="p-2 font-mono mt-2 rounded"
                  onClick={onSavePlaylistButtonClick}
                >
                  Save Spotify
                </Button>
              }
              redirect={
                <a
                  className="text-lg text-slate-100 bg-indigo-700 p-2 font-mono rounded-full hover:scale-105"
                  href={href}
                  target="_blank"
                  onClick={() => setHref("")}
                >
                  Take a look!
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
