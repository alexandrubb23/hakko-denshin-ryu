import type { MotionProps } from "framer-motion";

/** Entry animation shared by both home hero layouts */
export const heroReveal: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  initial: "hidden",
  animate: "visible",
  transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] },
};
