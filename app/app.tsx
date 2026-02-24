// src/router.tsx
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from 'react-router'
import Landing from './routes/landing';
import Login from './routes/auth/login';
import Register from './routes/auth/register';
import Settings from './routes/dashboard/settings';
import Collections from './routes/dashboard/collections';
import Profile from './routes/dashboard/profile';
import NotFound from './routes/not-found';
import CollectionCreate from './routes/dashboard/collections-create';
import Testing from './routes/testing';
import { AuthProvider } from './contexts/auth';
import Dashboard from './routes/dashboard';
import Notifications from './routes/dashboard/notifications';


const Root = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

const ErrorFallback = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      An error occurred. Please try again later.
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorFallback />,
    children: [
      { index: true, element: <Landing /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Register /> },

      {
        element: (
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        ),
        children: [
          { path: '/dashboard', element: <Dashboard /> },
          { path: '/settings', element: <Settings /> },
          { path: '/collections', element: <Collections /> },
          { path: '/collections/create', element: <CollectionCreate /> },
          { path: '/profile', element: <Profile /> },
          { path: '/notifications', element: <Notifications /> },
          { path: '/testing', element: <Testing /> },
        ]
      },
      { path: '*', element: <NotFound /> },
    ],
  }

])

export default function App() {
  return <RouterProvider router={router} />;
}
