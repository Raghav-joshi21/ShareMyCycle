// pages/About.tsx
import { motion } from "framer-motion";

const dualBg =
  "bg-gradient-to-br from-[#364FAB]/35 via-[#364FAB]/10 to-[#93BC25]/25";

const fadeUp = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45 },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

// 👉 Update this when you add more teammates / photos
const teamMembers = [
  {
    name: "Praphull Kumar Pandey",
    role: "Founder & Product Lead",
    img: "/team-praphull.jpg", // put your image here: public/team-praphull.jpg
  },
  {
    name: "Member Two",
    role: "Engineering",
    img: "/team-2.jpg", // optional placeholder
  },
  {
    name: "Member Three",
    role: "Sustainability & Research",
    img: "/team-3.jpg", // optional placeholder
  },
];

export function About() {
  return (
    <main className="pt-20 min-h-[60vh] bg-[#FCF6D9] text-slate-900">
      <div className="max-w-6xl mx-auto px-4 pb-12">
        {/* HERO / INTRO */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className={`rounded-3xl px-6 py-6 md:px-8 md:py-7 border border-[#364FAB]/60 shadow-md ${dualBg} backdrop-blur mt-4 relative overflow-hidden`}
        >
          {/* subtle animated glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#364FAB]/40 blur-3xl"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-[#93BC25]/35 blur-3xl"
            animate={{ opacity: [0.25, 0.6, 0.25], scale: [1, 1.08, 1] }}
            transition={{ duration: 7, repeat: Infinity }}
          />

          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-[#364FAB] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
                  ShareMyCycle RTU
                </span>
                <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-0.5 text-[11px] font-medium text-[#364FAB] border border-[#364FAB]/50">
                  Student mobility · Climate-focused
                </span>
              </div>
              <motion.h1
                variants={fadeUp}
                className="text-2xl md:text-3xl font-semibold leading-snug text-slate-900"
              >
                Making everyday mobility cheaper, greener and smarter for RTU
                students.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-sm md:text-[15px] text-slate-700 leading-relaxed"
              >
                ShareMyCycle RTU is a peer-to-peer bicycle sharing concept
                created during a Climathon in Riga. Our goal is simple: turn
                idle student bicycles into a shared mobility network that saves
                money, reduces emissions and makes campus travel effortless.
              </motion.p>
            </div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.02 }}
              className="rounded-2xl bg-white/85 border border-[#364FAB]/60 px-4 py-3 text-xs shadow-sm max-w-xs"
            >
              <p className="text-[11px] font-semibold text-slate-700 uppercase tracking-[0.16em]">
                At a glance
              </p>
              <ul className="mt-2 space-y-1.5 text-[11px] text-slate-700">
                <li>• Built by RTU students, for the RTU community.</li>
                <li>• Peer-to-peer rentals instead of expensive scooters.</li>
                <li>• Designed as a model for campuses worldwide.</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* PROBLEM + SOLUTION */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid gap-6 md:grid-cols-2"
        >
          {/* Problem card */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4, scale: 1.01 }}
            className={`rounded-3xl border border-[#364FAB]/60 shadow-sm ${dualBg} px-5 py-5`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-800 mb-2">
              The problem
            </p>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Expensive, fragmented student mobility on campus
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              RTU students move constantly between faculties, dorms, labs and
              city transport hubs. For many short trips, the default options are
              electric scooters, occasional taxis or long walks across large
              campus zones. Scooters are expensive, cars create congestion, and
              walking is slow when you&apos;re rushing between lectures.
            </p>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              At the same time, hundreds of student-owned bicycles sit idle for
              most of the day – locked outside lecture halls or dormitories,
              unused and underutilised.
            </p>
          </motion.div>

          {/* Solution card */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4, scale: 1.01 }}
            className={`rounded-3xl border border-[#93BC25]/70 shadow-sm ${dualBg} px-5 py-5`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-800 mb-2">
              Our solution
            </p>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              A peer-to-peer bicycle sharing layer for RTU
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              ShareMyCycle connects students who own bicycles with students who
              need them for short trips. Owners can list their cycles when
              they&apos;re in class or at home; riders can quickly find, reserve
              and ride those cycles for a fraction of scooter prices.
            </p>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              The platform provides a live map view of available bikes, clear
              hourly pricing, approximate pick-up spots and basic rules set by
              each owner – all restricted to verified RTU community members.
            </p>
          </motion.div>
        </motion.section>

        {/* HOW IT WORKS + BENEFITS */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] items-start"
        >
          {/* How it works */}
          <motion.div variants={fadeUp} className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-800">
                How it works
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                From map to ride in three simple steps
              </h2>
            </div>

            <motion.ul
              variants={stagger}
              className="space-y-3 text-sm text-slate-700"
            >
              <motion.li
                variants={fadeUp}
                whileHover={{ y: -2, scale: 1.01 }}
                className={`flex gap-3 rounded-2xl px-4 py-3 border border-[#364FAB]/60 shadow-sm ${dualBg}`}
              >
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#364FAB]/20 text-[11px] font-semibold text-[#364FAB] border border-[#364FAB]/80">
                  1
                </span>
                <div>
                  <p className="font-semibold text-slate-900">
                    Browse the live map
                  </p>
                  <p className="text-xs md:text-sm text-slate-700">
                    Students open the map to see all available cycles around RTU
                    campus, including hourly prices, ratings and approximate
                    pick-up spots.
                  </p>
                </div>
              </motion.li>

              <motion.li
                variants={fadeUp}
                whileHover={{ y: -2, scale: 1.01 }}
                className={`flex gap-3 rounded-2xl px-4 py-3 border border-[#364FAB]/60 shadow-sm ${dualBg}`}
              >
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#364FAB]/18 text-[11px] font-semibold text-[#364FAB] border border-[#364FAB]/80">
                  2
                </span>
                <div>
                  <p className="font-semibold text-slate-900">
                    Tap, book and ride
                  </p>
                  <p className="text-xs md:text-sm text-slate-700">
                    Riders pick a cycle, confirm a time window and follow
                    owner-provided instructions – for example where the lock is
                    and how to access it.
                  </p>
                </div>
              </motion.li>

              <motion.li
                variants={fadeUp}
                whileHover={{ y: -2, scale: 1.01 }}
                className={`flex gap-3 rounded-2xl px-4 py-3 border border-[#93BC25]/70 shadow-sm ${dualBg}`}
              >
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#93BC25]/18 text-[11px] font-semibold text-[#577918] border border-[#93BC25]/80">
                  3
                </span>
                <div>
                  <p className="font-semibold text-slate-900">
                    Return and rate
                  </p>
                  <p className="text-xs md:text-sm text-slate-700">
                    After the ride, the bike is returned to the agreed spot.
                    Both rider and owner can leave ratings, building a trusted
                    community over time.
                  </p>
                </div>
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* Benefits & impact */}
          <motion.div variants={stagger} className="space-y-4">
            <motion.div
              variants={fadeUp}
              className={`rounded-3xl border border-[#364FAB]/70 shadow-sm ${dualBg} px-4 py-4`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-800">
                Why it matters
              </p>
              <h3 className="mt-1 text-sm md:text-base font-semibold text-slate-900">
                Benefits for riders, owners and campus
              </h3>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs md:text-[11px]">
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="rounded-2xl bg_white/85 border border-[#364FAB]/50 px-3 py-2 shadow-sm bg-white/85"
                >
                  <p className="font-semibold text-[#364FAB] text-xs">Riders</p>
                  <p className="mt-1 text-slate-700">
                    Cheaper than scooters, faster than walking and healthier
                    than sitting in traffic.
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="rounded-2xl bg-white/85 border border-[#93BC25]/60 px-3 py-2 shadow-sm"
                >
                  <p className="font-semibold text-[#577918] text-xs">Owners</p>
                  <p className="mt-1 text-slate-700">
                    Turn your existing bike into passive income while
                    you&apos;re in class or in the lab.
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="rounded-2xl bg-white/85 border border-[#364FAB]/50 px-3 py-2 shadow-sm"
                >
                  <p className="font-semibold text-slate-900 text-xs">Campus</p>
                  <p className="mt-1 text-slate-700">
                    Less congestion, fewer scooters on pavements and a more
                    climate-friendly university.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -3, scale: 1.01 }}
              className={`rounded-3xl border border-[#364FAB]/60 shadow-sm ${dualBg} px-4 py-4 text-xs md:text-sm text-slate-700`}
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-800 font-semibold">
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
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid gap-6 md:grid-cols-2"
        >
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -3, scale: 1.01 }}
            className={`rounded-3xl border border-[#364FAB]/60 shadow-sm ${dualBg} px-5 py-5`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-800">
              Trust, safety & reliability
            </p>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              ShareMyCycle is designed to be community-first and campus-safe.
              The concept focuses on:
            </p>
            <ul className="mt-2 space-y-1.5 text-xs md:text-sm text-slate-700">
              <li>• Restricted access to verified RTU students and staff.</li>
              <li>• Transparent hourly pricing defined by each cycle owner.</li>
              <li>• Clear expectations for pick-up, use and return.</li>
              <li>• Ratings for both riders and owners over time.</li>
            </ul>
            <p className="mt-3 text-xs md:text-sm text-slate-700">
              In this prototype, data is fully mocked and runs only in the
              browser. Future iterations can integrate secure authentication,
              payment rails and smart-lock hardware.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            whileHover={{ y: -3, scale: 1.01 }}
            className={`rounded-3xl border border-[#93BC25]/70 shadow-sm ${dualBg} px-5 py-5`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-800">
              Our vision
            </p>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              What started as a Climathon idea at RTU is a blueprint for how
              universities can rethink mobility. Long-term, we imagine:
            </p>
            <ul className="mt-2 space-y-1.5 text-xs md:text-sm text-slate-700">
              <li>• Smart locks connected directly to the platform.</li>
              <li>• Rewards for climate-positive travel choices.</li>
              <li>• Insights for RTU on how students move across campus.</li>
              <li>
                • Expansion to other universities that want cleaner, cheaper
                mobility.
              </li>
            </ul>
            <p className="mt-3 text-xs md:text-sm text-slate-700">
              The goal is simple: every short trip a student takes should be
              affordable, climate-friendly and designed around their real campus
              life – starting right here at RTU.
            </p>
          </motion.div>
        </motion.section>

        {/* TEAM SECTION */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 pb-6"
        >
          <div
            className={`rounded-3xl border border-[#364FAB]/60 shadow-sm ${dualBg} px-5 py-5 flex flex-col gap-6`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-800">
                  Team
                </p>
                <h3 className="mt-1 text-sm md:text-base font-semibold text-slate-900">
                  Built by students, for students
                </h3>
                <p className="mt-2 text-xs md:text-sm text-slate-700 max-w-xl">
                  ShareMyCycle RTU was designed and prototyped by students who
                  experience campus mobility challenges every day. This project
                  is a collaboration between engineering, design and
                  sustainability enthusiasts who believe universities can lead
                  the transition to cleaner transport.
                </p>
              </div>

              {/* Avatar row */}
              <motion.div
                variants={stagger}
                className="flex flex-wrap items-center gap-4"
              >
                {teamMembers.map((member) => (
                  <motion.div
                    key={member.name}
                    variants={fadeUp}
                    whileHover={{ y: -3, scale: 1.03 }}
                    className="flex flex-col items-center gap-1 text-xs"
                  >
                    <div className="relative">
                      <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-white/80 border-2 border-[#364FAB] shadow-sm overflow-hidden flex items-center justify-center">
                        <img
                          src={member.img}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-[#93BC25] border-2 border-white" />
                    </div>
                    <p className="mt-1 font-semibold text-slate-900">
                      {member.name}
                    </p>
                    <p className="text-[11px] text-slate-700 text-center">
                      {member.role}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
