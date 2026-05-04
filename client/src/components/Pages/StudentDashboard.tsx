import { Box } from "@mui/material";

import DashboardStudentLinks from "./DashboardStudentLinks";
import MyDetailTabs from "./MyDetailTabs";
import MyEventChart from "./MyEventChart";
import StudentProfileCard from "./StudentProfileCard";

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
