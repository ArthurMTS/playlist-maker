import React from "react";

import { Button } from "@/components";
import { UserContext } from "@/contexts/user";

interface LoginProps {
  onLogin: () => void;
  onLogout: () => void;
}

export function Login({ onLogin, onLogout }: LoginProps) {
  const { user } = React.useContext(UserContext);

  return (
    <div className="m-auto sm:m-0">
      {!user ? (
        <Button className="text-xs p-1 md:p-2 md:text-sm" onClick={onLogin}>
          Log in
        </Button>
      ) : (
        <p className="flex items-center justify-center gap-1 text-xs text-slate-100 text-mono md:text-base md:gap-2">
          {user.display_name} <Button className="text-xs p-1 md:text-sm md:p-2" onClick={onLogout}>Log out</Button>
        </p>
      )}
    </div>
  );
}
