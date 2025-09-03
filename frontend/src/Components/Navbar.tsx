import React from 'react'
type Props = {
  current: "order" |  "spin" | "history";
  onChange: (page: "order" | "spin" | "history") => void;
};

export default function Navbar({ current, onChange }: Props) {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b bg-white">
      <div className="font-bold">Pedro</div>

      <div className="flex gap-4 text-xl">
        <button onClick={() => onChange("order")}className={ current === "order" ? "font-semibold underline" : "hover:underline"} >Lägg order</button>
        <span className="text-zinc-400">Snurra hjul</span>
        <button onClick={() => onChange("history")} className={ current === "history" ? "font-semibold underline" : "hover:underline"}>Historik</button>
      </div>
    </nav>
  );
}
