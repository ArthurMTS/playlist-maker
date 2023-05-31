import { iRequestParams, iTokenParams } from "@/config/types";

export const getAccessToken = async (tokenParams: iTokenParams) => {
  const result = await fetch(
    "https://accounts.spotify.com/api/token",
    tokenParams,
  ).then(result => result.json());

  return result.access_token;
};

export const search = async (searchTerm: string, requestParams: iRequestParams) => {
  const result = await fetch(
    `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
    requestParams,
  ).then(result => result.json());

  return result.tracks.items;
};
