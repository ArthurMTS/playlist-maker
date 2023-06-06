import { API_KEYS } from "@/config/apiKeys";
import { baseToken, redirectUri } from "@/config/consts";

export const getToken = (code: string | null) => {
  let codeVerifier = localStorage.getItem("code_verifier");

  if (!code || !codeVerifier) return null;

  let body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
    client_id: API_KEYS.CLIENT_ID,
    code_verifier: codeVerifier,
  });

  return fetch(baseToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      return response.json();
    })
    .then(data => {
      return data.access_token;
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

export const search = async (searchTerm: string, accessToken: string) => {
  const requestParams = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const result = await fetch(
    `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
    requestParams,
  ).then(result => result.json());

  return result.tracks.items;
};

export const getProfile = async (accessToken: string) => {
  const requestParams = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const result = await fetch("https://api.spotify.com/v1/me", requestParams);

  return await result.json();
};
