// pages/Home.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { mockCycles } from "../data";
import { MapView } from "../components/MapView";
import { ScrollAnimation } from "../components/ScroolAnimation";
import { TextReveal } from "../components/TextReveal";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeIn,
  staggerContainer,
  viewportOnce,
} from "../lib/motion";

export function Home() {
  const [showFullMap, setShowFullMap] = useState(false);

  return (
    <main className="flex flex-col pt-14 text-text-primary">

      {/* DARK HERO WITH IMAGE */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Animation */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 15, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-brand-cream/100" />
        </div>

        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium uppercase tracking-[0.2em] text-white mb-8 shadow-2xl"
          >
            <span className="h-2 w-2 rounded-full bg-brand-green-light animate-pulse" />
            Peer-to-peer bicycle sharing
          </motion.div>
          <TextReveal
            as="h1"
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight drop-shadow-lg"
          >
            Share your cycle. Move your campus.
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="mt-8 text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow"
          >
            Up to 70% cheaper than scooters. Built by RTU students, for RTU students. Discover a greener, faster way to navigate your day.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.76, 0, 0.24, 1] }}
            className="mt-12 flex flex-wrap items-center justify-center gap-5"
          >
            <Link
              to="/browse"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-blue px-8 py-4 text-base font-semibold text-white transition-all hover:bg-brand-blue-dark hover:scale-[1.03] hover:shadow-xl hover:shadow-brand-blue/30"
            >
              Browse cycles
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/list"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/30 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/20 hover:scale-[1.03]"
            >
              List my cycle
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SCROLL STORY SECTION */}
      <section>
        <ScrollAnimation />
      </section>

      {/* MAP HERO SECTION */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="group rounded-xl border border-border shadow-sm overflow-hidden transition-shadow hover:shadow-lg"
          >
            <div className="h-[260px] sm:h-[320px] relative">
              <MapView cycles={mockCycles} fullScreen />

              {/* label badge */}
              <div className="absolute left-4 top-4 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-[11px] text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green-light" />
                Live campus map · demo pins
              </div>

              <button
                type="button"
                onClick={() => setShowFullMap(true)}
                className="absolute right-4 bottom-4 text-[11px] rounded-full bg-white/90 px-3 py-1.5 text-text-primary border border-border shadow-sm hover:bg-surface"
              >
                Open full-screen map
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TEXT HERO SECTION */}
      <section className="py-16 md:py-20">
        <motion.div
          className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Left text column */}
          <motion.div className="space-y-5" variants={staggerContainer}>
            <motion.p
              variants={fadeIn}
              className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-[11px] font-medium tracking-[0.08em] uppercase text-brand-blue border border-border shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green-light" />
              ShareMyCycle RTU
            </motion.p>

            <motion.div variants={fadeIn}>
              <h1
                className="font-serif text-2xl md:text-4xl leading-tight text-text-primary tracking-tight"
              >
                Affordable, student-first{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #3651AB 0%, #7BAD1E 40%, #3651AB 100%)",
                  }}
                >
                  cycle sharing on campus
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeIn}
              className="max-w-xl text-sm md:text-base text-text-secondary"
            >
              Up to{" "}
              <span className="font-semibold text-brand-blue">70% cheaper</span>{" "}
              than scooters for getting around RTU, with live cycle availability,
              transparent hourly pricing and listings owned by fellow students.
            </motion.p>

            <motion.ul
              variants={staggerContainer}
              className="grid gap-2 text-xs md:text-sm text-text-primary md:grid-cols-2"
            >
              <motion.li variants={fadeIn} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-blue" />
                <span>
                  <span className="font-semibold text-brand-blue">
                    Verified RTU students
                  </span>{" "}
                  on both sides of every ride.
                </span>
              </motion.li>
              <motion.li variants={fadeIn} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-tan" />
                <span>
                  Earn while you&apos;re in class – your cycle works for you
                  instead of waiting outside.
                </span>
              </motion.li>
              <motion.li variants={fadeIn} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-green" />
                <span>
                  Live availability on the map with clear hourly pricing for
                  every bike.
                </span>
              </motion.li>
            </motion.ul>

            <motion.div
              variants={fadeIn}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                to="/browse"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-brand-blue-dark transition-all"
              >
                Browse cycles
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/list"
                className="inline-flex items-center gap-2 rounded-full border border-border text-text-primary px-6 py-3 text-sm font-medium hover:bg-surface-sunken transition-colors link-hover"
              >
                List my cycle
              </Link>
              <button
                type="button"
                onClick={() => setShowFullMap(true)}
                className="text-xs text-text-secondary underline-offset-2 hover:underline"
              >
                Open full map
              </button>
            </motion.div>

            <motion.p variants={fadeIn} className="text-[11px] text-text-tertiary">
              Real-time map above shows demo cycles near RTU campus. Connect to
              your backend later for live data.
            </motion.p>
          </motion.div>

          {/* Right side: image + stats card */}
          <motion.div
            variants={fadeIn}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm space-y-3">
              {/* Image card */}
              <div className="group rounded-xl overflow-hidden bg-surface border border-border shadow-sm">
                <div className="relative h-36 w-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/210095/pexels-photo-210095.jpeg?auto=compress&cs=tinysrgb&w=900"
                    alt="Student cycling in city"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute left-3 bottom-3 text-xs text-white">
                    <p className="font-semibold">Cycling across RTU &amp; Riga</p>
                    <p className="text-[11px] text-white/80">
                      Built to make everyday short trips cheaper and cleaner.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats card */}
              <div className="rounded-xl bg-surface border border-border shadow-sm px-5 py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-blue">
                  Live campus snapshot
                </p>
                <TextReveal
                  as="h2"
                  className="font-serif text-2xl md:text-3xl lg:text-4xl text-text-primary tracking-tight mt-2"
                >
                  Cycles around RTU
                </TextReveal>
                <p className="mt-1 text-xs text-text-secondary">
                  Quick glance at what&apos;s available right now. Open the full
                  map for detailed pricing and routing.
                </p>

                <div className="mt-4 space-y-0 text-xs text-text-primary divide-y divide-border">
                  <div className="flex items-center justify-between px-3 py-3">
                    <div>
                      <p className="font-semibold">Average price</p>
                      <p className="text-[11px] text-text-tertiary">
                        Per hour across all listed cycles
                      </p>
                    </div>
                    <p className="text-right text-base font-serif font-semibold text-brand-blue">
                      €2.3/hr
                    </p>
                  </div>
                  <div className="flex items-center justify-between px-3 py-3">
                    <div>
                      <p className="font-semibold">Active cycles</p>
                      <p className="text-[11px] text-text-tertiary">
                        Currently visible on the map
                      </p>
                    </div>
                    <p className="text-right text-base font-serif font-semibold text-brand-blue">
                      {mockCycles.length}
                    </p>
                  </div>
                  <div className="flex items-center justify-between px-3 py-3">
                    <div>
                      <p className="font-semibold">Avg. trip distance</p>
                      <p className="text-[11px] text-text-tertiary">
                        Inside RTU &amp; nearby Riga
                      </p>
                    </div>
                    <p className="text-right text-base font-serif font-semibold text-brand-green-dark">
                      3.4 km
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-[11px] text-text-tertiary">
                  Data based on demo cycles. Connect to real data when
                  integrating with your backend.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-10"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-blue">
              Our services
            </p>
            <TextReveal
              as="h2"
              className="font-serif text-2xl md:text-3xl lg:text-4xl text-text-primary tracking-tight mt-2"
            >
              How ShareMyCycle helps RTU students
            </TextReveal>
            <p className="mt-3 text-sm text-text-secondary max-w-2xl mx-auto">
              ShareMyCycle RTU combines real-time maps, flexible pricing and
              student-only access to make sustainable movement simple for
              everyone at the university.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-5 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div
              variants={fadeIn}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="group cursor-pointer rounded-xl border border-border bg-surface shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col gap-2"
            >
              <div className="h-0.5 w-0 group-hover:w-full bg-brand-blue transition-all duration-500 ease-out" />
              <p className="text-xs font-semibold text-brand-blue uppercase tracking-[0.08em]">
                For riders
              </p>
              <h3 className="text-lg font-semibold text-text-primary">
                Instant campus rides
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                Find a nearby cycle in seconds, unlock via the map and only pay
                for the time you actually ride.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="group cursor-pointer rounded-xl border border-border bg-surface shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col gap-2"
            >
              <div className="h-0.5 w-0 group-hover:w-full bg-brand-green transition-all duration-500 ease-out" />
              <p className="text-xs font-semibold text-brand-green uppercase tracking-[0.08em]">
                For owners
              </p>
              <h3 className="text-lg font-semibold text-text-primary">
                Smart passive income
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                Set your hourly rate, choose availability and get notified
                whenever someone books your cycle.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="group cursor-pointer rounded-xl border border-border bg-surface shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col gap-2"
            >
              <div className="h-0.5 w-0 group-hover:w-full bg-brand-tan-dark transition-all duration-500 ease-out" />
              <p className="text-xs font-semibold text-brand-tan-dark uppercase tracking-[0.08em]">
                For campus
              </p>
              <h3 className="text-lg font-semibold text-text-primary">
                Cleaner mobility
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                Less parking pressure, fewer short car trips and more active
                students around RTU and Riga.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.3fr)] items-start">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-blue">
              How it works
            </p>
            <TextReveal
              as="h2"
              className="font-serif text-2xl md:text-3xl lg:text-4xl text-text-primary tracking-tight mt-2"
            >
              From map to ride in three simple steps
            </TextReveal>
            <p className="mt-3 text-sm text-text-secondary max-w-xl">
              We design the experience so it feels as simple as unlocking your
              own bike, but with the flexibility of a shared fleet.
            </p>

            <motion.ol
              className="mt-5 space-y-3 text-sm text-text-primary"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <motion.li className="flex gap-3" variants={fadeIn}>
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-blue text-xs font-semibold text-white">
                  1
                </span>
                <div>
                  <p className="font-semibold">Browse the live map</p>
                  <p className="text-text-secondary text-xs md:text-sm">
                    Zoom around RTU and nearby Riga to see which cycles are free
                    right now, along with hourly prices.
                  </p>
                </div>
              </motion.li>
              <motion.li className="flex gap-3" variants={fadeIn}>
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-green text-xs font-semibold text-white">
                  2
                </span>
                <div>
                  <p className="font-semibold">Tap a cycle and book</p>
                  <p className="text-text-secondary text-xs md:text-sm">
                    Confirm your time window, see pick-up spot and simple rules
                    from the owner, then lock in your ride.
                  </p>
                </div>
              </motion.li>
              <motion.li className="flex gap-3" variants={fadeIn}>
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-tan text-xs font-semibold text-text-primary">
                  3
                </span>
                <div>
                  <p className="font-semibold">Ride, return, rate</p>
                  <p className="text-text-secondary text-xs md:text-sm">
                    Enjoy your trip, return the cycle to the agreed spot and
                    leave a rating so the best owners and riders stand out.
                  </p>
                </div>
              </motion.li>
            </motion.ol>
          </motion.div>

          {/* Map preview card */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="group overflow-hidden rounded-xl border border-border shadow-sm transition-shadow hover:shadow-lg">
              <div className="border-b border-border px-4 py-3 flex items-center justify-between bg-surface">
                <p className="text-xs font-semibold text-text-primary">
                  Map preview · RTU campus
                </p>
                <button
                  type="button"
                  onClick={() => setShowFullMap(true)}
                  className="text-[11px] rounded-lg border border-border px-2.5 py-1 text-brand-blue bg-surface hover:bg-surface-sunken"
                >
                  Open full map
                </button>
              </div>
              <div className="h-64">
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
              className="bg-surface rounded-xl shadow-xl border border-border w-[95%] h-[88%] max-w-5xl flex flex-col"
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <h3 className="text-sm font-semibold text-text-primary">
                  Full map · Riga, Latvia
                </h3>
                <button
                  onClick={() => setShowFullMap(false)}
                  className="text-xs rounded-lg border border-border px-3 py-1 text-text-primary hover:bg-surface-sunken"
                >
                  Close
                </button>
              </div>
              <div className="flex-1 p-3">
                <MapView cycles={mockCycles} fullScreen />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
