import { Box, type SxProps, type Theme } from "@mui/material";
import { mergeSx } from "@utils/sx";

import { sealSx } from "./HankoSeal.style";

/** Hanko seal: 洗心道館; `sx` positions and sizes it */
const HankoSeal = ({ sx }: { sx?: SxProps<Theme> }) => (
  <Box sx={mergeSx(sealSx, sx)} lang="ja" aria-hidden>
    洗心
    <br />
    道館
  </Box>
);

export default HankoSeal;
