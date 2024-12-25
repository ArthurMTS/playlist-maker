export interface iTrack {
  id: string;
  name: string;
  uri: string;
  album: {
    name: string;
    images: [{ url: string }];
  };
  artists: [
    {
      name: string;
    }
  ];
  external_urls: {
    spotify: string;
  }
}

export interface iUser {
  id: string;
  display_name: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
}
