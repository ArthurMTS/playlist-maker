"use client";
import React from "react";

import { Button } from "@/components";
import { search } from "@/utils/spotify";
import { AccessTokenContext } from "@/contexts/accessToken";
import { TracksContext } from "@/contexts/tracks";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { accessToken } = React.useContext(AccessTokenContext);
  const { setTracks } = React.useContext(TracksContext);

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm === "" || !accessToken) return;
    let tracks = await search(searchTerm, accessToken);
    setTracks(tracks);
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2 mt-2 w-full border-b-2 pb-4 border-indigo-700">
      <input
        className="border text-base w-60 outline-indigo-700 ml-auto border-indigo-700 rounded py-1 px-2 focus:outline-none dark:bg-slate-900 dark:text-slate-100 sm:w-72 sm:text-lg"
        type="text"
        placeholder="Search for an artist, music or album"
        title="Search for an artist, music or album"
        value={searchTerm}
        onChange={onSearchInputChange}
        required
      />
      <Button className="p-1 mr-auto sm:p-2">
        <img src="/icons/search.svg" alt="" />
      </Button>
    </form>
  );
}
