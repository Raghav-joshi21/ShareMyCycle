// pages/About.tsx
import { motion } from "framer-motion";
import { fadeIn, slideInLeft, slideInRight, staggerContainer, viewportOnce } from "../lib/motion";
import { TextReveal } from "../components/TextReveal";

// Update this when you add more teammates / photos
const teamMembers = [
  {
    name: "Praphull Kumar Pandey",
    role: "Founder & Product Lead",
    img: "/team-praphull.jpg",
  },
  {
    name: "Member Two",
    role: "Engineering",
    img: "/team-2.jpg",
  },
  {
    name: "Member Three",
    role: "Sustainability & Research",
    img: "/team-3.jpg",
  },
];

export function About() {
  return (
    <main className="pt-14 min-h-[60vh] text-text-primary">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* HERO / INTRO */}
        <motion.section
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="rounded-xl bg-surface border border-border shadow-sm px-6 py-6 md:px-8 md:py-7 mt-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-brand-blue px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white shadow-sm">
                  ShareMyCycle RTU
                </span>
                <span className="inline-flex items-center rounded-full bg-surface-raised px-3 py-0.5 text-[11px] font-medium text-brand-blue border border-border">
                  Student mobility · Climate-focused
                </span>
              </div>
              <TextReveal as="h1" className="font-serif text-2xl md:text-3xl lg:text-4xl text-text-primary tracking-tight">
                Making everyday mobility cheaper, greener and smarter for RTU students.
              </TextReveal>
              <p className="text-sm md:text-[15px] text-text-secondary leading-relaxed">
                ShareMyCycle RTU is a peer-to-peer bicycle sharing concept
                created during a Climathon in Riga. Our goal is simple: turn
                idle student bicycles into a shared mobility network that saves
                money, reduces emissions and makes campus travel effortless.
              </p>
            </div>

            <div className="rounded-xl bg-surface border border-border px-4 py-3 text-xs shadow-sm max-w-xs hover:shadow-md transition-shadow">
              <p className="text-[11px] font-semibold text-text-primary uppercase tracking-[0.08em]">
                At a glance
              </p>
              <ul className="mt-2 space-y-1.5 text-[11px] text-text-secondary">
                <li>• Built by RTU students, for the RTU community.</li>
                <li>• Peer-to-peer rentals instead of expensive scooters.</li>
                <li>• Designed as a model for campuses worldwide.</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* PROBLEM + SOLUTION */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 grid gap-6 md:grid-cols-2"
        >
          {/* Problem card */}
          <motion.div
            variants={slideInLeft}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="group cursor-pointer rounded-xl border border-border bg-surface shadow-xs px-5 py-5 hover:shadow-md hover:border-brand-blue/30 transition-colors duration-300"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary mb-2">
              The problem
            </p>
            <h2 className="text-lg font-semibold font-serif text-text-primary mb-2">
              Expensive, fragmented student mobility on campus
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              RTU students move constantly between faculties, dorms, labs and
              city transport hubs. For many short trips, the default options are
              electric scooters, occasional taxis or long walks across large
              campus zones. Scooters are expensive, cars create congestion, and
              walking is slow when you&apos;re rushing between lectures.
            </p>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              At the same time, hundreds of student-owned bicycles sit idle for
              most of the day – locked outside lecture halls or dormitories,
              unused and underutilised.
            </p>
          </motion.div>

          {/* Solution card */}
          <motion.div
            variants={slideInRight}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="group cursor-pointer rounded-xl border border-border bg-surface shadow-xs px-5 py-5 hover:shadow-md hover:border-brand-blue/30 transition-colors duration-300"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary mb-2">
              Our solution
            </p>
            <h2 className="text-lg font-semibold font-serif text-text-primary mb-2">
              A peer-to-peer bicycle sharing layer for RTU
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              ShareMyCycle connects students who own bicycles with students who
              need them for short trips. Owners can list their cycles when
              they&apos;re in class or at home; riders can quickly find, reserve
              and ride those cycles for a fraction of scooter prices.
            </p>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              The platform provides a live map view of available bikes, clear
              hourly pricing, approximate pick-up spots and basic rules set by
              each owner – all restricted to verified RTU community members.
            </p>
          </motion.div>
        </motion.section>

        {/* HOW IT WORKS + BENEFITS */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] items-start"
        >
          {/* How it works */}
          <motion.div
            variants={slideInLeft}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="space-y-4"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
                How it works
              </p>
              <TextReveal as="h2" className="mt-1 text-lg font-semibold font-serif text-text-primary">
                From map to ride in three simple steps
              </TextReveal>
            </div>

            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex gap-3 rounded-lg border border-border bg-surface px-4 py-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-[11px] font-semibold text-brand-blue border border-brand-blue/30">
                  1
                </span>
                <div>
                  <p className="font-semibold text-text-primary">
                    Browse the live map
                  </p>
                  <p className="text-xs md:text-sm text-text-secondary">
                    Students open the map to see all available cycles around RTU
                    campus, including hourly prices, ratings and approximate
                    pick-up spots.
                  </p>
                </div>
              </li>

              <li className="flex gap-3 rounded-lg border border-border bg-surface px-4 py-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-[11px] font-semibold text-brand-blue border border-brand-blue/30">
                  2
                </span>
                <div>
                  <p className="font-semibold text-text-primary">
                    Tap, book and ride
                  </p>
                  <p className="text-xs md:text-sm text-text-secondary">
                    Riders pick a cycle, confirm a time window and follow
                    owner-provided instructions – for example where the lock is
                    and how to access it.
                  </p>
                </div>
              </li>

              <li className="flex gap-3 rounded-lg border border-border bg-surface px-4 py-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-[11px] font-semibold text-brand-blue border border-brand-blue/30">
                  3
                </span>
                <div>
                  <p className="font-semibold text-text-primary">
                    Return and rate
                  </p>
                  <p className="text-xs md:text-sm text-text-secondary">
                    After the ride, the bike is returned to the agreed spot.
                    Both rider and owner can leave ratings, building a trusted
                    community over time.
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Benefits & impact */}
          <motion.div
            variants={slideInRight}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="space-y-4"
          >
            <motion.div
              variants={fadeIn}
              className="rounded-xl border border-border bg-surface shadow-xs px-4 py-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
                Why it matters
              </p>
              <h3 className="mt-1 text-sm md:text-base font-semibold font-serif text-text-primary">
                Benefits for riders, owners and campus
              </h3>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs md:text-[11px]">
                <div className="rounded-lg border border-border bg-surface px-3 py-2">
                  <p className="font-semibold text-brand-blue text-xs">Riders</p>
                  <p className="mt-1 text-text-secondary">
                    Cheaper than scooters, faster than walking and healthier
                    than sitting in traffic.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-surface px-3 py-2">
                  <p className="font-semibold text-brand-green text-xs">Owners</p>
                  <p className="mt-1 text-text-secondary">
                    Turn your existing bike into passive income while
                    you&apos;re in class or in the lab.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-surface px-3 py-2">
                  <p className="font-semibold text-text-primary text-xs">Campus</p>
                  <p className="mt-1 text-text-secondary">
                    Less congestion, fewer scooters on pavements and a more
                    climate-friendly university.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="rounded-xl border border-border bg-surface shadow-xs px-4 py-4 text-xs md:text-sm text-text-secondary"
            >
              <p className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-semibold">
                Impact goals
              </p>
              <ul className="mt-2 space-y-1.5">
                <li>• Cut CO₂ emissions from short campus trips.</li>
                <li>
                  • Reduce dependence on high-cost scooters and ride-hailing.
                </li>
                <li>
                  • Make cycling accessible to students who don&apos;t own
                  bikes.
                </li>
                <li>
                  • Build a model RTU can showcase as a leading campus mobility
                  project.
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* TRUST + VISION */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 grid gap-6 md:grid-cols-2"
        >
          <motion.div
            variants={slideInLeft}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="group cursor-pointer rounded-xl border border-border bg-surface shadow-xs px-5 py-5 hover:shadow-md hover:border-brand-blue/30 transition-colors duration-300"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Trust, safety &amp; reliability
            </p>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              ShareMyCycle is designed to be community-first and campus-safe.
              The concept focuses on:
            </p>
            <ul className="mt-2 space-y-1.5 text-xs md:text-sm text-text-secondary">
              <li>• Restricted access to verified RTU students and staff.</li>
              <li>• Transparent hourly pricing defined by each cycle owner.</li>
              <li>• Clear expectations for pick-up, use and return.</li>
              <li>• Ratings for both riders and owners over time.</li>
            </ul>
            <p className="mt-3 text-xs md:text-sm text-text-secondary">
              In this prototype, data is fully mocked and runs only in the
              browser. Future iterations can integrate secure authentication,
              payment rails and smart-lock hardware.
            </p>
          </motion.div>

          <motion.div
            variants={slideInRight}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="group cursor-pointer rounded-xl border border-border bg-surface shadow-xs px-5 py-5 hover:shadow-md hover:border-brand-blue/30 transition-colors duration-300"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Our vision
            </p>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              What started as a Climathon idea at RTU is a blueprint for how
              universities can rethink mobility. Long-term, we imagine:
            </p>
            <ul className="mt-2 space-y-1.5 text-xs md:text-sm text-text-secondary">
              <li>• Smart locks connected directly to the platform.</li>
              <li>• Rewards for climate-positive travel choices.</li>
              <li>• Insights for RTU on how students move across campus.</li>
              <li>
                • Expansion to other universities that want cleaner, cheaper
                mobility.
              </li>
            </ul>
            <p className="mt-3 text-xs md:text-sm text-text-secondary">
              The goal is simple: every short trip a student takes should be
              affordable, climate-friendly and designed around their real campus
              life – starting right here at RTU.
            </p>
          </motion.div>
        </motion.section>

        {/* TEAM SECTION */}
        <motion.section
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mt-10 pb-6"
        >
          <div className="rounded-xl border border-border bg-surface shadow-xs px-5 py-5 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
                  Team
                </p>
                <h3 className="mt-1 text-sm md:text-base font-semibold font-serif text-text-primary">
                  Built by students, for students
                </h3>
                <p className="mt-2 text-xs md:text-sm text-text-secondary max-w-xl">
                  ShareMyCycle RTU was designed and prototyped by students who
                  experience campus mobility challenges every day. This project
                  is a collaboration between engineering, design and
                  sustainability enthusiasts who believe universities can lead
                  the transition to cleaner transport.
                </p>
              </div>

              {/* Avatar row */}
              <motion.div
                variants={staggerContainer}
                className="flex flex-wrap items-center gap-4"
              >
                {teamMembers.map((member) => {
                  const initials = member.name.split(" ").map((n) => n[0]).join("");
                  return (
                    <motion.div
                      key={member.name}
                      variants={fadeIn}
                      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                      className="flex flex-col items-center gap-1 text-xs"
                    >
                      <div className="relative">
                        <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-semibold text-lg border-2 border-brand-blue/20">
                          {initials}
                        </div>
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-brand-green border-2 border-white" />
                      </div>
                      <p className="mt-1 font-semibold font-serif text-text-primary text-center">
                        {member.name}
                      </p>
                      <p className="text-[11px] text-text-secondary text-center">
                        {member.role}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
