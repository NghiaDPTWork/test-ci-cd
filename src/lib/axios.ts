import { useAuthStore } from "@/features/auth";
import axios from "axios";
import { env } from "./env";
import { toast } from "sonner";

// Create instance
const apiClient = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
  withCredentials: true,
  // Dùng cho Cookie
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// =================== REFRESH TOKEN ====================
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

/*
  Khi nào thì refresh 
  1. 
*/

apiClient.interceptors.response.use(
  (response) => {
    return response?.data.data !== undefined
      ? response.data.data
      : response.data;
  },

  async (error) => {
    const originalRequest = error.config;
    const notAuthRequest = originalRequest.url?.includes("/auth/");
    const is401 = error.response?.status === 401;
    const notReriedYet = !originalRequest._retry;

    // Case: Là người đầu tiên or Là người thứ 2 trở đi
    if (is401 && notAuthRequest && notReriedYet) {
      // Case 1: Là người thứ 2 trở đi
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          // Lưu resolve/reject vào queue để chờ
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          // Khi refresh xong, retry này với token mới
          // Nghĩa là có token rồi thì xử nó
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      // Case 2: Là người đầu bị lỗi
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${env.API_URL}auth/refresh`,
          {}, // Nếu BE cần gửi refresh token trong body thì truyền ở đây
          { withCredentials: true },
        );

        const accessToken: string =
          response.data?.data?.accessToken ?? response.data?.accessToken;

        useAuthStore.getState().setAuth({
          accessToken: accessToken,
          role: useAuthStore.getState().role,
        });

        // Xử lý Queue
        processQueue(null, accessToken);

        // Retry reuqest token hiện tại
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().clearAuth();
        toast.error("Phiên bản đã hết hạn, vui lòng đăng nhập lại");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    //
    const message =
      error.response?.data?.message ?? error.message ?? "Đã có lỗi xảy ra";

    // Toast error cho user TRỪ KHI là Logout Endpoint
    const isLogoutEndpoint = error.config.url?.includes("/auth/logout");
    if (!isLogoutEndpoint) {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
