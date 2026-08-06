import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../store";
import { authService } from "../service";
import type { AuthResponse, JwtPayload, LoginRequest } from "../types";
import { jwtDecode } from "jwt-decode";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: (userData) => authService.login(userData),

    onSuccess: (response) => {
      const decoded = jwtDecode<JwtPayload>(response.accessToken);
      setAuth({
        accessToken: response.accessToken,
        role: decoded.role,
      });

      toast.success("Đăng nhập thành công");

      if (decoded.role === "admin") {
        navigate("/admin");
      } else {
        navigate(from, { replace: true });
      }
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Đăng nhập thất bại, vui lòng thử lại",
      );
    },

    onSettled: () => {
      console.log("onSettled");
    },
  });
};
