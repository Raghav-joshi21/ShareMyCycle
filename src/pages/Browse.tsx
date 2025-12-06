// pages/Browse.tsx
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { mockCycles } from "../data";
import type { Cycle } from "../types";
import { CycleCard } from "../components/CycleCard";

const dualBg =
  "bg-gradient-to-br from-[#8CA9FF]/35 via-[#8CA9FF]/10 to-[#BF1A1A]/22";

export function Browse() {
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(5);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const minPriceValue = 1;
  const maxPriceValue = 6;

  // 0 → 1 between min and max, then map 120 (green) → 0 (red)
  const ratio = (maxPrice - minPriceValue) / (maxPriceValue - minPriceValue);
  const clamped = Math.min(1, Math.max(0, ratio));
  const sliderColor = `hsl(${120 - 120 * clamped}, 80%, 50%)`;

  const filtered = useMemo(() => {
    return mockCycles.filter((c: Cycle) => {
      if (onlyAvailable && !c.isAvailableNow) return false;
      if (c.pricePerHour > maxPrice) return false;
      if (
        query &&
        !(
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.locationName.toLowerCase().includes(query.toLowerCase())
        )
      ) {
        return false;
      }
      return true;
    });
  }, [query, maxPrice, onlyAvailable]);

  return (
    <main className="pt-20 max-w-6xl mx-auto px-4 pb-10 grid md:grid-cols-[260px,1fr] gap-6 text-slate-900 bg-[#FCF6D9]">
      {/* Filters */}
      <motion.aside
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -4, scale: 1.01 }}
        className={`space-y-4 rounded-3xl p-4 border border-[#8CA9FF]/60 shadow-md ${dualBg} h-fit backdrop-blur`}
      >
        <h2 className="text-sm font-semibold text-slate-900">Filters</h2>

        {/* Search */}
        <div className="space-y-2 text-sm">
          <label className="block text-xs text-slate-800 font-medium">
            Search
          </label>
          <input
            className="w-full rounded-xl border border-[#8CA9FF]/60 px-3 py-2 text-sm bg-white/80 shadow focus:outline-none focus:ring-2 focus:ring-[#BF1A1A]/60"
            placeholder="Name or location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Price range */}
        <div className="space-y-1 text-sm">
          <div className="flex justify-between text-xs text-slate-700">
            <span>Max price per hour</span>
            <span>€{maxPrice.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={minPriceValue}
            max={maxPriceValue}
            step={0.5}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: sliderColor }}
          />
        </div>

        {/* Availability */}
        <label className="flex items-center gap-2 text-xs text-slate-800 font-medium">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
          />
          Show only available now
        </label>
      </motion.aside>

      {/* Results */}
      <section className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="flex items-center justify-between gap-3"
        >
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Browse cycles
            </h1>
            <p className="text-xs text-slate-600">
              Find a cycle that fits your route, budget and timing.
            </p>
          </div>
          <p className="text-xs text-slate-600">
            {filtered.length} result{filtered.length !== 1 && "s"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((cycle) => (
            <motion.div
              key={cycle.id}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.18 }}
              className={`rounded-3xl p-[2px] border border-[#8CA9FF]/60 shadow-sm ${dualBg}`}
            >
              {/* Inner white card so CycleCard styling still looks good */}
              <div className="rounded-3xl bg-white/90 h-full">
                <CycleCard cycle={cycle} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
