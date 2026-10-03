/**
 * A seeded generator (mulberry32) of numbers in [0, 1), so the server and
 * the client draw the same "random" values
 */
export const seededRandom = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** A value drawn by `random` between `min` and `max` */
export const between = (
  random: () => number,
  [min, max]: readonly [number, number]
) => min + random() * (max - min);
