"use client";
import React from "react";

import { Login, SearchBar } from "@/components";
import { base64encode, generateRandomString, sha256 } from "@/utils/functions";
import { baseAuth, redirectUri, scope } from "@/config/consts";
import { AccessTokenContext } from "@/contexts/accessToken";
import { TracksContext } from "@/contexts/tracks";
import { UserContext } from "@/contexts/user";

export function Header() {
  const { setTracks, setPlaylist } = React.useContext(TracksContext);
  const { setAccessToken } = React.useContext(AccessTokenContext);
  const { user, setUser } = React.useContext(UserContext);

  const onLogInButtonClick = async () => {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    window.localStorage.setItem("code_verifier", codeVerifier);
    const authUrl = new URL(baseAuth);

    const params =  {
      response_type: "code",
      client_id: process.env.NEXT_PUBLIC_ENV_LOCAL_CLIENT_ID || "",
      scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };

  const onLogOutButtonClick = () => {
    setUser(null);
    setAccessToken("");
    setTracks([]);
    setPlaylist([]);
    localStorage.removeItem("code_verifier");
    localStorage.removeItem("access_token");
  };

  return (
    <header className="flex flex-wrap justify-between px-5 pt-2 items-center w-screen bg-slate-200 dark:bg-slate-950">
      <h1 className="flex items-center text-slate-750 text-sm sm:text-xl font-mono flex gap-2 dark:text-slate-200">
        <img
          className="bg-slate-900 p-2 rounded-full"
          src="/icons/headphones.svg"
          alt="headphone logo"
        />
        Make-a-'list
      </h1>

      <Login onLogin={onLogInButtonClick} onLogout={onLogOutButtonClick} />
      {user ? <SearchBar /> : ""}
    </header>
  );
}
