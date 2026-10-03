import { between, seededRandom } from "@utils/random";

/** Which way the breeze carries the petals */
export type PetalDrift = "left" | "right";

/** One petal's size, timing and path, as the custom properties it reads */
export type PetalStyle = Record<`--petal-${string}`, string | number>;

interface Layer {
  size: readonly [number, number];
  opacity: number;
  fall: readonly [number, number];
  blur: number;
}

// Depth: far petals are small, faint and slow; the nearest are large,
// blurred out of focus and quick, passing in front of everything
const LAYERS: readonly Layer[] = [
  { size: [8, 11], opacity: 0.65, fall: [18, 24], blur: 0 },
  { size: [11, 15], opacity: 0.8, fall: [13, 17], blur: 0 },
  { size: [14, 19], opacity: 0.75, fall: [9, 12], blur: 1.5 },
];

/** `count` petals, the same for the same count on the server and client */
export const makePetals = (count: number, drift: PetalDrift): PetalStyle[] => {
  const random = seededRandom(count);

  return Array.from({ length: count }, (_, index) => {
    // Mostly far and middle petals, one near one in five
    const layer = LAYERS[index % 5 === 4 ? 2 : index % 2];
    const fall = between(random, layer.fall);
    const turnFrom = Math.round(random() * 360);

    return {
      "--petal-x": `${(random() * 105 - 5).toFixed(1)}%`,
      "--petal-size": `${between(random, layer.size).toFixed(1)}px`,
      "--petal-opacity": layer.opacity,
      "--petal-blur": layer.blur ? `blur(${layer.blur}px)` : "none",
      "--petal-fall": `${fall.toFixed(1)}s`,
      // Already partway down on arrival
      "--petal-delay": `${(-random() * fall).toFixed(1)}s`,
      // Carried by the breeze, the way the painted petals drift
      "--petal-drift": `${(drift === "left" ? -1 : 1) * Math.round(between(random, [60, 220]))}px`,
      "--petal-sway": `${Math.round(between(random, [12, 40]))}px`,
      "--petal-sway-time": `${between(random, [2.2, 4]).toFixed(1)}s`,
      "--petal-tumble": `${between(random, [3, 7]).toFixed(1)}s`,
      "--petal-turn-from": `${turnFrom}deg`,
      "--petal-turn-to": `${turnFrom + (random() < 0.5 ? -1 : 1) * 360}deg`,
    };
  });
};
