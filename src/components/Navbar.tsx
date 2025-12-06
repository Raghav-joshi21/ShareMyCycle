// components/Navbar.tsx
import { Link, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
    isActive
      ? "bg-[#DDBA7D] text-slate-900 shadow-sm"
      : "text-slate-800 hover:bg-[#F5E8C0] hover:text-slate-900"
  }`;

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[#E4D6A8] bg-[#FCF6D9]/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-slate-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#DDBA7D] text-slate-900 font-bold shadow-sm">
            S
          </span>
          <span className="font-semibold text-lg">ShareMyCycle RTU</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2 text-sm">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/browse" className={navLinkClass}>
            Browse
          </NavLink>
          <NavLink to="/list" className={navLinkClass}>
            List
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </nav>
        <button className="hidden md:inline-flex rounded-full border border-[#DDBA7D] bg-[#DDBA7D]/70 px-3 py-1.5 text-sm text-slate-900 hover:bg-[#DDBA7D]">
          Login (mock)
        </button>
      </div>
    </header>
  );
}
