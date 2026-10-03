// How long a link's #section is followed, e.g. while a tab's data loads
const HASH_WAIT_MS = 10_000;

// Any of these means the user is scrolling: the section lets go
const USER_SCROLL_EVENTS = ["wheel", "touchstart", "keydown", "mousedown"];

/** Where `target` sits in the page, ignoring transforms (e.g. a fade-in's slide) */
const pageTop = (target: HTMLElement) => {
  let top = 0;
  for (
    let el: HTMLElement | null = target;
    el;
    el = el.offsetParent as HTMLElement | null
  )
    top += el.offsetTop;
  return top - parseFloat(getComputedStyle(target).scrollMarginTop || "0");
};

/**
 * Scrolls to the element of `hash` and keeps it in place while the page
 * settles. The element may not be laid out yet: the page is hidden until it
 * hydrates, and a tab's data may still be loading. Then images loading above
 * it push it down, and Safari has no scroll anchoring to follow it. So it's
 * followed until the user scrolls or `HASH_WAIT_MS` runs out: the page loading
 * says nothing of its queries. Returns a cleanup that lets go of it.
 */
export const scrollToHash = (hash: string) => {
  let id: string;
  try {
    id = decodeURIComponent(hash.slice(1));
  } catch {
    // A malformed fragment, e.g. `#%`, names no section: open at the top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return;
  }
  let frame = 0;

  const follow = () => {
    const target = document.getElementById(id);
    // offsetParent is null while the target, or the page, has display: none
    if (target?.offsetParent) {
      // A section near the page's end can't reach the top of the window
      const maxTop = document.documentElement.scrollHeight - window.innerHeight;
      const top = Math.round(Math.min(pageTop(target), maxTop));
      if (Math.abs(window.scrollY - top) > 1)
        window.scrollTo({ top, left: 0, behavior: "instant" });
    }
    frame = requestAnimationFrame(follow);
  };

  const timer = setTimeout(() => stop(), HASH_WAIT_MS);
  const stop = () => {
    cancelAnimationFrame(frame);
    clearTimeout(timer);
    USER_SCROLL_EVENTS.forEach((type) => removeEventListener(type, stop));
  };
  USER_SCROLL_EVENTS.forEach((type) =>
    addEventListener(type, stop, { passive: true })
  );
  frame = requestAnimationFrame(follow);
  return stop;
};
