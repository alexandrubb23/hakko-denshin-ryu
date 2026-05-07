import { Box, Paper } from "@mui/material";

import useIsAdmin from "@hooks/useIsAdmin";
import SkeletonText from "@components/ui/SkeletonText/SkeletonText";

import DashboardAdminLinks from "./DashboardAdminLinks";
import DashboardEventChart from "./DashboardEventChart";
import DashboardStudentChart from "./DashboardStudentChart";

const AdminDashboard = () => {
  const { session, isPending } = useIsAdmin();

  return (
    <Paper elevation={3} className="w-full p-8 flex flex-col gap-6">
      <SkeletonText isLoading={isPending} skeletonWidth="60%" variant="h5" fontWeight={700}>
        {`Welcome, ${session?.user.name}!`}
      </SkeletonText>

      <SkeletonText isLoading={isPending} skeletonWidth="80%" variant="body1" color="text.secondary">
        {session?.user.email}
      </SkeletonText>

      <Box>
        <DashboardAdminLinks />
        <DashboardStudentChart />
        <DashboardEventChart />
      </Box>
    </Paper>
  );
};

export default AdminDashboard;
