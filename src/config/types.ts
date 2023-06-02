export interface iTrack {
  id: string;
  name: string;
  album: {
    name: string;
    images: [{ url: string }];
  };
  artists: [
    {
      name: string;
    },
  ];
  "preview_url": string | null;
}
