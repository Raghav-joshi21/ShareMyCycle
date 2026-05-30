// App.tsx
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Lenis from "lenis";

// pages
import { Home } from "./pages/Home";
import { Browse } from "./pages/Browse";
import { ListCycle } from "./pages/ListCycle";
import { Dashboard } from "./pages/Dashboard";
import { About } from "./pages/About";
import { Login } from "./pages/Login";

import { AnimatePresence, motion } from "framer-motion";
import { routeVariants } from "./lib/motion";

function App() {
  const location = useLocation();

  // Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-text-primary">
      <Navbar />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={routeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
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
