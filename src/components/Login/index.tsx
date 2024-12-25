import React from "react";

import { Button } from "@/components";
import { UserContext } from "@/contexts/user";

interface LoginProps {
  onLogin: () => void;
  onLogout: () => void;
}

export function Login({ onLogin, onLogout }: LoginProps) {
  const [logIcon, setLogIcon] = React.useState("");
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    if (user) setLogIcon("log-out.svg");
    else setLogIcon("log-in.svg");
  }, [user])

  return (
    <div className="flex items-center gap-2 mr-0 m-auto m-0">
      {user ? (
        <p className="flex items-center justify-center gap-1 text-xs text-slate-600 dark:text-slate-400 text-mono md:text-sm md:gap-2">
          <img
            className="w-8 rounded bg-slate-900 dark:bg-transparent"
            src={
              user?.images?.length > 0
                ? user?.images[0]?.url
                : "/icons/user.svg"
            }
            alt="user avatar"
          />
          {user.display_name}{" "}
        </p>
      ) : (
        ""
      )}
      <Button
        className="bg-transparent hover:bg-transparent"
        onClick={user ? onLogout : onLogin}
      >
        <img
          className="bg-slate-900 p-2 rounded-full"
          src={`/icons/${logIcon}`}
          alt={user ? "Log out icon" : "Log in icon"}
          title={user ? "Log Out" : "Log In"}
        />
      </Button>
    </div>
  );
}
