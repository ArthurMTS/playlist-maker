import { Inter } from "next/font/google";

import { AccessTokenProvider } from "@/contexts/accessToken";
import { TracksProvider } from "@/contexts/tracks";
import { UserProvider } from "@/contexts/user";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Playlist Maker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AccessTokenProvider>
      <TracksProvider>
        <UserProvider>
          <html lang="en">
            <head>
              <link rel="icon" href="/icons/headphones.svg" sizes="any" />
            </head>
            <body className={inter.className}>{children}</body>
          </html>
        </UserProvider>
      </TracksProvider>
    </AccessTokenProvider>
  );
}
