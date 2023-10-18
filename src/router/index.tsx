import { Navigate, RouteObject } from "react-router-dom";

import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import LearnPage from "@/pages/learn";
import AboutPage from "@/pages/about";
import AppLayout from "@/components/app-layout";
import DashboardLayout from "@/pages/dashboard";
import TermManagementPage from "@/pages/dashboard/term-management";
import UserInfoPage from "@/pages/dashboard/user-info";
import NotFoundPage from "@/pages/not-found";
import { useUserStore } from "@/stores/user";
import LaunchLearningPage from "@/pages/launch-learning";

function AuthRouter({ children }: { children: React.ReactNode }) {
  const { isLogin } = useUserStore();
  return <>{isLogin ? children : <Navigate to="/login" replace />}</>;
}

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "dashboard",
        element: (
          <AuthRouter>
            <DashboardLayout />
          </AuthRouter>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="term-management" replace />,
          },
          {
            path: "term-management",
            element: <TermManagementPage />,
          },
          {
            path: "user-info",
            element: <UserInfoPage />,
          },
        ],
      },
      {
        path: "launch-learning",
        element: (
          <AuthRouter>
            <LaunchLearningPage />
          </AuthRouter>
        ),
      },
      {
        path: "about",
        element: (
          <AuthRouter>
            <AboutPage />
          </AuthRouter>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "learn",
    element: (
      <AuthRouter>
        <LearnPage />
      </AuthRouter>
    ),
  },
];
