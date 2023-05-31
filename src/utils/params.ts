import { iRequestParams, iTokenParams } from "@/config/types";

export const getTokenParams = (
  clientID: string,
  clientSecret: string,
): iTokenParams => ({
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
});

export const getRequestParams = (accessToken: string): iRequestParams => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
