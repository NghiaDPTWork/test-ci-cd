import type { UserRole } from "@/shared/types";

// Define interface Frontend cần (CHUẨN HÓA)
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  fullname: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface userRegister {
  fullname: string;
  email: string;
  password: string;
}

export interface userLogin {
  email: string;
  password: string;
}

export interface AuthState {
  accessToken: string | null;
  role: UserRole | null;
}

export interface AuthAction {
  setAuth: (payload: { accessToken: string; role: UserRole | null }) => void;
  clearAuth: () => void;
}

export interface AuthResponse {
  accessToken: string;
  subscription?: {
    hasActiveSubsription: boolean;
    subsriptionStatus?: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}
