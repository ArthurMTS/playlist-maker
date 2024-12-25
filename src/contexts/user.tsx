"use client";
import React from "react";

import { AccessTokenContext } from "@/contexts/accessToken";
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
  const { accessToken } = React.useContext(AccessTokenContext);

  React.useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) return;
      
      try {
        const user = await getProfile(accessToken);
        setUser(user);
      } catch (err) {
        console.error(err);
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
