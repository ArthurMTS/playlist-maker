import React from "react";

export const useStorage = (key: string, initialValue?: string) => {
  const [value, setValue] = React.useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(key) || initialValue || "";
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue] as const;
};
