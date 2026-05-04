import { Box, Paper, Skeleton, Typography } from "@mui/material";

import { authClient } from "@lib/auth-client";
import { SKELETON_SX } from "@style/tokens";

import DashboardAdminLinks from "./DashboardAdminLinks";
import DashboardEventChart from "./DashboardEventChart";
import DashboardStudentChart from "./DashboardStudentChart";

const AdminDashboard = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <Paper elevation={3} className="w-full p-8 flex flex-col gap-6">
      <Typography variant="h5" fontWeight={700}>
        {isPending ? (
          <Skeleton width="60%" sx={SKELETON_SX} />
        ) : (
          `Welcome, ${session?.user.name}!`
        )}
      </Typography>

      <Typography variant="body1" color="text.secondary">
        {isPending ? (
          <Skeleton width="80%" sx={SKELETON_SX} />
        ) : (
          session?.user.email
        )}
      </Typography>

      <Box>
        <DashboardAdminLinks />
        <DashboardStudentChart />
        <DashboardEventChart />
      </Box>
    </Paper>
  );
};

export default AdminDashboard;
