import { useState } from "react";
import { useDebounceCallback, useEventListener } from "usehooks-ts";

// How long a control lingers once the page stops scrolling
const PEEK_DURATION = 3000;

const PASSIVE = { passive: true };

/**
 * For controls kept out of sight until the page scrolls (the cover controls'
 * tray, the section nav): `peeking` turns true
 * while the page scrolls, and false once it has been still for `duration`.
 * `peek` does the same by hand, e.g. to leave a control up a moment after its
 * panel closes rather than whisking it away.
 */
const usePeekOnScroll = (duration = PEEK_DURATION) => {
  const [peeking, setPeeking] = useState(false);
  const settle = useDebounceCallback(setPeeking, duration);

  const peek = () => {
    setPeeking(true);
    settle(false);
  };

  useEventListener("scroll", peek, undefined, PASSIVE);

  return { peeking, peek };
};

export default usePeekOnScroll;
