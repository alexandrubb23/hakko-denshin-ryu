import { useCallback, useEffect, useState } from "react";

/**
 * A value that clears itself `ms` after it's shown, e.g. a "Link copied"
 * notice. Showing it again, even the same value, starts the wait over.
 */
const useTransientState = <T>(ms: number) => {
  // Boxed, so showing the same value again is still a new state
  const [shown, setShown] = useState<{ value: T } | null>(null);

  useEffect(() => {
    if (!shown) return;
    const timer = setTimeout(() => setShown(null), ms);
    return () => clearTimeout(timer);
  }, [shown, ms]);

  const show = useCallback((value: T) => setShown({ value }), []);

  return [shown?.value ?? null, show] as const;
};

export default useTransientState;
