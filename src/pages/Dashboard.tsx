// pages/Dashboard.tsx
import { motion } from "framer-motion";
import { mockBookings, mockCycles, mockUser } from "../data";

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

export function Dashboard() {
  const totalEarnings = mockBookings.reduce((sum, b) => sum + b.pricePaid, 0);
  const totalDistance = mockBookings.reduce((sum, b) => sum + b.distanceKm, 0);
  const co2SavedKg = totalDistance * 0.21;

  const myCycles = mockCycles;

  return (
    <main className="pt-20 min-h-[60vh] bg-[#FCF6D9] text-slate-900">
      <div className="max-w-6xl mx-auto px-4 pb-12">
        {/* TOP HEADER / HERO */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className={`mt-4 rounded-3xl border border-[#364FAB]/60 shadow-md ${dualBg} px-6 py-5 md:px-8 md:py-6 relative overflow-hidden`}
        >
          {/* animated glows */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-44 w-44 rounded-full bg-[#364FAB]/40 blur-3xl"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.06, 1] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-16 bottom-0 h-36 w-36 rounded-full bg-[#93BC25]/40 blur-3xl"
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.08, 1] }}
            transition={{ duration: 7.5, repeat: Infinity }}
          />

          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-800">
                  Dashboard
                </p>
                {/* live pulse */}
                <motion.span
                  className="inline-flex items-center gap-1 rounded-full bg-white/80 border border-[#93BC25]/70 px-2 py-0.5 text-[10px] font-medium text-[#577918]"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  <motion.span
                    className="h-2 w-2 rounded-full bg-[#93BC25]"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                  Live mock data
                </motion.span>
              </div>

              <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
                Hello, {mockUser.name}
              </h1>
              <p className="text-xs md:text-sm text-slate-700 max-w-xl">
                This is your personal ShareMyCycle RTU overview – earnings,
                rides and the performance of your listed cycles in one place.
              </p>
            </div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.18 }}
              className="rounded-2xl bg-white/85 border border-[#364FAB]/60 px-4 py-3 text-xs shadow-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                Quick summary
              </p>
              <p className="mt-1 text-[13px] font-semibold text-[#364FAB]">
                €{totalEarnings.toFixed(2)} earned (mock)
              </p>
              <p className="text-[11px] text-slate-700">
                {totalDistance.toFixed(1)} km ridden · {co2SavedKg.toFixed(1)}{" "}
                kg CO₂ saved
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* STATS GRID */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          <motion.div
            layout
            variants={fadeUp}
            whileHover={{ y: -4, scale: 1.03 }}
            transition={{ duration: 0.18 }}
            className={`rounded-3xl border border-[#364FAB]/70 shadow-sm ${dualBg} p-[2px]`}
          >
            <div className="h-full rounded-3xl bg-white/90 px-4 py-4 flex flex-col justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                Total earnings (mock)
              </p>
              <motion.p
                className="mt-2 text-2xl font-semibold text-[#364FAB]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                €{totalEarnings.toFixed(2)}
              </motion.p>
              <p className="mt-1 text-xs text-slate-600">
                From all completed rentals booked through this demo dashboard.
              </p>
            </div>
          </motion.div>

          <motion.div
            layout
            variants={fadeUp}
            whileHover={{ y: -4, scale: 1.03 }}
            transition={{ duration: 0.18 }}
            className={`rounded-3xl border border-[#93BC25]/70 shadow-sm ${dualBg} p-[2px]`}
          >
            <div className="h-full rounded-3xl bg-white/90 px-4 py-4 flex flex-col justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                Distance ridden
              </p>
              <motion.p
                className="mt-2 text-2xl font-semibold text-[#577918]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {totalDistance.toFixed(1)} km
              </motion.p>
              <p className="mt-1 text-xs text-slate-600">
                Total distance covered on your listed cycles.
              </p>
            </div>
          </motion.div>

          <motion.div
            layout
            variants={fadeUp}
            whileHover={{ y: -4, scale: 1.03 }}
            transition={{ duration: 0.18 }}
            className={`rounded-3xl border border-[#364FAB]/70 shadow-sm ${dualBg} p-[2px]`}
          >
            <div className="h-full rounded-3xl bg-white/90 px-4 py-4 flex flex-col justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                Estimated CO₂ saved
              </p>
              <motion.p
                className="mt-2 text-2xl font-semibold text-[#364FAB]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {co2SavedKg.toFixed(1)} kg
              </motion.p>
              <p className="mt-1 text-xs text-slate-600">
                Compared to making those trips with a small car or scooter.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* MY CYCLES */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 space-y-3"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-sm md:text-base font-semibold text-slate-900">
                My cycles
              </h2>
              <span className="text-[11px] text-slate-600">
                {myCycles.length} active listing
                {myCycles.length !== 1 && "s"}
              </span>
            </div>
            <span className="text-[11px] text-slate-600">
              Overview of all bikes you&apos;ve added.
            </span>
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {myCycles.map((c, idx) => (
              <motion.div
                key={c.id}
                layout
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.18, delay: idx * 0.02 }}
                className={`rounded-3xl border border-[#364FAB]/50 shadow-sm ${dualBg} p-[2px]`}
              >
                <div className="rounded-3xl bg-white/90 p-3 text-xs md:text-sm h-full flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900 truncate">
                      {c.name}
                    </p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FCF6D9] border border-[#364FAB]/40 text-slate-700">
                      {c.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">{c.locationName}</p>
                  <p className="text-[11px] text-slate-600">
                    €{c.pricePerHour.toFixed(2)}/hr · {c.type.toUpperCase()} ·{" "}
                    {c.gear ? "Gear" : "No gear"}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Status:{" "}
                    <span
                      className={
                        c.isAvailableNow
                          ? "text-[#577918] font-semibold"
                          : "text-slate-500"
                      }
                    >
                      {c.isAvailableNow ? "Available now" : "Not available"}
                    </span>
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* BOOKINGS HISTORY */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 space-y-3"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-sm md:text-base font-semibold text-slate-900">
                Recent bookings
              </h2>
              <span className="text-[11px] text-slate-600">
                {mockBookings.length} completed ride
                {mockBookings.length !== 1 && "s"}
              </span>
            </div>
            <span className="text-[11px] text-slate-600">
              Latest trips made using your listed cycles.
            </span>
          </motion.div>

          <motion.div
            variants={stagger}
            className="space-y-2 text-xs md:text-sm"
          >
            {mockBookings.map((b, idx) => {
              const cycle = mockCycles.find((c) => c.id === b.cycleId);
              return (
                <motion.div
                  key={b.id}
                  layout
                  variants={fadeUp}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ duration: 0.18, delay: idx * 0.02 }}
                  className={`rounded-3xl border border-[#364FAB]/40 shadow-sm ${dualBg} p-[2px]`}
                >
                  <div className="rounded-3xl bg-white/95 px-3 py-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {cycle?.name ?? "Unknown cycle"}
                      </p>
                      <p className="text-[11px] text-slate-600">
                        {new Date(b.startTime).toLocaleString()} ·{" "}
                        {b.distanceKm.toFixed(1)} km
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#364FAB] text-sm">
                        €{b.pricePaid.toFixed(2)}
                      </p>
                      <p className="text-[11px] text-slate-600">
                        Est. CO₂ saved: {(b.distanceKm * 0.21).toFixed(1)} kg
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
