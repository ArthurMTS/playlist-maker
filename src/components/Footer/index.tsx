"use client";
import React, { useState } from "react";

import { useStorage } from "@/hooks/useStorage";

export function Footer() {
  const [theme, setTheme] = useStorage("theme", "dark");
  const [icon, setIcon] = useState("/icons/sun.svg");

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIcon("/icons/sun.svg");
    } else {
      document.documentElement.classList.remove("dark");
      setIcon("/icons/moon.svg");
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <footer className="w-full p-2 flex absolute bottom-0 items-center justify-center gap-2 xl:gap-4">
      <a
        className="cursor-pointer bg-slate-900 p-1 transition-colors rounded-lg hover:bg-slate-800"
        href="https://github.com/ArthurMTS"
        target="_blank"
      >
        <img
          className="w-4 h-4"
          src="/icons/github.svg"
          width={15}
          height={15}
        />
      </a>
      <img
        className="cursor-pointer w-6 h-6 bg-slate-900 p-1 transition-colors rounded-lg hover:bg-slate-800"
        src={icon}
        alt="theme toggler"
        onClick={toggleTheme}
      />
    </footer>
  );
}
