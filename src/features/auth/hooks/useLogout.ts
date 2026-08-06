import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../store";
import { authService } from "../service";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: () => authService.logout(),

    onSuccess: () => {
      clearAuth();
      queryClient.removeQueries();
      navigate("/login");
      toast.success("Đăng xuất thành công!", {
        description: "Hẹn gặp lại bạn.",
      });
    },

    onError: (error: any) => {
      clearAuth();
      queryClient.removeQueries();
      navigate("/login");
      toast.success("Đăng xuất thành công!", {
        description: "Hẹn gặp lại bạn.",
      });
      console.log("This is some errors" + error);
    },
    onSettled: () => {
      console.log("onSettled");
    },
  });
};
