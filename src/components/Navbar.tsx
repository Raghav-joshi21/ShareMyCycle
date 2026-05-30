// components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-1.5 rounded-lg text-sm transition-all duration-200 relative ${
    isActive
      ? "text-brand-blue font-medium"
      : "text-text-tertiary hover:text-text-primary"
  }`;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-14 backdrop-blur-xl border-b border-border transition-all duration-200 ${
        scrolled ? "shadow-sm bg-white/90" : "bg-white/80"
      }`}
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-blue text-white font-bold shadow-xs">
            S
          </span>
          <span className="font-display font-bold text-lg text-text-primary">
            ShareMyCycle RTU
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          <NavLink to="/" end className={navLinkClass}>
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

        {/* Desktop login */}
        <Link
          to="/login"
          className="hidden md:inline-flex rounded-full bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue-dark transition-colors"
        >
          Login
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden md:hidden bg-white/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 pb-4 pt-2 flex flex-col gap-1">
              <NavLink to="/" end className={navLinkClass} onClick={() => setMobileOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/browse" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                Browse
              </NavLink>
              <NavLink to="/list" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                List
              </NavLink>
              <NavLink to="/dashboard" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                Dashboard
              </NavLink>
              <NavLink to="/about" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                About
              </NavLink>
              <Link
                to="/login"
                className="mt-2 inline-flex justify-center rounded-full bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue-dark transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
