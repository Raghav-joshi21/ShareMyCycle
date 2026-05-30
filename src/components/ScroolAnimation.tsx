// src/components/ScroolAnimation.tsx
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

export function ScrollAnimation() {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.1"],
  });

  const [frame, setFrame] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 1 / 3) setFrame(0);
    else if (latest < 2 / 3) setFrame(1);
    else setFrame(2);
  });

  return (
    <section className="py-16 md:py-20">
      <div ref={ref} className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="rounded-xl border border-border bg-surface shadow-sm px-6 py-7 md:px-9 md:py-8 overflow-hidden relative"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* HEADER */}
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-blue">
                How students use it
              </p>
              <h2 className="mt-2 font-display text-xl md:text-2xl font-bold tracking-tight text-text-primary">
                From map to ride in three smooth steps
              </h2>
              <p className="mt-1 text-sm text-text-secondary max-w-xl">
                Scroll a little and see how an RTU student discovers a cycle,
                books it, unlocks it and starts riding – all inside
                ShareMyCycle.
              </p>
            </div>

            {/* step pills indicator */}
            <div className="flex items-center gap-2 text-[11px]">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFrame(idx)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 border text-[11px] font-medium transition-colors ${
                    frame === idx
                      ? "bg-brand-blue/8 text-brand-blue border-brand-blue/30"
                      : "bg-surface text-text-tertiary border-border hover:text-text-secondary"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  Step {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* MAIN CONTENT: PHONE + TEXT */}
          <div className="relative grid gap-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)] items-center">
            {/* LEFT – PHONE MOCKUP (static, no parallax) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex justify-center"
            >
              <div className="relative h-60 w-32 md:h-68 md:w-36 lg:h-72 lg:w-40 rounded-[2rem] bg-text-primary shadow-xl border border-border-strong overflow-hidden">
                {/* top bar */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 h-1 w-14 rounded-full bg-text-tertiary/40" />
                {/* content area */}
                <div className="absolute inset-4 rounded-2xl overflow-hidden bg-text-primary">
                  {frame === 0 && (
                    <motion.div
                      key="frame-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-full w-full"
                    >
                      <img
                        src="https://images.pexels.com/photos/1452813/pexels-photo-1452813.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Map with nearby bikes"
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-[10px] text-white">
                        <p className="font-semibold">Browse the live map</p>
                        <p className="text-white/80">
                          Nearby student-owned cycles with prices and pins.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {frame === 1 && (
                    <motion.div
                      key="frame-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-full w-full"
                    >
                      <img
                        src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Payment and booking screen"
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-[10px] text-white">
                        <p className="font-semibold">Book & confirm</p>
                        <p className="text-white/80">
                          See details, pick time and lock in your ride.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {frame === 2 && (
                    <motion.div
                      key="frame-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-full w-full"
                    >
                      <img
                        src="https://images.pexels.com/photos/210095/pexels-photo-210095.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Unlocking and riding the cycle"
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-[10px] text-white">
                        <p className="font-semibold">Unlock & ride</p>
                        <p className="text-white/80">
                          Smart lock opens, timer starts, and your trip begins.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* RIGHT – EXPLANATION TEXT CARDS */}
            <div className="space-y-3 text-sm text-text-primary">
              {/* Step 1 */}
              <motion.div
                animate={{
                  opacity: frame === 0 ? 1 : 0.35,
                  y: frame === 0 ? 0 : 4,
                }}
                transition={{ duration: 0.25 }}
                className={`rounded-lg border px-4 py-3 transition-shadow ${
                  frame === 0
                    ? "border-brand-blue/30 bg-brand-blue/4 shadow-sm"
                    : "border-border bg-surface"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-blue">
                  Step 1 · Browse the live map
                </p>
                <p className="mt-1 text-sm font-semibold text-text-primary">
                  See student cycles around RTU & Riga.
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  You open ShareMyCycle and land on a map of campus. Every pin
                  is a cycle owned by a verified RTU student, with clear{" "}
                  <span className="font-semibold text-brand-blue">
                    price per hour, rating and distance
                  </span>{" "}
                  from your current location.
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                animate={{
                  opacity: frame === 1 ? 1 : 0.35,
                  y: frame === 1 ? 0 : 4,
                }}
                transition={{ duration: 0.25 }}
                className={`rounded-lg border px-4 py-3 transition-shadow ${
                  frame === 1
                    ? "border-brand-green/30 bg-brand-green/4 shadow-sm"
                    : "border-border bg-surface"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-green-dark">
                  Step 2 · Book & confirm
                </p>
                <p className="mt-1 text-sm font-semibold text-text-primary">
                  Pick a bike, time window and price.
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  Tap a cycle to open its detail card – see{" "}
                  <span className="font-semibold text-text-primary">
                    photos, rules and exact pickup spot
                  </span>
                  . Choose your start time and estimated duration, review the
                  total price, then confirm the booking in a couple of taps.
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                animate={{
                  opacity: frame === 2 ? 1 : 0.35,
                  y: frame === 2 ? 0 : 4,
                }}
                transition={{ duration: 0.25 }}
                className={`rounded-lg border px-4 py-3 transition-shadow ${
                  frame === 2
                    ? "border-brand-tan/40 bg-brand-tan/5 shadow-sm"
                    : "border-border bg-surface"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-tan-dark">
                  Step 3 · Unlock, ride & return
                </p>
                <p className="mt-1 text-sm font-semibold text-text-primary">
                  Unlock the lock and start riding.
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  Once you&apos;re at the bike, the app shows{" "}
                  <span className="font-semibold text-brand-blue">
                    an unlock button or smart-lock code
                  </span>
                  . The ride timer starts, you cycle to your destination, then
                  return the bike to the agreed spot, end the ride and leave a
                  rating for the owner.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
