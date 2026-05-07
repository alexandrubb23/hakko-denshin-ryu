import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { styled } from "@mui/material/styles";

import { BACKDROP_BLUR, BORDER_COLOR, PURPLE, SURFACE_BG } from "@style/tokens";

export const StyledTableContainer = styled(TableContainer)({
  marginTop: 16,
  backgroundColor: SURFACE_BG,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 8,
  backdropFilter: BACKDROP_BLUR,
});

export const HeaderCell = styled(TableCell)({
  color: PURPLE,
  fontWeight: 700,
  fontSize: "0.75rem",
  borderBottom: `1px solid ${BORDER_COLOR}`,
});
