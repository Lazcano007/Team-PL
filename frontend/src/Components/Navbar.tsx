type Props = {
  current: "order" | "spin" | "history";
  onChange: (page: "order" | "spin" | "history") => void;
};

export default function Navbar({ current, onChange }: Props) {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-shade-50 text-shade-900 cursor-default">
      <div className="font-bold text-xl">Pedro</div>

      <div className="flex gap-4 text-xl">
        <button
          onClick={() => onChange("order")}
          className={
            current === "order"
              ? "underline cursor-pointer"
              : "hover:underline cursor-pointer"
          }
        >
          Lägg order
        </button>
        <button
          onClick={() => onChange("spin")}
          className={
            current === "spin"
              ? "underline cursor-pointer"
              : "hover:underline cursor-pointer"
          }
        >
          Snurra hjulet
        </button>
        <button
          onClick={() => onChange("history")}
          className={
            current === "history"
              ? "underline cursor-pointer"
              : "hover:underline cursor-pointer"
          }
        >
          Historik
        </button>
      </div>
    </nav>
  );
}
