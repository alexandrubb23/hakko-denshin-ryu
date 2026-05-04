import useIsAdmin from "@hooks/useIsAdmin";

import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";

const Dashboard = () => {
  const { isAdmin, isPending, session } = useIsAdmin();

  if (!isPending && session && !isAdmin) {
    return <StudentDashboard />;
  }

  return <AdminDashboard />;
};

export default Dashboard;
