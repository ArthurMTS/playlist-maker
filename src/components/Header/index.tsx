"use client";
import React from "react";

import { useStorage } from "@/hooks/useStorage";
import { Login } from "@/components";
import { generateCodeChallenge, generateRandomString } from "@/utils/functions";
import { API_KEYS } from "@/config/apiKeys";
import { baseAuth, redirectUri, scope } from "@/config/consts";
import { AccessTokenContext } from "@/contexts/accessToken";
import { TracksContext } from "@/contexts/tracks";
import { UserContext } from "@/contexts/user";

export function Header() {
  const [theme, setTheme] = useStorage("theme", "dark");
  const { setAccessToken } = React.useContext(AccessTokenContext);
  const { setTracks, setPlaylist } = React.useContext(TracksContext);
  const { setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };
  const onLogInButtonClick = () => {
    let codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then(codeChallenge => {
      let state = generateRandomString(16);

      localStorage.setItem("code_verifier", codeVerifier);

      let args = new URLSearchParams({
        response_type: "code",
        client_id: API_KEYS.CLIENT_ID,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
      });

      window.location.href = baseAuth + "?" + args;
    });
  };
  const onLogOutButtonClick = () => {
    setUser(null);
    setAccessToken("");
    setTracks([]);
    setPlaylist([]);
  };

  return (
    <header className="fixed flex justify-between px-5 items-center w-screen h-10 bg-slate-700 dark:bg-slate-950 sm:h-14">
      <h1 className="text-slate-200 text-base font-mono sm:text-lg xl:text-3xl">
        Make-a-'list
      </h1>

      <div className="flex items-center justify-center gap-2 xl:gap-4">
        <a
          className="cursor-pointer p-1 transition-colors rounded-lg hover:bg-slate-800"
          href="https://github.com/ArthurMTS"
          target="_blank"
        >
          <img
            className="xl:w-4"
            src="/icons/github.svg"
            width={15}
            height={15}
          />
        </a>
        <img
          className="cursor-pointer bg-slate-900 p-1 transition-colors rounded-lg hover:bg-slate-800 xl:w-6"
          src={theme === "dark" ? "/icons/sun.svg" : "/icons/moon.svg"}
          alt="theme toggler"
          width={20}
          height={20}
          onClick={toggleTheme}
        />
        <Login onLogin={onLogInButtonClick} onLogout={onLogOutButtonClick} />
      </div>
    </header>
  );
}
