import AdminRoute from "@components/AdminRoute";
import DashboardLayout from "@components/ui/DashboardLayout/DashboardLayout";
import StudentDetail from "@features/admin/students/components/StudentDetail";
import ProtectedRoute from "@components/ProtectedRoute";
import { normalizePath } from "@utils/routes";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import App from "./App";
import { pages } from "./pages";

interface AppRoutesProps {
  initialLoaderData: any;
}

export const AppRoutes = ({ initialLoaderData }: AppRoutesProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pages.find((p) => normalizePath(p.path) === pathname);
    if (page) document.title = page.title;
  }, [pathname]);

  const standalonePages = pages.filter((p) => p.standalone);
  const publicPages = pages.filter((p) => !p.protected && !p.standalone);
  const protectedPages = pages.filter((p) => p.protected && !p.adminOnly);
  const adminPages = pages.filter((p) => p.adminOnly);

  return (
    <Routes>
      {standalonePages.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={normalizePath(path)}
          element={<Component data={initialLoaderData} />}
        />
      ))}

      <Route element={<App />}>
        {publicPages.map(({ path, component: Component }, index) => (
          <Route
            key={path}
            path={normalizePath(path)}
            index={index === 0}
            element={<Component data={initialLoaderData} />}
          />
        ))}
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {protectedPages.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={normalizePath(path)}
              element={<Component data={initialLoaderData} />}
            />
          ))}

          <Route element={<AdminRoute />}>
            {adminPages.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={normalizePath(path)}
                element={<Component data={initialLoaderData} />}
              />
            ))}
            <Route path="/students/:id" element={<StudentDetail />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
