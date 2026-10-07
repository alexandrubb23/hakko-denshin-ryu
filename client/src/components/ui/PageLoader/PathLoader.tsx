import { Box } from "@mui/material";
import { useState } from "react";

import pathSrc from "@assets/images/loader-path.webp";

import { pathArtSx, pathLoaderSx } from "./PageLoader.style";

/** A lone practitioner searching the moonlit forks for the way, while something loads */
const PathLoader = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box sx={pathLoaderSx}>
      <Box
        component="img"
        src={pathSrc}
        alt=""
        fetchPriority="high"
        // Already decoded from the cache (or the server's markup) before hydration
        ref={(img: HTMLImageElement | null) => {
          if (img?.complete) setLoaded(true);
        }}
        onLoad={() => setLoaded(true)}
        sx={pathArtSx(loaded)}
      />
    </Box>
  );
};

export default PathLoader;
