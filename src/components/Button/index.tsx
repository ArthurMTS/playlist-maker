import React from "react";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ className, children, onClick }: ButtonProps) {
  return (
    <button
      className={`bg-indigo-700 rounded-full p-1 text-slate-100 transition-color hover:bg-indigo-800 xl:p-2 ${className}`}
      type="submit"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
