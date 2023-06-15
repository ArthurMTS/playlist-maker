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
        <Button
          className="bg-transparent hover:bg-transparent"
          onClick={onLogin}
        >
          <img src="/icons/log-in.svg" alt="log in icon" title="Log In" />
        </Button>
      ) : (
        <p className="flex items-center justify-center gap-1 text-xs text-slate-400 text-mono md:text-sm md:gap-2">
          <img
            className="w-8 rounded"
            src={
              user?.images?.length > 0 ? user?.images[0]?.url : "/icons/user.svg"
            }
            alt="usar avatar"
          />
          {user.display_name}{" "}
          <Button
            className="bg-transparent hover:bg-transparent"
            onClick={onLogout}
          >
            <img src="/icons/log-out.svg" alt="log Out icon" title="Log Out" />
          </Button>
        </p>
      )}
    </div>
  );
}
