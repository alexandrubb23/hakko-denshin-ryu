import { fadeUp } from "@components/ui/FadeIn/FadeIn";
import type { MotionProps } from "framer-motion";

/** Entry animation shared by both home hero layouts */
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
