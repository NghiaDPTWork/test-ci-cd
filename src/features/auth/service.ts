import apiClient from "@/lib/axios";
import type { AuthResponse, User, userLogin, userRegister } from "./types";

// Định nghĩa Auth Api
export const authService = {
  // Đăng nhập
  async login(credentials: userLogin): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(
      "/auth/login",
      credentials,
    ) as unknown as Promise<AuthResponse>;
    // Ép kiểu để Axios nó biết
  },

  // Đăng ký
  async register(credentials: userRegister): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(
      "/auth/register",
      credentials,
    ) as unknown as Promise<AuthResponse>;
  },

  // Get profile
  async getProfile(): Promise<User> {
    const data = await apiClient.get("/user/me");
    return data as unknown as Promise<User>;
  },

  // Đăng xuất
  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
  },
};
