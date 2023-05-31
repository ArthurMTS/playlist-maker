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
      <main className="flex min-h-screen flex-col items-center pt-24">
        <SearchBar />

        <div className="flex gap-20 mt-5">
          <section className="flex flex-col items-center gap-5">
            <h2 className="p-2">Results</h2>

            <div>
              <Track
                name="Throught the Valley"
                artist="Shawn James"
                album="Shapeshifters"
              />
            </div>
          </section>

          <section className="flex flex-col items-center gap-5">
            <input
              className="bg-transparent border-none rounded-xl p-2 focus:border-indigo-700"
              type="text"
              value={playlistName}
              onChange={onPlaylistNameInputChange}
            />

            <div>
              <Track
                name="Billie Jean"
                artist="Michael Jackson"
                album="Sei não man"
              />
            </div>

            <Button>Save Spotify</Button>
          </section>
        </div>
      </main>
    </>
  );
}
