import { createBrowserRouter } from 'react-router-dom';
import { PathRoutes } from './path.routes';
import WelcomePage from './pages/WelcomePage';
import CommentsPage from './pages/CommentsPage';
import CallbackPage from './pages/Callbackpage';
import AddProjectPage from './pages/AddProjectPage';
import UpdateProjectPage from './pages/UpdateProjectPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import TravelPage from './pages/TravelPage';


const router = createBrowserRouter([
  {
    path: PathRoutes.WelcomPage,
    element: <WelcomePage />,
  },
  {
    path: PathRoutes.CommentsPage,
    element: <CommentsPage />,
  },
  {
    path: PathRoutes.Callbackpage,
    element: <CallbackPage />,
  },
  {
    path: PathRoutes.AddProjectPage,
    element: <AddProjectPage />,
  },
  {
    path: PathRoutes.UpdateProjectPage,
    element: <UpdateProjectPage />,
  },
  {
    path: PathRoutes.AdminDashboardPage,
    element: <AdminDashboardPage />,
  },
  {
    path: PathRoutes.TravelPage,
    element: <TravelPage />,
  },
]);

export default router;
