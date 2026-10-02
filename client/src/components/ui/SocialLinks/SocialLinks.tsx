import { Box, SvgIcon, type SxProps, type Theme } from "@mui/material";

import { SOCIAL_LINKS } from "@constants/contact";
import { listResetSx } from "@style/list";
import { mergeSx } from "@utils/sx";

interface Props {
  sx?: SxProps<Theme>;
  linkSx?: SxProps<Theme>;
}

/** The dojo's social media accounts, as a row of icon links */
const SocialLinks = ({ sx, linkSx }: Props) => (
  <Box component="ul" sx={mergeSx(listResetSx, { flexDirection: "row" }, sx)}>
    {SOCIAL_LINKS.map(({ label, href, icon }) => (
      <li key={href}>
        <Box
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          sx={linkSx}
        >
          <SvgIcon component={icon} fontSize="small" />
        </Box>
      </li>
    ))}
  </Box>
);

export default SocialLinks;
