import { API_KEYS } from "@/config/apiKeys";
import { baseToken, redirectUri } from "@/config/consts";

export const getToken = async (code: string | null) => {
  let codeVerifier = localStorage.getItem("code_verifier");

  if (!code || !codeVerifier) return null;

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
    client_id: API_KEYS.CLIENT_ID,
    code_verifier: codeVerifier,
  });

  const requestParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  };

  const response = await fetch(baseToken, requestParams).then((response) =>
    response.json()
  );

  return response.access_token;
};

export const getProfile = async (accessToken: string) => {
  const requestParams = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await fetch("https://api.spotify.com/v1/me", requestParams);

  return await response.json();
};

export const search = async (searchTerm: string, accessToken: string) => {
  const requestParams = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await fetch(
    `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
    requestParams
  ).then((response) => response.json());

  return response.tracks.items;
};

export const createPlaylist = async (
  accessToken: string,
  name: string,
  userId: string
) => {
  const requestParams = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  };

  const response = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    requestParams
  );

  return await response.json();
};

export const populatePlaylist = async (
  accessToken: string,
  playlistId: string,
  tracks: string[]
) => {
  const requestParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ uris: tracks }),
  };

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    requestParams
  );

  return await response.json();
};
