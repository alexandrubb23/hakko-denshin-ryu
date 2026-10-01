import { Box } from "@mui/material";
import { useState } from "react";

import MoonLoader from "./MoonLoader";
import { loaderScreenSx } from "./PageLoader.style";

interface Props {
  loading: boolean;
}

/**
 * A full-screen loading screen over the page; once `loading` ends it fades
 * out while the page fades in, then leaves the DOM.
 */
const PageLoader = ({ loading }: Props) => {
  const [faded, setFaded] = useState(false);

  if (faded && !loading) return null;

  return (
    <Box
      sx={loaderScreenSx(loading)}
      aria-hidden={!loading}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget) setFaded(!loading);
      }}
    >
      <MoonLoader />
    </Box>
  );
};

export default PageLoader;
