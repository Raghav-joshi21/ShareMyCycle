// App.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// pages
import { Home } from "./pages/Home";
import { Browse } from "./pages/Browse";
import { ListCycle } from "./pages/ListCycle";
import { Dashboard } from "./pages/Dashboard";
import { About } from "./pages/About";
import { Login } from "./pages/Login";

import { AnimatePresence, motion } from "framer-motion";

const routeVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(2px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35 },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(2px)",
    transition: { duration: 0.25 },
  },
};

function App() {
  const location = useLocation();
   return (
    <div className="min-h-screen flex flex-col bg-[#FCF6D9] text-slate-900">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={routeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full"
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/list" element={<ListCycle />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

export default App;
