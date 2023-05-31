"use client";
import React from "react";

import { API_KEYS } from "@/config/apiKeys";
import { getTokenParams } from "@/utils/params";
import { getAccessToken } from "@/utils/spotify";
import { useStorage } from "@/hooks/useStorage";

interface iAccessTokenContext {
  accessToken: string;
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
    const handleToken = async () => {
      if (accessToken !== "") return;

      const tokenParams = getTokenParams(
        API_KEYS.CLIENT_ID,
        API_KEYS.CLIENT_SECRET,
      );
      const token = await getAccessToken(tokenParams);
      setAccessToken(token);
    };

    handleToken();
  }, []);

  return (
    <AccessTokenContext.Provider value={{ accessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};
