import React, { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, refreshRequest, logoutRequest } from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------
  // 🔹 1. Recuperar datos al iniciar la App
  // ---------------------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setAccessToken(token);
      setUser(JSON.parse(savedUser));
    }

    // Intentar refrescar token
    (async () => {
      try {
        const res = await refreshRequest();
        if (res && res.access_token) {
          setAccessToken(res.access_token);
          setUser(res.user);

          // Guardamos el nuevo token
          localStorage.setItem("token", res.access_token);
          localStorage.setItem("user", JSON.stringify(res.user));
        }
      } catch (e) {
        // Si falla refresh no rompemos
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ---------------------------------------
  // 🔹 2. Login
  // ---------------------------------------
  const login = async (username, password) => {
    const res = await loginRequest(username, password);

    setAccessToken(res.access_token);
    setUser(res.user);

    // Guardar en localStorage
    localStorage.setItem("token", res.access_token);
    localStorage.setItem("user", JSON.stringify(res.user));

    return res;
  };

  // ---------------------------------------
  // 🔹 3. Logout
  // ---------------------------------------
  const logout = async () => {
    try {
      if (user) await logoutRequest(user.username);
    } catch (e) {}

    setAccessToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // ---------------------------------------
  // 🔹 4. Fetch con auto-refresh de token
  // ---------------------------------------
  const authFetch = async (input, init = {}) => {
    const attempt = async (token) => {
      const headers = init.headers ? { ...init.headers } : {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      return fetch(input, {
        ...init,
        headers,
        credentials: "include",
      });
    };

    let resp = await attempt(accessToken);

    // Si el token está expirado, intentamos refrescarlo
    if (resp.status === 401) {
      try {
        const r = await refreshRequest();

        setAccessToken(r.access_token);
        setUser(r.user);

        // Guardar token actualizado
        localStorage.setItem("token", r.access_token);
        localStorage.setItem("user", JSON.stringify(r.user));

        // Reintentar la solicitud
        resp = await attempt(r.access_token);
      } catch (err) {
        // Refresh falló → cerrar sesión
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        throw err;
      }
    }

    return resp;
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, authFetch, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
