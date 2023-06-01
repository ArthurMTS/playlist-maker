"use client";
import React from "react";

import { Button, Header, SearchBar, Track } from "@/components";
import { AccessTokenContext } from "@/contexts/accessToken";

export default function Home() {
  const [token, setToken] = React.useState("");
  const [playlistName, setPlaylistName] = React.useState("New Playlist");
  const { accessToken } = React.useContext(AccessTokenContext);

  React.useEffect(() => {
    setToken(accessToken);
  }, [accessToken]);

  const onPlaylistNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPlaylistName(event.target.value);
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
              <Track
                name="Throught the Valley"
                artist="Shawn James"
                album="Shapeshifters"
                type="add"
              />
              <Track
                name="Throught the Valley"
                artist="Shawn James"
                album="Shapeshifters"
                type="add"
              />
              <Track
                name="Throught the Valley"
                artist="Shawn James"
                album="Shapeshifters"
                type="add"
              />
              <Track
                name="Throught the Valley"
                artist="Shawn James"
                album="Shapeshifters"
                type="add"
              />
              <Track
                name="Throught the Valley"
                artist="Shawn James"
                album="Shapeshifters"
                type="add"
              />
              <Track
                name="Throught the Valley"
                artist="Shawn James"
                album="Shapeshifters"
                type="add"
              />
              <Track
                name="Throught the Valley"
                artist="Shawn James"
                album="Shapeshifters"
                type="add"
              />
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

            <div className="flex flex-col gap-2 overflow-y-auto h-80 p-2">
              <Track
                name="Billie Jean"
                artist="Michael Jackson"
                album="Sei não man"
                type="remove"
              />
              <Track
                name="Billie Jean"
                artist="Michael Jackson"
                album="Sei não man"
                type="remove"
              />
              <Track
                name="Billie Jean"
                artist="Michael Jackson"
                album="Sei não man"
                type="remove"
              />
              <Track
                name="Billie Jean"
                artist="Michael Jackson"
                album="Sei não man"
                type="remove"
              />
              <Track
                name="Billie Jean"
                artist="Michael Jackson"
                album="Sei não man"
                type="remove"
              />
              <Track
                name="Billie Jean"
                artist="Michael Jackson"
                album="Sei não man"
                type="remove"
              />
              <Track
                name="Billie Jean"
                artist="Michael Jackson"
                album="Sei não man"
                type="remove"
              />
            </div>

            <Button>Save Spotify</Button>
          </section>
        </div>
      </main>
    </>
  );
}
