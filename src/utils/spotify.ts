export const getAccessToken = async (clientID: string, clientSecret: string) => {
  const tokenParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
  };

  const result = await fetch(
    "https://accounts.spotify.com/api/token",
    tokenParams,
  ).then(result => result.json());

  return result.access_token;
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
