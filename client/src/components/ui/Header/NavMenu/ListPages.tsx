import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import LanguageSwitcher from "@components/ui/LanguageSwitcher/LanguageSwitcher";
import useIsMobile from "@hooks/isMobile";
import { authClient } from "@lib/auth-client";
import { List, ListItem, SxProps, Typography } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import { PURPLE } from "@style/tokens";
import { normalizePath } from "@utils/routes";
import { Link, useLocation } from "react-router";
import { pages } from "../../../../pages";

interface Props {
  sx?: {
    list?: SxProps<Theme>;
    item?: SxProps<Theme>;
  };
  onPageChange?: () => void;
}

const ListItemStyle = styled(ListItem)(({ sx }) => ({
  cursor: "pointer",
  display: "block",
  fontSize: "2rem",
  textAlign: "center",
  transition: "200ms ease-in-out",
  "&:hover": {
    color: PURPLE,
    cursor: "pointer",
    transform: "scale(1.1)",
  },

  ...(sx as Object),
}));

const ListPages = ({ sx, onPageChange }: Props) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const { data: session } = authClient.useSession();

  const langItem = (
    <ListItemStyle
      key="language-switcher"
      sx={{
        paddingTop: 0,
      }}
    >
      <LanguageSwitcher />
    </ListItemStyle>
  );

  const pageItems = pages
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

      return (
        <ListItemStyle key={page.path} sx={sx?.item}>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              ...cssProps,
            }}
          >
            <Link to={normalizePath(page.path)} onClick={onPageChange}>
              <FormattedMessage
                id={
                  page.path === "login" && session
                    ? "header.menu.login.authenticated"
                    : `header.menu.${page.path}`
                }
              />
            </Link>
          </Typography>
        </ListItemStyle>
      );
    });

  const listContent = isMobile
    ? [langItem, ...pageItems]
    : [...pageItems, langItem];

  return <List sx={sx?.list}>{listContent}</List>;
};

export default ListPages;
