import { Box } from "@mui/material";

import DashboardStudentLinks from "./DashboardStudentLinks";
import MyDetailTabs from "@features/student/profile/components/MyDetailTabs";
import MyEventChart from "@features/student/events/components/MyEventChart";
import StudentProfileCard from "@features/admin/students/components/StudentProfileCard";

const StudentDashboard = () => (
  <Box sx={{ py: 4 }}>
    <StudentProfileCard>
      <DashboardStudentLinks />
    </StudentProfileCard>

    <MyEventChart />
    <MyDetailTabs />
  </Box>
);

export default StudentDashboard;
