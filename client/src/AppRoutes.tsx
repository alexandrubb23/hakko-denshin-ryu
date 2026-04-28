import ProtectedRoute from '@components/ProtectedRoute';
import { normalizePath } from '@utils/routes';
import { Route, Routes } from 'react-router';
import App from './App';
import { pages } from './pages';

interface AppRoutesProps {
  initialLoaderData: any;
}

export const AppRoutes = ({ initialLoaderData }: AppRoutesProps) => {
  const publicPages = pages.filter(p => !p.protected);
  const protectedPages = pages.filter(p => p.protected);

  return (
    <Routes>
      <Route element={<App />}>
        {publicPages.map(({ path, component: Component }, index) => (
          <Route
            key={path}
            path={normalizePath(path)}
            index={index === 0}
            element={<Component data={initialLoaderData} />}
          />
        ))}

        <Route element={<ProtectedRoute />}>
          {protectedPages.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={normalizePath(path)}
              element={<Component data={initialLoaderData} />}
            />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};
