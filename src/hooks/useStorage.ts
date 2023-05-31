import React from "react";

export const useStorage = (key: string) => {
  const [value, setValue] = React.useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(key) || "";
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue] as const;
};
