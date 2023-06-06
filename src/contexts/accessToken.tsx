"use client";
import React from "react";

import { useStorage } from "@/hooks/useStorage";
import { getToken } from "@/utils/spotify";

interface iAccessTokenContext {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

interface AccessTokenProviderProps {
  children: React.ReactNode;
}

export const AccessTokenContext = React.createContext(
  {} as iAccessTokenContext,
);

export const AccessTokenProvider = ({ children }: AccessTokenProviderProps) => {
  const [accessToken, setAccessToken] = useStorage("token");

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    getToken(code)?.then(token => setAccessToken(token));
  }, []);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};
