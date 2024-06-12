// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from "react";

import { AuthApi } from "../api/user-api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || null
  );

  useEffect(() => {
    if (accessToken) {
      AuthApi.setToken(accessToken);
      AuthApi.getCurrentUser()
        .then((user) => {
          setUser(user);
          console.log(user);
          navigate("/dashboard");
        })
        .catch(() => {
          setAccessToken(null);
          setRefreshToken(null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/auth");
        });
    } else {
      navigate("/auth");
    }
  }, [accessToken, navigate]);

  const loginWallet = async (credentials) => {
    try {
      const { accessToken, refreshToken } = await AuthApi.loginWallet(
        credentials
      );

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      AuthApi.setToken(accessToken);
      const user = await AuthApi.getCurrentUser();
      setUser(user);
      navigate("/dashboard");
    } catch (err) {
      setError(err);
    }
  };

  const loginEmail = async (credentials) => {
    const { accessToken, refreshToken } = await AuthApi.loginEmail(credentials);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    AuthApi.setToken(accessToken);
    const user = await AuthApi.getCurrentUser();
    setUser(user);
    navigate("/dashboard");
  };

  const loginTelegram = async (credentials) => {
    const { accessToken, refreshToken } = await AuthApi.loginTelegram(
      credentials
    );
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    AuthApi.setToken(accessToken);
    const user = await AuthApi.getCurrentUser();
    setUser(user);
    navigate("/dashboard");
  };

  const registerEmail = async (data) => {
    const { accessToken, refreshToken } = await AuthApi.registerEmail(data);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    AuthApi.setToken(accessToken);
    const user = await AuthApi.getCurrentUser();
    setUser(user);
    navigate("/dashboard");
  };

  const mergeWallet = async (data) => {
    const response = await AuthApi.mergeWallet(data);
    const user = await AuthApi.getCurrentUser();
    setUser(user);
    return response;
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/auth");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWallet,
        loginEmail,
        loginTelegram,
        registerEmail,
        mergeWallet,
        logout,
        error,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
