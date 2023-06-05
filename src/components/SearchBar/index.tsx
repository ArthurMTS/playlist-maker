"use client";
import React from "react";

import { Button } from "@/components";
import { getAccessToken, search } from "@/utils/spotify";
import { AccessTokenContext } from "@/contexts/accessToken";
import { TracksContext } from "@/contexts/tracks";
import { iTrack } from "@/config/types";
import { API_KEYS } from "@/config/apiKeys";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { accessToken, setAccessToken } = React.useContext(AccessTokenContext);
  const { setTracks } = React.useContext(TracksContext);

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm === "" || !accessToken) return;
    let tracks: iTrack[] = [];

    try {
      tracks = await search(searchTerm, accessToken);
    } catch (err) {
      console.log(err);
      const token = await getAccessToken(API_KEYS.CLIENT_ID, API_KEYS.CLIENT_SECRET);
      setAccessToken(token);
      tracks = await search(searchTerm, accessToken);
    }

    setTracks(tracks);
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        className="border text-sm outline-indigo-700 border-indigo-700 rounded-xl p-1 dark:bg-slate-900 dark:text-slate-100 xl:text-xl xl:p-2"
        type="text"
        placeholder="Search for an artist, music or album"
        title="Search for an artist, music or album"
        value={searchTerm}
        onChange={onSearchInputChange}
        required
      />
      <Button className="text-sm xl:text-xl xl:p-2">Search</Button>
    </form>
  );
}
