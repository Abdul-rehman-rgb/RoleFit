import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Dashboard from "./features/home/pages/Dashboard";
import Interview from "./features/interview/pages/Interview";
import InterviewReport from "./features/interview/pages/InterviewReport";
import Landing from "./features/marketing/pages/Landing";
import About from "./features/marketing/pages/About";
import HowItWorks from "./features/marketing/pages/HowItWorks";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import GuestRoute from "./features/auth/components/GuestRoute";
import MarketingLayout from "./components/layout/MarketingLayout";
import AppLayout from "./components/layout/AppLayout";

export const appRoutes = createBrowserRouter([
  {
    element: <MarketingLayout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/about", element: <About /> },
      { path: "/how-it-works", element: <HowItWorks /> },
    ],
  },
  {
    element: <GuestRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/interview", element: <Interview /> },
          { path: "/interview/report", element: <InterviewReport /> },
          { path: "/interview/last-report", element: <InterviewReport /> },
        ],
      },
    ],
  },
]);
