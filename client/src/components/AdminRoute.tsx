import { Box, CircularProgress } from "@mui/material";
import { Navigate, Outlet } from "react-router";

import { authClient } from "@lib/auth-client";
import { Role } from "@lib/role";
import { Routes } from "@lib/routes";

const AdminRoute = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <Box className="flex items-center justify-center min-h-dvh">
        <CircularProgress sx={{ color: "#AB96FF" }} />
      </Box>
    );
  }

  if (session?.user.role !== Role.admin) {
    return <Navigate to={Routes.dashboard} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
