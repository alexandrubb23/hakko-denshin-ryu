import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, type SxProps, type Theme } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import { linkButtonSx } from "@components/ui/PageSections/PageSections.style";

interface Props {
  href: string;
  /** The events list's cards use the small one */
  size?: "small" | "medium";
  sx?: SxProps<Theme>;
}

/** Opens the event's ticket shop in a new tab */
const TicketsButton = ({ href, size = "medium", sx = linkButtonSx }: Props) => (
  <Button
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    variant="outlined"
    size={size}
    endIcon={
      <OpenInNewIcon sx={size === "small" ? { fontSize: 14 } : undefined} />
    }
    sx={sx}
  >
    <FormattedMessage id="page.events.get.tickets" />
  </Button>
);

export default TicketsButton;
