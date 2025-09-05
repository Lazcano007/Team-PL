import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-shade-50 text-shade-900 cursor-default">
      <div className="font-bold text-xl">Pedro</div>

      <div className="flex gap-4 text-xl">
        <NavLink
          to="/order"
          className={({ isActive }) =>
            isActive
              ? "underline cursor-pointer"
              : "hover:underline cursor-pointer"
          }
        >
          Lägg order
        </NavLink>

        <NavLink
          to="/spin"
          className={({ isActive }) =>
            isActive
              ? "underline cursor-pointer"
              : "hover:underline cursor-pointer"
          }
        >
          Snurra hjulet
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive
              ? "underline cursor-pointer"
              : "hover:underline cursor-pointer"
          }
        >
          Historik
        </NavLink>
      </div>
    </nav>
  );
}
