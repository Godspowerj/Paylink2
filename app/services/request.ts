// lib/apiClient.ts

import axios from "axios";
import { tokenStore } from "./token-store";

const baseUrl = "https://paylinkbackend.onrender.com/api/v1";

export const request = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // needed for refresh cookie
});

const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/refresh",
  "/auth/google",
  "/verify-email",
  "/resend-verification",
];

// ✅ REQUEST INTERCEPTOR
request.interceptors.request.use((config) => {
  const token = tokenStore.getAccessToken();

  console.log("CONFIG URL", config.url);

  const isAuthRoute = authRoutes.some((route) =>
    config.url?.includes(route)
  );

  console.log("IS AUTH ROUTE?", isAuthRoute);

  if (token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute = authRoutes.some((route) =>
      originalRequest.url?.includes(route)
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry && 
      !isAuthRoute
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return request(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${baseUrl}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;

        tokenStore.setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return request(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        tokenStore.setAccessToken(null);

        // Optional: redirect to login
        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);