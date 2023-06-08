import React from "react";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ className, children, onClick }: ButtonProps) {
  return (
    <button
      className={`bg-indigo-700 rounded-full text-slate-100 transition-color hover:bg-indigo-800 ${className}`}
      type="submit"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
