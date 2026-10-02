import { useEffect, useState } from "react";

// Shared by every arc menu, so only the first page plays the intro
let introPlayed = false;

/**
 * Whether this arc menu draws its rays and links in. Each cover renders its
 * own menu, so without this the intro replayed on every navigation; later
 * menus show at rest instead. The first client render still plays it,
 * matching the server's markup.
 */
const useArcIntro = () => {
  const [intro] = useState(() => !introPlayed);

  useEffect(() => {
    introPlayed = true;
  }, []);

  return intro;
};

export default useArcIntro;
