// pages/Dashboard.tsx
import { motion } from "framer-motion";
import { mockBookings, mockCycles, mockUser } from "../data";
import { fadeIn, scaleIn, staggerContainer, viewportOnce } from "../lib/motion";

export function Dashboard() {
  const totalEarnings = mockBookings.reduce((sum, b) => sum + b.pricePaid, 0);
  const totalDistance = mockBookings.reduce((sum, b) => sum + b.distanceKm, 0);
  const co2SavedKg = totalDistance * 0.21;

  const myCycles = mockCycles;

  return (
    <main className="pt-14 min-h-[60vh] text-text-primary">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* TOP HEADER */}
        <motion.section
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mt-4 rounded-xl bg-surface border border-border shadow-sm px-6 py-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                Dashboard
              </p>
              <h1 className="font-serif text-2xl md:text-3xl text-text-primary tracking-tight">
                Hello, {mockUser.name}
              </h1>
              <p className="text-xs md:text-sm text-text-secondary max-w-xl">
                This is your personal ShareMyCycle RTU overview – earnings,
                rides and the performance of your listed cycles in one place.
              </p>
            </div>

            <div className="rounded-xl bg-surface border border-border px-4 py-3 text-xs shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                Quick summary
              </p>
              <p className="mt-1 text-[13px] font-semibold font-serif text-brand-blue">
                €{totalEarnings.toFixed(2)} earned
              </p>
              <p className="text-[11px] text-text-secondary">
                <span className="font-serif">{totalDistance.toFixed(1)}</span> km ridden ·{" "}
                <span className="font-serif">{co2SavedKg.toFixed(1)}</span> kg CO₂ saved
              </p>
            </div>
          </div>
        </motion.section>

        {/* STATS GRID */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          <motion.div
            variants={scaleIn}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="rounded-xl bg-surface border border-border border-t-2 border-t-brand-blue shadow-xs px-4 py-4 flex flex-col justify-between"
          >
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-text-tertiary">
              Total earnings
            </p>
            <p className="mt-2 font-serif text-3xl font-bold text-text-primary">
              €{totalEarnings.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-text-secondary">
              From all completed rentals booked through this demo dashboard.
            </p>
          </motion.div>

          <motion.div
            variants={scaleIn}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="rounded-xl bg-surface border border-border border-t-2 border-t-brand-green shadow-xs px-4 py-4 flex flex-col justify-between"
          >
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-text-tertiary">
              Distance ridden
            </p>
            <p className="mt-2 font-serif text-3xl font-bold text-text-primary">
              {totalDistance.toFixed(1)} km
            </p>
            <p className="mt-1 text-xs text-text-secondary">
              Total distance covered on your listed cycles.
            </p>
          </motion.div>

          <motion.div
            variants={scaleIn}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="rounded-xl bg-surface border border-border border-t-2 border-t-brand-tan shadow-xs px-4 py-4 flex flex-col justify-between"
          >
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-text-tertiary">
              Estimated CO₂ saved
            </p>
            <p className="mt-2 font-serif text-3xl font-bold text-text-primary">
              {co2SavedKg.toFixed(1)} kg
            </p>
            <p className="mt-1 text-xs text-text-secondary">
              Compared to making those trips with a small car or scooter.
            </p>
          </motion.div>
        </motion.section>

        {/* MY CYCLES */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 space-y-3"
        >
          <motion.div
            variants={fadeIn}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-sm md:text-base font-semibold font-serif text-text-primary">
                My cycles
              </h2>
              <span className="text-[11px] text-text-tertiary">
                {myCycles.length} active listing
                {myCycles.length !== 1 && "s"}
              </span>
            </div>
            <span className="text-[11px] text-text-tertiary">
              Overview of all bikes you&apos;ve added.
            </span>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {myCycles.map((c) => (
              <motion.div
                key={c.id}
                variants={fadeIn}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="group cursor-pointer rounded-xl border border-border bg-surface shadow-xs p-3 text-xs md:text-sm flex flex-col gap-1.5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-text-primary truncate">
                    {c.name}
                  </p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-sunken border border-border text-text-secondary">
                    {c.type.toUpperCase()}
                  </span>
                </div>
                <p className="text-[11px] text-text-secondary">{c.locationName}</p>
                <p className="text-[11px] text-text-secondary">
                  <span className="font-serif">€{c.pricePerHour.toFixed(2)}</span>/hr · {c.type.toUpperCase()} ·{" "}
                  {c.gear ? "Gear" : "No gear"}
                </p>
                <p className="text-[11px] text-text-secondary">
                  Status:{" "}
                  <span
                    className={
                      c.isAvailableNow
                        ? "text-brand-green font-semibold"
                        : "text-text-tertiary"
                    }
                  >
                    {c.isAvailableNow ? "Available now" : "Not available"}
                  </span>
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* BOOKINGS HISTORY */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 space-y-3"
        >
          <motion.div
            variants={fadeIn}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-sm md:text-base font-semibold font-serif text-text-primary">
                Recent bookings
              </h2>
              <span className="text-[11px] text-text-tertiary">
                {mockBookings.length} completed ride
                {mockBookings.length !== 1 && "s"}
              </span>
            </div>
            <span className="text-[11px] text-text-tertiary">
              Latest trips made using your listed cycles.
            </span>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="space-y-2 text-xs md:text-sm"
          >
            {mockBookings.map((b) => {
              const cycle = mockCycles.find((c) => c.id === b.cycleId);
              return (
                <motion.div
                  key={b.id}
                  variants={fadeIn}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className="rounded-xl border border-border bg-surface px-4 py-3 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold text-text-primary">
                      {cycle?.name ?? "Unknown cycle"}
                    </p>
                    <p className="text-[11px] text-text-secondary">
                      {new Date(b.startTime).toLocaleString()} ·{" "}
                      <span className="font-serif">{b.distanceKm.toFixed(1)}</span> km
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold font-serif text-brand-blue text-sm">
                      €{b.pricePaid.toFixed(2)}
                    </p>
                    <p className="text-[11px] text-text-secondary">
                      Est. CO₂ saved: <span className="font-serif">{(b.distanceKm * 0.21).toFixed(1)}</span> kg
                    </p>
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
