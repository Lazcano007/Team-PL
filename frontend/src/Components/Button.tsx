import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function Button({ children, onClick, type = "button" }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full rounded-lg bg-indigo-200 px-4 py-2 text-sm font-semibold hover:bg-indigo-300 transition cursor-pointer"
    >
      {children}
    </button>
  );
}
