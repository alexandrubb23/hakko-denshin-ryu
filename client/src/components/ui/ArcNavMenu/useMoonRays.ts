import { type RefObject, useEffect, useState } from "react";

// Gap between the moon's rim / the link text and the ray ends
const RAY_MOON_GAP = 8;
const RAY_ITEM_GAP = 6;

export interface Ray {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/**
 * Measures one ray from the moon's rim to each item of the list, in the
 * wrapper's coordinates. Re-measures on resize and once web fonts load.
 */
const useMoonRays = (
  wrapperRef: RefObject<HTMLElement | null>,
  moonRef: RefObject<HTMLElement | null>,
  listRef: RefObject<HTMLElement | null>
) => {
  const [rays, setRays] = useState<Ray[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const moon = moonRef.current;
    const list = listRef.current;
    if (!wrapper || !moon || !list) return;

    let cancelled = false;

    // offset* values ignore the items' entry/hover transforms, so the rays
    // always point at the resting position of each link
    const measure = () => {
      if (cancelled) return;

      const radius = moon.offsetWidth / 2;
      const cx = moon.offsetLeft + radius;
      const cy = moon.offsetTop + moon.offsetHeight / 2;

      const items = Array.from(list.children) as HTMLElement[];
      setRays(
        items.map((item) => {
          // Aim at the side of the link facing the moon
          const left = list.offsetLeft + item.offsetLeft;
          const isRightOfMoon = left > cx;
          const tx = isRightOfMoon
            ? left + RAY_ITEM_GAP
            : left + item.offsetWidth - RAY_ITEM_GAP;
          const ty = list.offsetTop + item.offsetTop + item.offsetHeight / 2;
          const angle = Math.atan2(ty - cy, tx - cx);
          return {
            x1: cx + Math.cos(angle) * (radius + RAY_MOON_GAP),
            y1: cy + Math.sin(angle) * (radius + RAY_MOON_GAP),
            x2: tx,
            y2: ty,
          };
        })
      );
    };

    measure();
    document.fonts?.ready.then(measure);

    const observer = new ResizeObserver(measure);
    observer.observe(wrapper);
    observer.observe(list);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [wrapperRef, moonRef, listRef]);

  return rays;
};

export default useMoonRays;
