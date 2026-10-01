import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, type SxProps, type Theme } from "@mui/material";
import { Link } from "react-router";

import { mergeSx } from "@utils/sx";

import { linkButtonSx } from "./PageSections.style";

interface Props {
  to: string;
  /** Placement overrides, e.g. a top margin */
  sx?: SxProps<Theme>;
  children: React.ReactNode;
}

/** Outlined button leading on to another page */
const LinkButton = ({ to, sx, children }: Props) => (
  <Button
    component={Link}
    to={to}
    variant="outlined"
    endIcon={<ArrowForwardIcon />}
    sx={mergeSx(linkButtonSx, sx)}
  >
    {children}
  </Button>
);

export default LinkButton;
