import { Box, Drawer, SxProps, Theme } from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";

import useIsMobile from "@hooks/isMobile";
import { authClient } from "@lib/auth-client";
import { Routes } from "@lib/routes";
import {
  BACKDROP_BLUR,
  BORDER_COLOR,
  DARK_BG,
  SURFACE_BG,
} from "@style/tokens";

import DashboardAppBar from "./DashboardAppBar";
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
          <DashboardAppBar onMenuClick={() => setMobileOpen((prev) => !prev)} />

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
