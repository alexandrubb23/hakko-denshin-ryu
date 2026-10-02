import type { SvgIconComponent } from "@mui/icons-material";
import { Box } from "@mui/material";
import type { ReactNode } from "react";

import { contactItemSx, contactNoteSx } from "./Footer.style";

interface Props {
  icon: SvgIconComponent;
  href: string;
  /** Opens in a new tab, e.g. a map */
  external?: boolean;
  note?: ReactNode;
  children: ReactNode;
}

/** An icon, the way to reach us as a link, and an optional note below it */
const FooterContactItem = ({
  icon: Icon,
  href,
  external,
  note,
  children,
}: Props) => (
  <Box component="li" sx={contactItemSx}>
    <Icon />
    <span>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
      {note && (
        <Box component="span" sx={contactNoteSx}>
          {note}
        </Box>
      )}
    </span>
  </Box>
);

export default FooterContactItem;
