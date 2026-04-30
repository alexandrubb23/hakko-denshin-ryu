import AdminRoute from '@components/AdminRoute';
import DashboardLayout from '@components/DashboardLayout/DashboardLayout';
import StudentDetail from '@components/Pages/StudentDetail';
import ProtectedRoute from '@components/ProtectedRoute';
import { normalizePath } from '@utils/routes';
import { Route, Routes } from 'react-router';
import App from './App';
import { pages } from './pages';

interface AppRoutesProps {
  initialLoaderData: any;
}

export const AppRoutes = ({ initialLoaderData }: AppRoutesProps) => {
  const standalonePages = pages.filter(p => p.standalone);
  const publicPages = pages.filter(p => !p.protected && !p.standalone);
  const protectedPages = pages.filter(p => p.protected && !p.adminOnly);
  const adminPages = pages.filter(p => p.adminOnly);

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
