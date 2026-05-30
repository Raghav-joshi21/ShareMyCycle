// Animated text reveal component inspired by premium portfolio sites
// Splits text into lines/words and animates them in with stagger
import { motion } from "framer-motion";
import { viewportOnce } from "../lib/motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const wordVariants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
};

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
}

export function TextReveal({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: TextRevealProps) {
  const words = children.split(" ");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delayChildren: delay }}
    >
      <Tag className={className}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}
