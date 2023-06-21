"use client";
import React from "react";

import { AccessTokenContext } from "@/contexts/accessToken";
import { TracksContext } from "@/contexts/tracks";
import { getProfile } from "@/utils/spotify";
import { iUser } from "@/config/types";

interface iUserContext {
  user: iUser | null;
  setUser: (user: iUser | null) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = React.createContext({} as iUserContext);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = React.useState<iUser | null>(null);
  const { accessToken, setAccessToken } = React.useContext(AccessTokenContext);
  const { setTracks, setPlaylist } = React.useContext(TracksContext);

  React.useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken || accessToken === "") return;
      try {
        const user = await getProfile(accessToken);
        setUser(user);
      } catch (err) {
        console.error(err);
        setAccessToken("");
        setTracks([]);
        setPlaylist([]);
        setUser(null);
      }
    };
    fetchUser();
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
