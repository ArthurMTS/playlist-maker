"use client";
import React from "react";

import { Button } from "@/components";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-4">
      <input
        className="border border-indigo-700 rounded-xl p-2"
        type="text"
        placeholder="Search for an artist, music or album"
        title="Search for an artist, music or album"
        value={searchTerm}
        onChange={onSearchInputChange}
        required
      />
      <Button>Search</Button>
    </form>
  );
}
