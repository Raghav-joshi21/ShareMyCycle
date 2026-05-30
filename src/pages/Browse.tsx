// pages/Browse.tsx
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { mockCycles } from "../data";
import type { Cycle } from "../types";
import { CycleCard } from "../components/CycleCard";
import { fadeIn, slideInLeft, staggerFast, viewportOnce } from "../lib/motion";
import { TextReveal } from "../components/TextReveal";

export function Browse() {
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(5);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const minPriceValue = 1;
  const maxPriceValue = 6;

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

  function clearFilters() {
    setQuery("");
    setMaxPrice(maxPriceValue);
    setOnlyAvailable(false);
  }

  return (
    <main className="pt-14 max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 grid md:grid-cols-[260px,1fr] gap-6">
      {/* Filters */}
      <motion.aside
        variants={slideInLeft}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="rounded-xl bg-surface border border-border shadow-sm p-4 h-fit space-y-4"
      >
        <h2 className="text-sm font-semibold text-text-primary">Filters</h2>

        {/* Search */}
        <div className="space-y-2 text-sm">
          <label className="block text-xs text-text-secondary font-medium">
            Search
          </label>
          <input
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all duration-200"
            placeholder="Name or location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Price range */}
        <div className="space-y-1 text-sm">
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Max price per hour</span>
            <span className="font-serif">€{maxPrice.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={minPriceValue}
            max={maxPriceValue}
            step={0.5}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-brand-green"
          />
        </div>

        {/* Availability */}
        <label className="flex items-center gap-2 text-xs text-text-secondary font-medium">
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
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center justify-between gap-3"
        >
          <div>
            <TextReveal as="h1" className="font-serif text-xl md:text-2xl text-text-primary tracking-tight">
              Browse cycles
            </TextReveal>
            <p className="text-xs text-text-secondary">
              Find a cycle that fits your route, budget and timing.
            </p>
          </div>
          <p className="text-xs text-text-tertiary">
            {filtered.length} result{filtered.length !== 1 && "s"}
          </p>
        </motion.div>

        {filtered.length === 0 ? (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col items-center justify-center py-20 gap-3 text-center"
          >
            <p className="font-serif text-lg text-text-secondary">
              No cycles match your filters
            </p>
            <p className="text-xs text-text-tertiary max-w-xs">
              Try adjusting your search, price range or availability filter.
            </p>
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-brand-blue link-hover mt-1"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerFast}
            initial="hidden"
            animate="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((cycle) => (
              <motion.div
                key={cycle.id}
                variants={fadeIn}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="group cursor-pointer rounded-xl border border-border bg-surface shadow-xs hover:shadow-md transition-shadow overflow-hidden"
              >
                <CycleCard cycle={cycle} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}
