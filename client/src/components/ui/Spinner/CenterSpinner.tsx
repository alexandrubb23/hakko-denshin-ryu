import { Box } from "@mui/material";

import Spinner from "./Spinner";

interface Props {
  minHeight?: string | number;
}

const CenterSpinner = ({ minHeight = "200px" }: Props) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight,
    }}
  >
    <Spinner />
  </Box>
);

export default CenterSpinner;
