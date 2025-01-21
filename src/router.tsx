import { createBrowserRouter } from 'react-router-dom';
import { PathRoutes } from './path.routes';
import HomePage from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import BioPage from './pages/BioPage';

const router = createBrowserRouter([
  {
    path: PathRoutes.HomePage,
    element: <HomePage />,
  },
  {
    path: PathRoutes.WelcomPage,
    element: <WelcomePage />,
  },
  {
    path: PathRoutes.BioPage,
    element: <BioPage />,
  }
]);

export default router;
