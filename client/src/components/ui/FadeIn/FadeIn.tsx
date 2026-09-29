import { motion } from "framer-motion";

import { EASE_OUT } from "@constants/animationsTiming";

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  /** Stretch to the parent's height (e.g. equal-height grid cards). */
  fullHeight?: boolean;
}

/** Fades and slides its children up the first time they scroll into view. */
const FadeIn = ({ children, delay = 0, fullHeight }: FadeInProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-40px" }}
    variants={fadeUp}
    transition={{ duration: 0.7, ease: EASE_OUT, delay }}
    style={fullHeight ? { height: "100%" } : undefined}
  >
    {children}
  </motion.div>
);

export default FadeIn;
