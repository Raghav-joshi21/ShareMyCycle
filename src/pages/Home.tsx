// pages/Home.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mockCycles } from "../data";
import { MapView } from "../components/MapView";
import { ScrollAnimation } from "../components/ScroolAnimation"; // keep file name
import { motion, AnimatePresence } from "framer-motion";

const fadeInUp = {
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

const dualBg =
  "bg-gradient-to-br from-[#364FAB]/35 via-[#364FAB]/10 to-[#93BC25]/25";

export function Home() {
  const [showFullMap, setShowFullMap] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroTranslate = Math.min(scrollY / 12, 24);
  const heroOpacity = Math.max(1 - scrollY / 600, 0.75);

  return (
    <main className="flex flex-col pt-20 bg-[#FCF6D9] text-slate-900">
      {/* SCROLL STORY SECTION (phone -> bike -> payment -> lock) */}
      <section className="bg-[#FCF6D9]">
        <ScrollAnimation />
      </section>

      {/* MAP HERO SECTION – now in a nice gradient card */}
      <section className="bg-[#FCF6D9]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className={`mt-6 rounded-3xl border border-[#364FAB]/60 shadow-md ${dualBg} overflow-hidden relative`}
          >
            <div className="h-[260px] sm:h-[320px] relative">
              <MapView cycles={mockCycles} fullScreen />
              {/* soft overlay edges */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#364FAB] via-[#93BC25] to-[#364FAB]" />

              {/* label on top of the map */}
              <div className="absolute left-4 top-4 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-[11px] text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#93BC25]" />
                Live campus map · demo pins
              </div>

              <button
                type="button"
                onClick={() => setShowFullMap(true)}
                className="absolute right-4 bottom-4 text-[11px] rounded-full bg-white/90 px-3 py-1.5 text-slate-900 border border-[#364FAB]/50 shadow-sm hover:bg-white"
              >
                Open full-screen map
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TEXT HERO SECTION BELOW MAP */}
      <section className="bg-[#FCF6D9]">
        <motion.div
          className="max-w-6xl mx-auto px-4 py-12 lg:py-16 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center"
          style={{
            transform: `translateY(${heroTranslate}px)`,
            opacity: heroOpacity,
            transition: "transform 150ms ease-out, opacity 150ms ease-out",
          }}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Left text column */}
          <motion.div className="space-y-5" variants={stagger}>
            <motion.p
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-medium tracking-[0.18em] uppercase text-[#364FAB] border border-[#364FAB]/40 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#93BC25]" />
              ShareMyCycle RTU
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight text-slate-900"
            >
              Affordable, student-first
              <br className="hidden md:block" />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #364FAB 0%, #93BC25 40%, #364FAB 100%)",
                }}
              >
                cycle sharing on campus
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-xl text-sm md:text-base text-slate-700"
            >
              Up to{" "}
              <span className="font-semibold text-[#364FAB]">70% cheaper</span>{" "}
              than scooters for getting around RTU, with live cycle
              availability, transparent hourly pricing and listings owned by
              fellow students.
            </motion.p>

            <motion.ul
              variants={stagger}
              className="grid gap-2 text-xs md:text-sm text-slate-800 md:grid-cols-2"
            >
              <motion.li variants={fadeInUp} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#93BC25]" />
                <span>
                  Up to{" "}
                  <span className="font-semibold text-[#364FAB]">
                    70% cheaper
                  </span>{" "}
                  than scooters for short trips.
                </span>
              </motion.li>
              <motion.li variants={fadeInUp} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#364FAB]" />
                <span>
                  <span className="font-semibold text-[#364FAB]">
                    Verified RTU students
                  </span>{" "}
                  on both sides of every ride.
                </span>
              </motion.li>
              <motion.li variants={fadeInUp} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#DDBA7D]" />
                <span>
                  Earn while you&apos;re in class – your cycle works for you
                  instead of waiting outside.
                </span>
              </motion.li>
              <motion.li variants={fadeInUp} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#A3D78A]" />
                <span>
                  Live availability on the map with clear hourly pricing for
                  every bike.
                </span>
              </motion.li>
            </motion.ul>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                to="/browse"
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-slate-400/40"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #364FAB, #93BC25, #364FAB)",
                }}
              >
                Browse cycles
                <span className="text-xs font-normal text-[#FCF6D9]">
                  See live map pins
                </span>
              </Link>
              <Link
                to="/list"
                className="inline-flex items-center gap-2 rounded-full border border-[#364FAB]/50 bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 hover:bg-[#FCF6D9]"
              >
                List my cycle
              </Link>
              <button
                type="button"
                onClick={() => setShowFullMap(true)}
                className="text-xs text-slate-800 underline-offset-2 hover:underline"
              >
                Open full map
              </button>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-[11px] text-slate-600"
            >
              Real-time map above shows demo cycles near RTU campus. Connect to
              your backend later for live data.
            </motion.p>
          </motion.div>

          {/* Right side: image + stats card */}
          <motion.div
            variants={fadeInUp}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="absolute -top-6 -right-4 h-24 w-24 rounded-full bg-[#364FAB]/25 blur-3xl" />
            <div className="absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-[#93BC25]/25 blur-3xl" />

            <div className="relative w-full max-w-sm space-y-3">
              {/* Image card (fake app screenshot / bike photo) */}
              <div className="rounded-3xl overflow-hidden bg-white border border-[#364FAB]/40 shadow-md">
                <div className="relative h-36 w-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/210095/pexels-photo-210095.jpeg?auto=compress&cs=tinysrgb&w=900"
                    alt="Student cycling in city"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute left-3 bottom-3 text-xs text-white">
                    <p className="font-semibold">Cycling across RTU & Riga</p>
                    <p className="text-[11px] text-white/80">
                      Built to make everyday short trips cheaper and cleaner.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats card */}
              <div className="relative rounded-3xl bg-white px-5 py-6 shadow-md border border-[#DDBA7D]/70">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#364FAB]">
                  Live campus snapshot
                </p>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">
                  Cycles around RTU
                </h2>
                <p className="mt-1 text-xs text-slate-600">
                  Quick glance at what&apos;s available right now. Open the full
                  map for detailed pricing and routing.
                </p>

                <div className="mt-4 space-y-2 text-xs text-slate-700">
                  <div
                    className="flex items-center justify-between rounded-2xl px-3 py-2 border border-[#DDBA7D]/80"
                    style={{ background: "#FDF7E4" }}
                  >
                    <div>
                      <p className="font-semibold">Average price</p>
                      <p className="text-[11px] text-slate-500">
                        Per hour across all listed cycles
                      </p>
                    </div>
                    <p className="text-right text-base font-semibold text-[#364FAB]">
                      €2.3/hr
                    </p>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 border border-[#9CC6DB]/70">
                    <div>
                      <p className="font-semibold">Active cycles</p>
                      <p className="text-[11px] text-slate-500">
                        Currently visible on the map
                      </p>
                    </div>
                    <p className="text-right text-base font-semibold text-[#364FAB]">
                      {mockCycles.length}
                    </p>
                  </div>
                  <div
                    className="flex items-center justify-between rounded-2xl px-3 py-2 border border-[#A3D78A]/80"
                    style={{
                      background:
                        "linear-gradient(to bottom, #F5FBEA 0%, #FFFFFF 100%)",
                    }}
                  >
                    <div>
                      <p className="font-semibold">Avg. trip distance</p>
                      <p className="text-[11px] text-slate-500">
                        Inside RTU & nearby Riga
                      </p>
                    </div>
                    <p className="text-right text-base font-semibold text-[#577918]">
                      3.4 km
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-[11px] text-slate-500">
                  Data based on demo cycles. Connect to real data when
                  integrating with your backend.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section className="relative z-10 bg-[#FCF6D9] pb-16 pt-4">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#364FAB]">
              Our services
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-slate-900">
              How ShareMyCycle helps RTU students
            </h2>
            <p className="mt-3 text-sm text-slate-700 max-w-2xl mx-auto">
              ShareMyCycle RTU combines real-time maps, flexible pricing and
              student-only access to make sustainable movement simple for
              everyone at the university.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-5 md:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.18 }}
              className={`group rounded-3xl p-[2px] border border-[#364FAB]/60 shadow-sm ${dualBg}`}
            >
              <div className="rounded-3xl bg-white/95 p-5 h-full flex flex-col gap-2">
                <p className="text-xs font-semibold text-[#364FAB] uppercase tracking-[0.18em]">
                  For riders
                </p>
                <h3 className="text-lg font-semibold text-slate-900">
                  Instant campus rides
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  Find a nearby cycle in seconds, unlock via the map and only
                  pay for the time you actually ride.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.18 }}
              className={`group rounded-3xl p-[2px] border border-[#93BC25]/70 shadow-sm ${dualBg}`}
            >
              <div className="rounded-3xl bg-white/95 p-5 h-full flex flex-col gap-2">
                <p className="text-xs font-semibold text-[#577918] uppercase tracking-[0.18em]">
                  For owners
                </p>
                <h3 className="text-lg font-semibold text-slate-900">
                  Smart passive income
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  Set your hourly rate, choose availability and get notified
                  whenever someone books your cycle.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.18 }}
              className={`group rounded-3xl p-[2px] border border-[#DDBA7D]/70 shadow-sm ${dualBg}`}
            >
              <div className="rounded-3xl bg-white/95 p-5 h-full flex flex-col gap-2">
                <p className="text-xs font-semibold text-[#8D6631] uppercase tracking-[0.18em]">
                  For campus
                </p>
                <h3 className="text-lg font-semibold text-slate-900">
                  Cleaner mobility
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  Less parking pressure, fewer short car trips and more active
                  students around RTU and Riga.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="relative z-10 bg-[#FCF6D9] pb-16">
        <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.3fr)] items-start">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#364FAB]">
              How it works
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-slate-900">
              From map to ride in three simple steps
            </h2>
            <p className="mt-3 text-sm text-slate-700 max-w-xl">
              We design the experience so it feels as simple as unlocking your
              own bike, but with the flexibility of a shared fleet.
            </p>

            <motion.ol
              className="mt-5 space-y-3 text-sm text-slate-900"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.45 }}
            >
              <motion.li className="flex gap-3" variants={fadeInUp}>
                <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#364FAB] text-xs font-semibold text-[#FCF6D9]">
                  1
                </span>
                <div>
                  <p className="font-semibold">Browse the live map</p>
                  <p className="text-slate-700 text-xs md:text-sm">
                    Zoom around RTU and nearby Riga to see which cycles are free
                    right now, along with hourly prices.
                  </p>
                </div>
              </motion.li>
              <motion.li className="flex gap-3" variants={fadeInUp}>
                <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#93BC25] text-xs font-semibold text-slate-900">
                  2
                </span>
                <div>
                  <p className="font-semibold">Tap a cycle and book</p>
                  <p className="text-slate-700 text-xs md:text-sm">
                    Confirm your time window, see pick-up spot and simple rules
                    from the owner, then lock in your ride.
                  </p>
                </div>
              </motion.li>
              <motion.li className="flex gap-3" variants={fadeInUp}>
                <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#DDBA7D] text-xs font-semibold text-slate-900">
                  3
                </span>
                <div>
                  <p className="font-semibold">Ride, return, rate</p>
                  <p className="text-slate-700 text-xs md:text-sm">
                    Enjoy your trip, return the cycle to the agreed spot and
                    leave a rating so the best owners and riders stand out.
                  </p>
                </div>
              </motion.li>
            </motion.ol>
          </motion.div>

          {/* Compact map preview card */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="relative"
          >
            <div className="absolute -top-6 -right-4 h-24 w-24 rounded-full bg-[#364FAB]/25 blur-3xl" />
            <div className="absolute -bottom-8 -left-6 h-24 w-24 rounded-full bg-[#93BC25]/25 blur-3xl" />

            <div
              className={`relative overflow-hidden rounded-3xl shadow-md ring-1 ring-[#364FAB]/60 ${dualBg}`}
            >
              <div className="border-b border-white/40 px-4 py-3 flex items-center justify-between bg-white/70 backdrop-blur">
                <p className="text-xs font-semibold text-slate-900">
                  Map preview · RTU campus
                </p>
                <button
                  type="button"
                  onClick={() => setShowFullMap(true)}
                  className="text-[11px] rounded-full border border-[#364FAB]/70 px-2.5 py-1 text-[#364FAB] bg-white hover:bg-[#FCF6D9]"
                >
                  Open full map
                </button>
              </div>
              <div className="h-64 bg-white">
                <MapView cycles={mockCycles} fullScreen />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FULL MAP MODAL */}
      <AnimatePresence>
        {showFullMap && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#FCF6D9] rounded-3xl shadow-2xl w-[95%] h-[88%] max-w-5xl flex flex-col border border-[#364FAB]/60"
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#364FAB]/40 bg-white/90">
                <h3 className="text-sm font-semibold text-slate-900">
                  Full map · Riga, Latvia
                </h3>
                <button
                  onClick={() => setShowFullMap(false)}
                  className="text-xs rounded-full border border-slate-400 px-3 py-1 text-slate-800 hover:bg-[#FCF6D9]"
                >
                  Close
                </button>
              </div>
              <div className="flex-1 p-3 bg-white">
                <MapView cycles={mockCycles} fullScreen />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
