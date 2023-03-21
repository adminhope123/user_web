import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import TimerClock from './pages/TimerClock';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import AttendanceList from './pages/AttendanceList/AttendanceList';
import EventPage from './pages/Event/EventPage';
import Profile from './pages/Profile/Profile';
import TaskPage from './pages/TaskPage/TaskPage';
import ActivePage from './pages/ActivePage';

// ----------------------------------------------------------------------

export default function RouterComponent() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'employeestatus', element: <ActivePage /> },
        { path: 'timerClock', element: <TimerClock /> },
        { path: 'attendance-list', element: <AttendanceList /> },
        { path: 'profile', element: <Profile /> },
        { path: 'task', element: <TaskPage /> },
        { path: 'event', element: <EventPage /> },
        // { path: 'products', element: <ProductsPage /> },
        { path: 'staffmembers', element: <BlogPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/login',
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
