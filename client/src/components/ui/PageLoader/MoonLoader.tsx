import { Box } from "@mui/material";
import { useIntl } from "react-intl";

import ensoSrc from "@assets/images/loader-enso.webp";
import moonSrc from "@assets/images/loader-moon.webp";

import { ensoSx, moonLoaderSx, moonSx } from "./PageLoader.style";

interface Props {
  /** CSS width (and height) of the ensō */
  size?: string;
}

/** The moon, with an ink ensō turning round it while something loads */
const MoonLoader = ({ size = "clamp(140px, 28vmin, 240px)" }: Props) => {
  const intl = useIntl();

  return (
    <Box
      role="status"
      aria-label={intl.formatMessage({ id: "common.loading" })}
      sx={moonLoaderSx(size)}
    >
      <Box component="img" src={moonSrc} alt="" sx={moonSx} />
      <Box component="img" src={ensoSrc} alt="" sx={ensoSx} />
    </Box>
  );
};

export default MoonLoader;
