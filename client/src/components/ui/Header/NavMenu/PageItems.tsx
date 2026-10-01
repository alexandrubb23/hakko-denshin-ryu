import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import { authClient } from "@lib/auth-client";
import { SxProps, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { PURPLE } from "@style/tokens";
import { normalizePath } from "@utils/routes";
import { mergeSx } from "@utils/sx";
import type { IntlMessageID } from "i18n/messages";
import { Link, useLocation } from "react-router";
import { navPages } from "../../../../pages";

import { ListItemStyle } from "./ListPages.style";

const ACTIVE_ITEM_SX = {
  border: `1px solid ${PURPLE}`,
  borderRadius: "20px",
  padding: "2px 15px",
};

interface Props {
  itemSx?: SxProps<Theme>;
  /** Per-item styles, e.g. to lay items out along a curve */
  getItemSx?: (index: number, count: number) => SxProps<Theme>;
  onPageChange?: () => void;
}

const PageItems = ({ itemSx, getItemSx, onPageChange }: Props) => {
  const location = useLocation();
  const { data: session } = authClient.useSession();

  return navPages.map((page, index) => {
    const isActive = location.pathname === normalizePath(page.path);

    const messageId =
      page.path === "login" && session
        ? "header.menu.login.authenticated"
        : (`header.menu.${page.path}` as IntlMessageID);

    return (
      <ListItemStyle
        key={page.path}
        sx={mergeSx(itemSx, getItemSx?.(index, navPages.length))}
      >
        <Typography
          variant="body1"
          sx={{ textAlign: "center", ...(isActive && ACTIVE_ITEM_SX) }}
        >
          <Link
            to={normalizePath(page.path)}
            aria-current={isActive ? "page" : undefined}
            onClick={onPageChange}
          >
            <FormattedMessage id={messageId} />
          </Link>
        </Typography>
      </ListItemStyle>
    );
  });
};

export default PageItems;
