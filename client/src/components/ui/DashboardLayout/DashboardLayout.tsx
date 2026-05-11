import { Box } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";

import useIsMobile from "@hooks/isMobile";
import { authClient } from "@lib/auth-client";
import { Routes } from "@lib/routes";
import { DARK_BG } from "@style/tokens";

import DashboardAppBar from "./DashboardAppBar";
import DashboardDrawer from "./DashboardDrawer";
import DashboardMain from "./DashboardMain";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    queryClient.clear();
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
          <DashboardDrawer
            variant="temporary"
            open={mobileOpen}
            {...drawerProps}
          />
          <DashboardMain withTopOffset />
        </>
      ) : (
        <>
          <DashboardDrawer variant="permanent" {...drawerProps} />
          <DashboardMain />
        </>
      )}
    </Box>
  );
};

export default DashboardLayout;
