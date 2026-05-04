import { authClient } from "@lib/auth-client";
import { Role } from "@lib/role";

import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";

const Dashboard = () => {
  const { data: session, isPending } = authClient.useSession();
  const isAdmin = session?.user.role === Role.admin;

  if (!isPending && session && !isAdmin) {
    return <StudentDashboard />;
  }

  return <AdminDashboard />;
};

export default Dashboard;
