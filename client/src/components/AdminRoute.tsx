import { Navigate, Outlet } from "react-router";

import CenterSpinner from "@components/ui/Spinner/CenterSpinner";
import useIsAdmin from "@hooks/useIsAdmin";
import { Routes } from "@lib/routes";

const AdminRoute = () => {
  const { isAdmin, isPending } = useIsAdmin();

  if (isPending) {
    return <CenterSpinner minHeight="100vh" />;
  }

  if (!isAdmin) {
    return <Navigate to={Routes.dashboard} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
