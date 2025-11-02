import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../Styles/Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(username.trim(), password);
      navigate("/panel");
    } catch (err) {
      setError(err.message || "Credenciales inválidas");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card" role="main" aria-labelledby="login-heading">

        <h2 id="login-heading">Iniciar sesión — Empleados</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="login-actions">
            <button type="submit" className="button btn-primary" disabled={busy}>
              {busy ? "Entrando..." : "Iniciar sesión"}
            </button>

            <div className="login-remember">
              <input id="remember" type="checkbox" />
              <label htmlFor="remember">Recordarme</label>
            </div>

            {error && <div style={{ color: "#ffb3b3", marginTop: 6 }}>{error}</div>}

            <div className="small">¿Olvidaste tu contraseña? Contacta al administrador.</div>
          </div>
        </form>
      </div>
    </div>
  );
}
