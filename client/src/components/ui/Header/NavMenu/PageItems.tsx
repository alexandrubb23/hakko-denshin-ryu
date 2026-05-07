import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import { authClient } from "@lib/auth-client";
import { SxProps, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { PURPLE } from "@style/tokens";
import { normalizePath } from "@utils/routes";
import type { IntlMessageID } from "i18n/messages";
import { Link, useLocation } from "react-router";
import { pages } from "../../../../pages";

import { ListItemStyle } from "./ListPages.style";

interface Props {
  itemSx?: SxProps<Theme>;
  onPageChange?: () => void;
}

const PageItems = ({ itemSx, onPageChange }: Props) => {
  const location = useLocation();
  const { data: session } = authClient.useSession();

  return pages
    .filter((page) => !page.hideFromNav)
    .map((page) => {
      const cssProps =
        location.pathname === normalizePath(page.path)
          ? {
              border: `1px solid ${PURPLE}`,
              borderRadius: "20px",
              padding: "2px 15px",
            }
          : {};

      const messageId =
        page.path === "login" && session
          ? "header.menu.login.authenticated"
          : (`header.menu.${page.path}` as IntlMessageID);

      return (
        <ListItemStyle key={page.path} sx={itemSx}>
          <Typography variant="body1" sx={{ textAlign: "center", ...cssProps }}>
            <Link to={normalizePath(page.path)} onClick={onPageChange}>
              <FormattedMessage id={messageId} />
            </Link>
          </Typography>
        </ListItemStyle>
      );
    });
};

export default PageItems;
