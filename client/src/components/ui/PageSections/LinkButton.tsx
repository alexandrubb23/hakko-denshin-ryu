import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, type SxProps, type Theme } from "@mui/material";
import { Link } from "react-router";

import { mergeSx } from "@utils/sx";

import { linkButtonSx } from "./PageSections.style";

interface Props {
  to: string;
  /** Placement overrides, e.g. a top margin */
  sx?: SxProps<Theme>;
  /** "back" leads to where the visitor came from, e.g. a detail page's list */
  direction?: "forward" | "back";
  children: React.ReactNode;
}

/** Outlined button leading on to another page, or back to one */
const LinkButton = ({ to, sx, direction = "forward", children }: Props) => (
  <Button
    component={Link}
    to={to}
    variant="outlined"
    startIcon={direction === "back" ? <ArrowBackIcon /> : undefined}
    endIcon={direction === "forward" ? <ArrowForwardIcon /> : undefined}
    sx={mergeSx(linkButtonSx, sx)}
  >
    {children}
  </Button>
);

export default LinkButton;
