export const Belt = {
  white: "white",
  yellow: "yellow",
  orange: "orange",
  green: "green",
  blue: "blue",
  brown: "brown",
  black: "black",
} as const;

export type BeltValue = (typeof Belt)[keyof typeof Belt];
