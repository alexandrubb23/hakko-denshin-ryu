import { Box } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import TransitionLink from "@components/ui/TransitionLink/TransitionLink";
import useNavItems from "@hooks/useNavItems";

import { listSx, navLinkSx } from "./Footer.style";
import FooterColumnTitle from "./FooterColumnTitle";

const TITLE_ID = "footer-explore";

const FooterExplore = () => {
  const items = useNavItems();

  return (
    <Box component="nav" aria-labelledby={TITLE_ID}>
      <FooterColumnTitle id="footer.explore.title" htmlId={TITLE_ID} />
      <Box component="ul" sx={listSx}>
        {items.map(({ path, to, messageId, isActive }) => (
          <Box component="li" key={path} sx={navLinkSx}>
            <TransitionLink
              to={to}
              aria-current={isActive ? "page" : undefined}
            >
              <FormattedMessage id={messageId} />
            </TransitionLink>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FooterExplore;
