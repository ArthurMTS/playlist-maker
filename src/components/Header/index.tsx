"use client";
import React from "react";

import { useStorage } from "@/hooks/useStorage";

export function Header() {
  const [theme, setTheme] = useStorage("theme", "dark");

  React.useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <header className="fixed flex justify-between px-20 items-center w-screen h-20 bg-slate-700 dark:bg-slate-950">
      <h1 className="text-slate-200 text-3xl font-mono">Make-a-'list</h1>

      <div className="flex items-center gap-4">
        <a
          className="cursor-pointer p-1 transition-colors rounded-lg hover:bg-slate-800"
          href="https://github.com/ArthurMTS"
          target="_blank"
        >
          <img src="/icons/github.svg" width={20} height={20} />
        </a>
        <img
          className="cursor-pointer bg-slate-900 p-1 transition-colors rounded-lg hover:bg-slate-800"
          src={theme === "dark" ? "/icons/sun.svg" : "/icons/moon.svg"}
          alt="theme toggler"
          width={25}
          height={25}
          onClick={toggleTheme}
        />
      </div>
    </header>
  );
}
