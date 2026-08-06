import { useAuthStore } from "@/features/auth/store";
import { Navigate } from "react-router-dom";

interface GuestRouteProps {
  children: React.ReactNode;
}

export default function GuestRouter({ children }: GuestRouteProps) {
  const { accessToken, role } = useAuthStore();

  if (accessToken) {
    const authPath = role === "admin" ? "/admin" : "/";
    return <Navigate to={authPath} replace />;
  }

  return <>{children}</>;
}
