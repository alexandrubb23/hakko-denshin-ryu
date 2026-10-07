import AdminRoute from "@components/AdminRoute";
import ProtectedRoute from "@components/ProtectedRoute";
import DashboardLayout from "@components/ui/DashboardLayout/DashboardLayout";
import StudentDetail from "@features/admin/students/components/StudentDetail";
import NotFound from "@features/public/not-found/NotFound";
import useCurrentPage from "@hooks/useCurrentPage";
import useDocumentTitle from "@hooks/useDocumentTitle";
import useScrollToTop from "@hooks/useScrollToTop";
import { useViewTransitionCommit } from "@hooks/useViewTransitionNavigate";
import { normalizePath } from "@utils/routes";
import { Route, Routes } from "react-router";
import App from "./App";
import { pages } from "./pages";

interface AppRoutesProps {
  initialLoaderData: any;
}

export const AppRoutes = ({ initialLoaderData }: AppRoutesProps) => {
  useScrollToTop();
  useViewTransitionCommit();

  const page = useCurrentPage();
  useDocumentTitle(page?.ownTitle ? undefined : page);

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
        <Route path="*" element={<NotFound />} />
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
