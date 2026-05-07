import MenuIcon from "@mui/icons-material/Menu";
import { Box, Skeleton, Typography } from "@mui/material";
import { Link } from "react-router";

import LogoIcon from "@assets/images/logo.webp";
import { authClient } from "@lib/auth-client";
import { SKELETON_SX } from "@style/tokens";

import {
  MenuButton,
  StyledAppBar,
  StyledToolbar,
} from "./DashboardAppBar.style";

interface Props {
  onMenuClick: () => void;
}

const DashboardAppBar = ({ onMenuClick }: Props) => {
  const { isPending } = authClient.useSession();

  return (
    <StyledAppBar position="fixed" elevation={0}>
      <StyledToolbar>
        <MenuButton
          edge="start"
          onClick={onMenuClick}
          aria-label="open navigation"
        >
          <MenuIcon />
        </MenuButton>

        {isPending ? (
          <Box className="flex items-center gap-2">
            <Skeleton
              variant="circular"
              width={32}
              height={32}
              sx={SKELETON_SX}
            />
            <Skeleton variant="text" width={80} sx={SKELETON_SX} />
          </Box>
        ) : (
          <Link to="/">
            <Box className="flex items-center gap-2">
              <Box component="img" src={LogoIcon} height={32} />
              <Typography variant="body2" fontWeight={700}>
                Senshinkan
              </Typography>
            </Box>
          </Link>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default DashboardAppBar;
