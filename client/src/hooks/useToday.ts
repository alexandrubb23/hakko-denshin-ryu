import useMounted from "@hooks/useMounted";

/**
 * Today's weekday (JS getDay(): 0=Sun ... 6=Sat) in the visitor's time, or
 * null on the server and the first client render, so hydration matches
 */
const useToday = (): number | null => {
  const mounted = useMounted();
  return mounted ? new Date().getDay() : null;
};

export default useToday;
