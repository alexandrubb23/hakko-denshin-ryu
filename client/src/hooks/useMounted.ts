import { useLayoutEffect, useState } from "react";

/**
 * False on the server and on the first client render (so hydration matches
 * the server's markup), true once the component has mounted on the client.
 */
const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

export default useMounted;
