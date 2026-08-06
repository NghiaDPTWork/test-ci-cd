import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ProfilePage from "@/features/auth/pages/ProfilePage";
import HomePage from "@/features/landing/pages/HomePage";
import UserLayout from "@/shared/layouts/UserLayout";
import { createBrowserRouter } from "react-router-dom";
import GuestRouter from "@/shared/components/guards/GuestRouter";
import ProtectedRoute from "@/shared/components/guards/ProtectedRoute";
import RitualCategoryPage from "@/features/rituals/pages/RitualCategoryPage";
import RitualDetailPage from "@/features/rituals/pages/RitualDetailPage";
import UnAuthorizedPage from "@/shared/pages/UnAuthorizedPage";
import NotFoundPage from "@/shared/pages/NotFoundPage";
import { lazy, Suspense, type ReactNode } from "react";
import { LoadingState } from "@/shared/components/common/LoadingState";

// Admin pages loaded lazily
const AdminLayout = lazy(() => import("@/shared/layouts/AdminLayout"));
const AdminDashboard = lazy(
  () => import("@/features/rituals/pages/AdminDashboard"),
);
const ManageRitualsListPage = lazy(
  () => import("@/features/rituals/pages/ManageRitualsListPage"),
);
const ManageRitualCreatePage = lazy(
  () => import("@/features/rituals/pages/ManageRitualCreatePage"),
);
const ManageRitualEditPage = lazy(
  () => import("@/features/rituals/pages/ManageRitualEditPage"),
);
const ManageUserListPage = lazy(
  () => import("@/features/rituals/pages/ManageUserListPage"),
);

const withSuspense = (children: ReactNode) => (
  <Suspense fallback={<LoadingState className="py-20" size="lg" />}>
    {children}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "rituals",
        element: <RitualCategoryPage />,
      },
      {
        path: "rituals/:id",
        element: <RitualDetailPage />,
      },
      {
        path: "login",
        element: (
          <GuestRouter>
            <LoginPage />
          </GuestRouter>
        ),
      },
      {
        path: "register",
        element: (
          <GuestRouter>
            <RegisterPage />
          </GuestRouter>
        ),
      },

      // Process Wrong Role for User
      {
        path: "unauthorized",
        element: <UnAuthorizedPage />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },

      // Handle 404 Error
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  // Admin
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        {withSuspense(<AdminLayout />)}
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: withSuspense(<AdminDashboard />),
      },
      {
        path: "rituals",
        element: withSuspense(<ManageRitualsListPage />),
      },
      {
        path: "rituals/create",
        element: withSuspense(<ManageRitualCreatePage />),
      },
      {
        path: "rituals/:id/edit",
        element: withSuspense(<ManageRitualEditPage />),
      },
      {
        path: "users",
        element: withSuspense(<ManageUserListPage />),
      },
    ],
  },
]);
