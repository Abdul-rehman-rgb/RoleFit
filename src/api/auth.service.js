import { apiClient } from "./client";

const authService = {
  login: (credentials) => apiClient.post("/auth/login", credentials),

  register: (payload) => apiClient.post("/auth/register", payload),

  logout: () => apiClient.get("/auth/logout"),

  getMe: () => apiClient.get("/auth/me"),
};

export default authService;
