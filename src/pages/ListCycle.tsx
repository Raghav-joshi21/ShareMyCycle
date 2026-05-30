// pages/ListCycle.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import type { Cycle } from "../types";
import { mockCycles } from "../data";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { fadeIn, slideInLeft, slideInRight, staggerContainer, viewportOnce } from "../lib/motion";
import { TextReveal } from "../components/TextReveal";

export function ListCycle() {
  const [cycles, setCycles] = useState<Cycle[]>(mockCycles);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(2);
  const [locationName, setLocationName] = useState("RTU campus");
  const [type, setType] = useState<"city" | "mtb" | "road">("city");
  const [gear, setGear] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newCycle: Cycle = {
      id: `c${cycles.length + 1}`,
      name,
      type,
      gear,
      pricePerHour: price,
      locationName,
      lat: 56.9496 + Math.random() * 0.01,
      lng: 24.1052 + Math.random() * 0.01,
      isAvailableNow: true,
      rating: 5,
    };

    setCycles((prev) => [...prev, newCycle]);
    setMessage("Listing successful! This cycle is stored locally (mock).");

    // reset just the important fields
    setName("");
    setPrice(2);
    setGear(false);
  };

  return (
    <main className="pt-14 min-h-[60vh] text-text-primary">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* SUCCESS BANNER */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="mt-4 mb-4"
            >
              <div className="rounded-lg border border-success/30 bg-success/5 px-4 py-3 text-xs md:text-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <p className="text-text-primary">{message}</p>
                </div>
                <button
                  className="text-[11px] text-text-secondary underline underline-offset-2"
                  onClick={() => setMessage("")}
                  type="button"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADER */}
        <motion.section
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mt-2 rounded-xl bg-surface border border-border shadow-sm px-6 py-5 md:px-8 md:py-6"
        >
          <TextReveal as="h1" className="font-serif text-xl md:text-2xl text-text-primary tracking-tight">
            List my cycle
          </TextReveal>
          <p className="mt-1 text-xs md:text-sm text-text-secondary max-w-2xl">
            Add your bicycle and set your hourly rate. In this demo, everything
            is stored only in local state on your device – there is no backend
            or real payment yet, but the flow mirrors how a real listing would
            feel.
          </p>
        </motion.section>

        {/* FORM + PREVIEW */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] items-start"
        >
          {/* FORM CARD */}
          <motion.div
            variants={slideInLeft}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="rounded-xl border border-border bg-surface shadow-sm"
          >
            <form
              onSubmit={handleSubmit}
              className="px-5 py-5 space-y-4 text-sm"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-primary">
                  New listing
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  Describe your cycle so other RTU students can quickly decide
                  if it fits their route and budget.
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-xs text-text-secondary font-medium">
                  Cycle name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-white text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all duration-200"
                  placeholder="e.g. Green City Bike"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs text-text-secondary font-medium">
                    Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) =>
                      setType(e.target.value as "city" | "mtb" | "road")
                    }
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all duration-200"
                  >
                    <option value="city">City</option>
                    <option value="mtb">MTB</option>
                    <option value="road">Road</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-text-secondary font-medium">
                    Price per hour (€)
                  </label>
                  <input
                    type="number"
                    min={1}
                    step={0.5}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all duration-200"
                  />
                  <input
                    type="range"
                    min={1}
                    max={6}
                    step={0.5}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full mt-1 accent-brand-green"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs text-text-secondary font-medium">
                  Location name
                </label>
                <input
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-white text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all duration-200"
                  placeholder="e.g. RTU main building, Ķīpsala"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-text-secondary">
                <input
                  type="checkbox"
                  checked={gear}
                  onChange={(e) => setGear(e.target.checked)}
                />
                Has gears
              </label>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-full bg-brand-blue px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-blue-dark transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
              >
                Publish listing (mock)
              </motion.button>

              <p className="text-[11px] text-text-tertiary">
                This is a demo – your listing is stored only in your browser and
                disappears if you refresh. In a real app this would connect to a
                backend and secure payments.
              </p>
            </form>
          </motion.div>

          {/* LIVE PREVIEW / LISTINGS */}
          <motion.div
            variants={slideInRight}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="space-y-4"
          >
            <div>
              <p className="text-xs font-semibold font-serif uppercase tracking-[0.08em] text-text-primary">
                Preview &amp; local listings
              </p>
              <p className="mt-1 text-xs md:text-sm text-text-secondary">
                Every cycle you add appears here immediately. This gives you a
                sense of how your listings might look in a real owner dashboard.
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {cycles.map((cycle) => (
                <motion.div
                  key={cycle.id}
                  variants={fadeIn}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className="group cursor-pointer rounded-xl border border-border bg-surface shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="p-3 text-xs md:text-sm flex flex-col gap-1.5">
                    <p className="font-semibold text-text-primary">{cycle.name}</p>
                    <p className="text-[11px] text-text-secondary">
                      {cycle.locationName}
                    </p>
                    <p className="text-[11px] text-text-secondary">
                      <span className="font-serif">€{cycle.pricePerHour.toFixed(2)}</span>/hr ·{" "}
                      {cycle.type.toUpperCase()} ·{" "}
                      {cycle.gear ? "Gear" : "No gear"}
                    </p>
                    <p className="text-[11px] text-text-secondary">
                      Status:{" "}
                      <span className="text-success font-semibold">
                        Available
                      </span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
