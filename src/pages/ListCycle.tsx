// pages/ListCycle.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import type { Cycle } from "../types";
import { mockCycles } from "../data";
import { motion, AnimatePresence } from "framer-motion";

const dualBg =
  "bg-gradient-to-br from-[#364FAB]/35 via-[#364FAB]/10 to-[#93BC25]/25";

const fadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

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
    <main className="pt-20 min-h-[60vh] bg-[#FCF6D9] text-slate-900">
      <div className="max-w-6xl mx-auto px-4 pb-12">
        {/* SUCCESS BANNER */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mt-4 mb-4"
            >
              <div className="rounded-2xl border border-[#93BC25]/70 bg-white/90 px-4 py-3 text-xs md:text-sm shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#93BC25] text-white text-[13px]">
                    ✓
                  </span>
                  <p className="text-slate-800">{message}</p>
                </div>
                <button
                  className="text-[11px] text-slate-600 underline underline-offset-2"
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
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className={`mt-2 rounded-3xl border border-[#364FAB]/60 shadow-md ${dualBg} px-6 py-5 md:px-8 md:py-6`}
        >
          <h1 className="text-lg md:text-xl font-semibold text-slate-900">
            List my cycle
          </h1>
          <p className="mt-1 text-xs md:text-sm text-slate-700 max-w-2xl">
            Add your bicycle and set your hourly rate. In this demo, everything
            is stored only in local state on your device – there is no backend
            or real payment yet, but the flow mirrors how a real listing would
            feel.
          </p>
        </motion.section>

        {/* FORM + PREVIEW */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] items-start"
        >
          {/* FORM CARD */}
          <motion.div
            variants={fadeUp}
            className={`rounded-3xl border border-[#364FAB]/60 shadow-md ${dualBg} p-[2px]`}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white/95 px-5 py-5 space-y-4 text-sm"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-800">
                  New listing
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Describe your cycle so other RTU students can quickly decide
                  if it fits their route and budget.
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-xs text-slate-500 font-medium">
                  Cycle name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-[#364FAB]/50 px-3 py-2 text-sm bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#364FAB]"
                  placeholder="e.g. Green City Bike"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs text-slate-500 font-medium">
                    Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) =>
                      setType(e.target.value as "city" | "mtb" | "road")
                    }
                    className="w-full rounded-xl border border-[#364FAB]/50 px-3 py-2 text-sm bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#364FAB]"
                  >
                    <option value="city">City</option>
                    <option value="mtb">MTB</option>
                    <option value="road">Road</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-slate-500 font-medium">
                    Price per hour (€)
                  </label>
                  <input
                    type="number"
                    min={1}
                    step={0.5}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full rounded-xl border border-[#364FAB]/50 px-3 py-2 text-sm bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#93BC25]"
                  />
                  <input
                    type="range"
                    min={1}
                    max={6}
                    step={0.5}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full mt-1 accent-[#93BC25]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs text-slate-500 font-medium">
                  Location name
                </label>
                <input
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full rounded-xl border border-[#364FAB]/50 px-3 py-2 text-sm bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#364FAB]"
                  placeholder="e.g. RTU main building, Ķīpsala"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-700">
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
                className="w-full rounded-full bg-[#364FAB] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#2b3a88] transition-colors"
              >
                Publish listing (mock)
              </motion.button>

              <p className="text-[11px] text-slate-500">
                This is a demo – your listing is stored only in your browser and
                disappears if you refresh. In a real app this would connect to a
                backend and secure payments.
              </p>
            </motion.form>
          </motion.div>

          {/* LIVE PREVIEW / LISTINGS */}
          <motion.div variants={stagger} className="space-y-4">
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-800">
                Preview &amp; local listings
              </p>
              <p className="mt-1 text-xs md:text-sm text-slate-700">
                Every cycle you add appears here immediately. This gives you a
                sense of how your listings might look in a real owner dashboard.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {cycles.map((cycle) => (
                <motion.div
                  key={cycle.id}
                  variants={fadeUp}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`rounded-3xl border border-[#364FAB]/50 shadow-sm ${dualBg} p-[2px]`}
                >
                  <div className="rounded-3xl bg-white/95 p-3 text-xs md:text-sm flex flex-col gap-1.5">
                    <p className="font-semibold text-slate-900">{cycle.name}</p>
                    <p className="text-[11px] text-slate-600">
                      {cycle.locationName}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      €{cycle.pricePerHour.toFixed(2)}/hr ·{" "}
                      {cycle.type.toUpperCase()} ·{" "}
                      {cycle.gear ? "Gear" : "No gear"}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Status:{" "}
                      <span className="text-[#577918] font-semibold">
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
