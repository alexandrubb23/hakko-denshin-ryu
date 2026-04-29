import { Navigate, Outlet } from "react-router";

import { authClient } from "@lib/auth-client";
import { Routes } from "@lib/routes";

const ProtectedRoute = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Outlet />;
  }

  if (!session) {
    return <Navigate to={Routes.login} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
