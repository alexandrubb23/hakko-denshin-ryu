import type { MotionProps } from "framer-motion";
import { fadeUp } from "./FadeIn";

/** Entry animation for a cover's content, played once on load */
export const heroReveal: MotionProps = {
  variants: fadeUp,
  initial: "hidden",
  animate: "visible",
  transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] },
};

/** `heroReveal`, starting after `delay` seconds */
export const delayedHeroReveal = (delay: number): MotionProps => ({
  ...heroReveal,
  transition: { ...heroReveal.transition, delay },
});
