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
  {} as iAccessTokenContext
);

export const AccessTokenProvider = ({ children }: AccessTokenProviderProps) => {
  const [accessToken, setAccessToken] = useStorage("token");

  React.useEffect(() => {
    const fetchToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get("code");

      try {
        const token = await getToken(code);
        setAccessToken(token);
      } catch (err) {
        console.error(err);
      }
    };
    fetchToken();
  }, []);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};
