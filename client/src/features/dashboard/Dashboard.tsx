import useIsAdmin from "@hooks/useIsAdmin";

import AdminDashboard from "@features/admin/dashboard/components/AdminDashboard";
import StudentDashboard from "@features/student/dashboard/components/StudentDashboard";

const Dashboard = () => {
  const { isAdmin, isPending, session } = useIsAdmin();

  if (!isPending && session && !isAdmin) {
    return <StudentDashboard />;
  }

  return <AdminDashboard />;
};

export default Dashboard;
