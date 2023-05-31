"use client";
import React from "react";

import { AccessTokenContext } from "@/contexts/accessToken";

export default function Home() {
  const [token, setToken] = React.useState("");
  const { accessToken } = React.useContext(AccessTokenContext);

  React.useEffect(() => {
    setToken(accessToken);
  }, [accessToken]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello, world!</h1>
    </main>
  );
}
