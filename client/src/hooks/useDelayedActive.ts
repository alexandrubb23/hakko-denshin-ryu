import { useEffect, useState } from "react";
import { useTimeout } from "usehooks-ts";

const useDelayedActive = (active: boolean, delay: number): boolean => {
  const [delayedActive, setDelayedActive] = useState(false);

  useTimeout(() => setDelayedActive(true), active ? delay : null);

  useEffect(() => {
    if (!active) setDelayedActive(false);
  }, [active]);

  return delayedActive;
};

export default useDelayedActive;
