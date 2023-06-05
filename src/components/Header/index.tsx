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
    <header className="fixed flex justify-between px-5 items-center w-screen h-10 bg-slate-700 dark:bg-slate-950 sm:h-14">
      <h1 className="text-slate-200 text-base font-mono sm:text-lg xl:text-3xl">Make-a-'list</h1>

      <div className="flex items-center gap-2 xl:gap-4">
        <a
          className="cursor-pointer p-1 transition-colors rounded-lg hover:bg-slate-800"
          href="https://github.com/ArthurMTS"
          target="_blank"
        >
          <img className="xl:w-4" src="/icons/github.svg" width={15} height={15} />
        </a>
        <img
          className="cursor-pointer bg-slate-900 p-1 transition-colors rounded-lg hover:bg-slate-800 xl:w-6"
          src={theme === "dark" ? "/icons/sun.svg" : "/icons/moon.svg"}
          alt="theme toggler"
          width={20}
          height={20}
          onClick={toggleTheme}
        />
      </div>
    </header>
  );
}
