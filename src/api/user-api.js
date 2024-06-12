// src/services/apiService.js

import { httpClient } from "../axios/httpClient";

export const AuthApi = {
  setToken: (token) => {
    httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  loginWallet: async (credentials) => {
    const response = await httpClient.post(
      "/user/auth/login-wallet",
      credentials
    );

    return response.data;
  },
  postLog: async (data) => {
    const response = await httpClient.post("/user/auth/log", data);

    return response.data;
  },
  test: async () => {
    const response = await httpClient.get("/user/auth/test");
    console.log(response);
    return response.data;
  },

  registerWallet: async (data) => {
    const response = await httpClient.post("/user/auth/register-wallet", data);
    return response.data;
  },

  loginEmail: async (credentials) => {
    const response = await httpClient.post(
      "/user/auth/login-email",
      credentials
    );
    return response.data;
  },

  registerEmail: async (data) => {
    const response = await httpClient.post("/user/auth/register-email", data);
    return response.data;
  },

  loginTelegram: async (credentials) => {
    const response = await httpClient.post(
      "/user/auth/login-telegram",
      credentials
    );
    return response.data;
  },

  refreshToken: async (token) => {
    const response = await httpClient.post("/user/auth/refresh-token", {
      refreshToken: token,
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await httpClient.get("/user/auth/me");
    return response.data;
  },

  mergeWallet: async (data) => {
    const response = await httpClient.post("/user/auth/merge-wallet", data);
    return response.data;
  },
};
