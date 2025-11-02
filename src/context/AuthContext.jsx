import React, { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, refreshRequest, logoutRequest } from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await refreshRequest();
        if (res && res.access_token) {
          setAccessToken(res.access_token);
          setUser(res.user);
        }
      } catch (e) {

      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (username, password) => {

    const res = await loginRequest(username, password);
    setAccessToken(res.access_token);
    setUser(res.user);
    return res;
  };

  const logout = async () => {
    try {
      if (user) await logoutRequest(user.username);
    } catch (e) {

    }
    setAccessToken(null);
    setUser(null);
  };


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
    if (resp.status === 401) {

      try {
        const r = await refreshRequest();
        setAccessToken(r.access_token);
        setUser(r.user);
        resp = await attempt(r.access_token);
      } catch (err) {
        setAccessToken(null);
        setUser(null);
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
