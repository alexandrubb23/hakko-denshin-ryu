import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Skeleton,
  SxProps,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";

import LogoIcon from "@assets/images/logo.webp";
import useIsMobile from "@hooks/isMobile";
import { authClient } from "@lib/auth-client";
import { Routes } from "@lib/routes";
import {
  BACKDROP_BLUR,
  BORDER_COLOR,
  DARK_BG,
  PURPLE_ALPHA_12,
  SURFACE_BG,
} from "@style/tokens";

import DrawerContent from "./DrawerContent";

const DRAWER_WIDTH = 220;

const DRAWER_PAPER_SX: SxProps<Theme> = {
  width: DRAWER_WIDTH,
  boxSizing: "border-box" as const,
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  backgroundColor: SURFACE_BG,
  backdropFilter: BACKDROP_BLUR,
  "& .MuiListItemIcon-root": { color: "#fff" },
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate(Routes.login, { replace: true });
  };

  const drawerProps = {
    onClose: () => setMobileOpen(false),
    onSignOut: handleSignOut,
  };

  return (
    <Box
      sx={{ display: "flex", minHeight: "100dvh", backgroundColor: DARK_BG }}
    >
      {isMobile ? (
        <>
          <AppBar
            position="fixed"
            elevation={0}
            sx={{
              backgroundColor: SURFACE_BG,
              backdropFilter: BACKDROP_BLUR,
              borderBottom: `1px solid ${BORDER_COLOR}`,
            }}
          >
            <Toolbar sx={{ gap: 1 }}>
              <IconButton
                edge="start"
                onClick={() => setMobileOpen((prev) => !prev)}
                sx={{ color: "#fff" }}
                aria-label="open navigation"
              >
                <MenuIcon />
              </IconButton>
              {isPending ? (
                <Box className="flex items-center gap-2">
                  <Skeleton
                    variant="circular"
                    width={32}
                    height={32}
                    sx={{ bgcolor: PURPLE_ALPHA_12 }}
                  />
                  <Skeleton
                    variant="text"
                    width={80}
                    sx={{ bgcolor: PURPLE_ALPHA_12 }}
                  />
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
            </Toolbar>
          </AppBar>

          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                ...DRAWER_PAPER_SX,
                borderRight: `1px solid ${BORDER_COLOR}`,
              },
            }}
          >
            <DrawerContent {...drawerProps} />
          </Drawer>

          <Box
            component="main"
            sx={{ flexGrow: 1, minWidth: 0, p: 1.5, mt: 8 }}
          >
            <Outlet />
          </Box>
        </>
      ) : (
        <>
          <Drawer
            variant="permanent"
            sx={{
              width: DRAWER_WIDTH,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                ...DRAWER_PAPER_SX,
                borderRight: `1px solid ${BORDER_COLOR}`,
              },
            }}
          >
            <DrawerContent {...drawerProps} />
          </Drawer>

          <Box component="main" sx={{ flexGrow: 1, minWidth: 0, p: 1.5 }}>
            <Outlet />
          </Box>
        </>
      )}
    </Box>
  );
};

export default DashboardLayout;
