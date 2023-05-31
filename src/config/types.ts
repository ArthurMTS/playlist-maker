export interface iTokenParams {
  method: string;
  headers: {
    "Content-Type": string;
  };
  body: string;
}

export interface iRequestParams {
  headers: {
    Authorization: string;
  };
}
