import type { Variants } from "framer-motion";

// Easing curves inspired by high-end portfolio sites
const easeOut = [0.25, 0.1, 0.25, 1] as const;
const easeInOut = [0.76, 0, 0.24, 1] as const;

// Basic fade-in with upward slide
export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [...easeInOut] },
  },
};

// Dramatic text reveal (larger movement, slower)
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [...easeInOut] },
  },
};

// Subtle slide from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [...easeInOut] },
  },
};

// Subtle slide from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [...easeInOut] },
  },
};

// Scale up entrance (for cards, images)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [...easeOut] },
  },
};

// Container with staggered children
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

// Fast stagger for lists
export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

// Route page transitions
export const routeVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [...easeInOut] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: [...easeInOut] },
  },
};

// Viewport config for whileInView
export const viewportOnce = { once: true, amount: 0.2 as const };
export const viewportHalf = { once: true, amount: 0.5 as const };
