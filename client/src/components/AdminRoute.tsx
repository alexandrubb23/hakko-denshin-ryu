import { Navigate, Outlet } from "react-router";

import PageLoader from "@components/ui/PageLoader/PageLoader";
import useIsAdmin from "@hooks/useIsAdmin";
import { Routes } from "@lib/routes";

const AdminRoute = () => {
  const { isAdmin, isPending } = useIsAdmin();

  if (isPending) {
    return <PageLoader loading />;
  }

  if (!isAdmin) {
    return <Navigate to={Routes.dashboard} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
