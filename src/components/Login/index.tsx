import React from "react";

import { Button } from "@/components";
import { UserContext } from "@/contexts/user";

interface LoginProps {
  onLogin: () => void;
  onLogout: () => void;
}

export function Login({ onLogin, onLogout }: LoginProps) {
  const { username } = React.useContext(UserContext);

  return (
    <>
      {!username ? (
        <Button className="p-2" onClick={onLogin}>
          Log in
        </Button>
      ) : (
        <p className="text-lg text-slate-100 text-mono">
          {username} <Button className="p-1 text-sm" onClick={onLogout}>Log out</Button>
        </p>
      )}
    </>
  );
}
