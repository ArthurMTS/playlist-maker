"use client";
import React from "react";
import { AccessTokenContext } from "./accessToken";
import { getProfile } from "@/utils/spotify";
import { TracksContext } from "./tracks";

interface iUserContext {
  username: string;
  setUsername: (token: string) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = React.createContext({} as iUserContext);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [username, setUsername] = React.useState("");
  const { accessToken } = React.useContext(AccessTokenContext);
  const { setAccessToken } = React.useContext(AccessTokenContext);
  const { setTracks, setPlaylist } = React.useContext(TracksContext);

  React.useEffect(() => {
    if (accessToken) {
      try {
        getProfile(accessToken).then(result =>
          setUsername(result.display_name),
        );
      } catch (err) {
        setAccessToken("");
        setTracks([]);
        setPlaylist([]);
        setUsername("");
      }
    }
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
