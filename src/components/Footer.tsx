// components/Footer.tsx
import { Link } from "react-router-dom";
import { Bike } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A]">
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand + tagline */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Bike className="h-5 w-5 text-white/70" />
              <span className="font-serif font-bold text-white">
                ShareMyCycle RTU
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Cheaper than scooters · cleaner than cars · made for students
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-1">
              Quick links
            </p>
            {[
              { to: "/", label: "Home" },
              { to: "/browse", label: "Browse" },
              { to: "/list", label: "List a cycle" },
              { to: "/dashboard", label: "Dashboard" },
              { to: "/about", label: "About" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="link-hover text-sm text-white/70 hover:text-white/90 transition-colors w-fit"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Attribution */}
          <div className="flex flex-col gap-2 md:items-end">
            <p className="text-sm text-white/70">
              © {year} · Built for Climathon, Riga
            </p>
          </div>
        </div>

        <p className="text-xs text-white/30 mt-8 text-center">Designed with care at RTU</p>
      </motion.div>
    </footer>
  );
}
