import { normalizePath } from '@utils/routes';
import { Route, Routes } from 'react-router';
import App from './App';
import { pages } from './pages';

interface AppRoutesProps {
  initialLoaderData: any;
}

export const AppRoutes = ({ initialLoaderData }: AppRoutesProps) => {
  return (
    <Routes>
      <Route element={<App />}>
        {pages.map(({ path, component: Component }, index) => (
          <Route
            key={path}
            path={normalizePath(path)}
            index={index === 0}
            element={<Component data={initialLoaderData} />}
          />
        ))}
      </Route>
    </Routes>
  );
};
