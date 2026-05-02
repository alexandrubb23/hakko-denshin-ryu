import { Navigate, Outlet } from "react-router";

import CenterSpinner from "@components/Spinner/CenterSpinner";
import { authClient } from "@lib/auth-client";
import { Role } from "@lib/role";
import { Routes } from "@lib/routes";

const AdminRoute = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <CenterSpinner minHeight="100vh" />;
  }

  if (session?.user.role !== Role.admin) {
    return <Navigate to={Routes.dashboard} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
