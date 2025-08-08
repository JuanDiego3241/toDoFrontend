import api from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user?: { id?: string; email?: string; [k: string]: any };
}

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
};

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
    console.log("Registering with payload:", payload);
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
};

export const logout = (): void => {
  localStorage.removeItem("token");
};
