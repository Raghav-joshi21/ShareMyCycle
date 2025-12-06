// src/components/ScroolAnimation.tsx
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const fadeCard = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

export function ScrollAnimation() {
  const ref = useRef<HTMLDivElement | null>(null);

  // scroll progress sirf is card section ke liye
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.1"], // card jab enter/exit karta hai viewport
  });

  // kaunsa step active hai: 0,1,2
  const [frame, setFrame] = useState(0);

  // scrollYProgress (0–1) ko 0,1,2 me map karo
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 1 / 3) setFrame(0);
    else if (latest < 2 / 3) setFrame(1);
    else setFrame(2);
  });

  // extra motion: phone parallax + tilt + glow
  const phoneScale = useTransform(scrollYProgress, [0, 1], [0.96, 1.04]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  const bgGlowOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.9]);

  return (
    <section className="bg-[#FCF6D9] py-10">
      <div ref={ref} className="w-full max-w-5xl mx-auto px-4">
        {/* CARD WRAPPER */}
        <motion.div
          className="rounded-3xl border border-[#364FAB]/50 bg-gradient-to-br from-[#364FAB]/18 via-[#FCF6D9] to-[#93BC25]/24 shadow-lg px-6 py-7 md:px-9 md:py-8 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
        >
          {/* soft blobs */}
          <motion.div
            aria-hidden
            style={{ opacity: bgGlowOpacity }}
            className="pointer-events-none absolute -right-24 -top-24 h-40 w-40 rounded-full bg-[#364FAB]/40 blur-3xl"
          />
          <motion.div
            aria-hidden
            style={{ opacity: bgGlowOpacity }}
            className="pointer-events-none absolute -left-24 bottom-0 h-40 w-40 rounded-full bg-[#93BC25]/40 blur-3xl"
          />

          {/* HEADER */}
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#364FAB]">
                How students use it
              </p>
              <h2 className="mt-2 text-lg md:text-2xl font-semibold text-slate-900">
                From map to ride in three smooth steps
              </h2>
              <p className="mt-1 text-xs md:text-sm text-slate-700 max-w-xl">
                Scroll a little and see how an RTU student discovers a cycle,
                books it, unlocks it and starts riding – all inside
                ShareMyCycle.
              </p>
            </div>

            {/* step pills indicator */}
            <div className="flex items-center gap-2 text-[11px]">
              {[0, 1, 2].map((idx) => (
                <motion.button
                  key={idx}
                  type="button"
                  onClick={() => setFrame(idx)}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 border text-[11px] ${
                    frame === idx
                      ? "bg-white text-[#364FAB] border-[#364FAB]"
                      : "bg-white/80 text-slate-700 border-slate-300"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#93BC25]" />
                  Step {idx + 1}
                </motion.button>
              ))}
            </div>
          </div>

          {/* MAIN CONTENT: PHONE + TEXT */}
          <div className="relative grid gap-5 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)] items-center">
            {/* LEFT – PHONE MOCKUP WITH PARALLAX / TILT */}
            <motion.div
              variants={fadeCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="relative flex justify-center"
              style={{ scale: phoneScale, rotate: phoneRotate }}
            >
              <div className="relative h-60 w-32 md:h-68 md:w-36 lg:h-72 lg:w-40 rounded-[2rem] bg-slate-900 shadow-2xl border border-slate-800 overflow-hidden">
                {/* top bar */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 h-1 w-14 rounded-full bg-slate-700" />
                {/* content area */}
                <div className="absolute inset-4 rounded-2xl overflow-hidden bg-slate-900">
                  {/* Different image + overlay text per step */}
                  {frame === 0 && (
                    <motion.div
                      key="frame-0"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                      className="relative h-full w-full"
                    >
                      <img
                        src="https://images.pexels.com/photos/1452813/pexels-photo-1452813.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Map with nearby bikes"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-[10px] text-white">
                        <p className="font-semibold">Browse the live map</p>
                        <p className="text-[10px] text-white/80">
                          Nearby student-owned cycles with prices and pins.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {frame === 1 && (
                    <motion.div
                      key="frame-1"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                      className="relative h-full w-full"
                    >
                      <img
                        src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Payment and booking screen"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-[10px] text-white">
                        <p className="font-semibold">Book & confirm</p>
                        <p className="text-[10px] text-white/80">
                          See details, pick time and lock in your ride.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {frame === 2 && (
                    <motion.div
                      key="frame-2"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                      className="relative h-full w-full"
                    >
                      <img
                        src="https://images.pexels.com/photos/210095/pexels-photo-210095.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Unlocking and riding the cycle"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-[10px] text-white">
                        <p className="font-semibold">Unlock & ride</p>
                        <p className="text-[10px] text-white/80">
                          Smart lock opens, timer starts, and your trip begins.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* RIGHT – EXPLANATION TEXT CARDS */}
            <div className="space-y-3 text-sm text-slate-800">
              {/* Step 1 */}
              <motion.div
                animate={{
                  opacity: frame === 0 ? 1 : 0.4,
                  y: frame === 0 ? 0 : 6,
                  scale: frame === 0 ? 1 : 0.99,
                }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -2, scale: 1.01 }}
                className="rounded-2xl bg-white/95 border border-[#364FAB]/40 px-4 py-3 shadow-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#364FAB]">
                  Step 1 · Browse the live map
                </p>
                <p className="mt-1 text-sm font-semibold">
                  See student cycles around RTU & Riga.
                </p>
                <p className="mt-1 text-xs text-slate-700">
                  You open ShareMyCycle and land on a map of campus. Every pin
                  is a cycle owned by a verified RTU student, with clear{" "}
                  <span className="font-semibold text-[#364FAB]">
                    price per hour, rating and distance
                  </span>{" "}
                  from your current location.
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                animate={{
                  opacity: frame === 1 ? 1 : 0.4,
                  y: frame === 1 ? 0 : 6,
                  scale: frame === 1 ? 1 : 0.99,
                }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -2, scale: 1.01 }}
                className="rounded-2xl bg-white/95 border border-[#93BC25]/50 px-4 py-3 shadow-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#577918]">
                  Step 2 · Book & confirm
                </p>
                <p className="mt-1 text-sm font-semibold">
                  Pick a bike, time window and price.
                </p>
                <p className="mt-1 text-xs text-slate-700">
                  Tap a cycle to open its detail card – see{" "}
                  <span className="font-semibold">
                    photos, rules and exact pickup spot
                  </span>
                  . Choose your start time and estimated duration, review the
                  total price, then confirm the booking in a couple of taps.
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                animate={{
                  opacity: frame === 2 ? 1 : 0.4,
                  y: frame === 2 ? 0 : 6,
                  scale: frame === 2 ? 1 : 0.99,
                }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -2, scale: 1.01 }}
                className="rounded-2xl bg-white/95 border border-[#DDBA7D]/60 px-4 py-3 shadow-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8D6631]">
                  Step 3 · Unlock, ride & return
                </p>
                <p className="mt-1 text-sm font-semibold">
                  Unlock the lock and start riding.
                </p>
                <p className="mt-1 text-xs text-slate-700">
                  Once you&apos;re at the bike, the app shows{" "}
                  <span className="font-semibold text-[#364FAB]">
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
