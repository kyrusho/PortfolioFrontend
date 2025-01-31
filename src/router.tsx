import { createBrowserRouter } from 'react-router-dom';
import { PathRoutes } from './path.routes';
import WelcomePage from './pages/WelcomePage';
import CommentsPage from './pages/CommentsPage';

const router = createBrowserRouter([
  {
    path: PathRoutes.WelcomPage,
    element: <WelcomePage />,
  },
  {
    path: PathRoutes.CommentsPage,
    element: <CommentsPage />,
  }
]);

export default router;
