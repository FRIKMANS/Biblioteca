import React, { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, refreshRequest, logoutRequest } from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingRefresh, setLoadingRefresh] = useState(true);

  // Restaurar sesión con refresh.php
  useEffect(() => {
    (async () => {
      try {
        const res = await refreshRequest();
        if (res && res.user) {
          setUser(res.user);
        }
      } catch (e) {
        setUser(null);
      } finally {
        setLoadingRefresh(false);
      }
    })();
  }, []);

  // LOGIN
  const login = async (username, password) => {
    const res = await loginRequest(username, password);
    setUser(res.user);
    return res;
  };

  // LOGOUT
  const logout = async () => {
    try {
      if (user) await logoutRequest(user.username);
    } catch (e) {}
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingRefresh,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
