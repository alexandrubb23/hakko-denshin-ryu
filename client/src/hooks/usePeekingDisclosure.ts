import { useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

import usePeekOnScroll from "./usePeekOnScroll";

/**
 * A panel opened by a trigger that itself stays out of sight until the page
 * scrolls (see `usePeekOnScroll`). Closing it leaves the trigger up a moment,
 * rather than whisking it away; `dismiss` closes it only if open, e.g. on a
 * tap outside. Escape closes it and puts the focus back on the trigger, which
 * takes `triggerRef`; only the first open panel takes the key, not all.
 */
const usePeekingDisclosure = <T extends HTMLElement = HTMLButtonElement>() => {
  const triggerRef = useRef<T>(null);
  const [open, setOpen] = useState(false);
  const { peeking, peek } = usePeekOnScroll();

  const close = () => {
    setOpen(false);
    peek();
  };

  const toggle = () => (open ? close() : setOpen(true));

  const dismiss = () => {
    if (open) close();
  };

  useEventListener("keydown", (event) => {
    if (!open || event.key !== "Escape" || event.defaultPrevented) return;
    event.preventDefault();
    close();
    triggerRef.current?.focus();
  });

  return { triggerRef, open, peeking, peek, close, dismiss, toggle };
};

export default usePeekingDisclosure;
