// src/router.tsx
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from 'react-router'
import Landing from './routes/landing';
import Login from './routes/auth/login';
import Register from './routes/auth/register';
import Settings from './routes/dashboard/settings';
import PaymentLinks from './routes/dashboard/links';
import Profile from './routes/dashboard/profile';
import NotFound from './routes/not-found';
import CollectionCreate from './routes/dashboard/collections-create';
import Testing from './routes/testing';
import { AuthProvider } from './contexts/auth';
import Dashboard from './routes/dashboard';
import Notifications from './routes/dashboard/notifications';
import LinkDetails from './routes/dashboard/link-details';
import SettingsProfile from './routes/dashboard/settings-profile';
import SettingsSecurity from './routes/dashboard/settings-security';
import Invoices from './routes/dashboard/invoices';
import Contributors from './routes/dashboard/contributors';
import Payments from './routes/dashboard/payments';
import CreateInvoice from './routes/dashboard/invoice-create';



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
          { path: '/settings/profile', element: <SettingsProfile /> },
          { path: '/settings/security', element: <SettingsSecurity /> },
          { path: '/collections', element: <PaymentLinks /> },
          { path: '/collections/create', element: <CollectionCreate /> },
          { path: '/collections/:id', element: <LinkDetails /> },
          { path: '/profile', element: <Profile /> },
          { path: '/notifications', element: <Notifications /> },
          { path: '/invoices', element: <Invoices /> },
          { path: '/invoices/create', element: <CreateInvoice /> },
          { path: '/dashboard/invoices', element: <Invoices /> },
          { path: '/contributors', element: <Contributors /> },
          { path: '/payments', element: <Payments /> },
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
