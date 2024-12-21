"use client";
import React, { useState } from "react";

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
  const [accessToken, setAccessToken] = useState("");

  React.useEffect(() => {
    const fetchToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) return;

      try {
        const token = await getToken(code);
        setAccessToken(token);
      } catch(err) {
        console.error(err);
      }
    };
    
    const token = localStorage.getItem("access_token");
    if (token) setAccessToken(token);
    else fetchToken();
  }, []);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};
