import { Box } from "@mui/material";

import StudentProfileCard from "@features/admin/students/components/StudentProfileCard";
import MyEventChart from "@features/student/events/components/MyEventChart";
import MyDetailTabs from "@features/student/profile/components/MyDetailTabs";
import DashboardStudentLinks from "./DashboardStudentLinks";

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
