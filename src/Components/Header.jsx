import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <img src="/img/Logo.png" alt="Logo Municipio" className="logo-placeholder" />
          <div className="brand-text">
            <h1>Biblioteca Ejidal</h1>
            <small>Centro Cultural y de Lectura</small>
          </div>
        </div>

        <nav className="top-nav">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/inventario" className="nav-link">Inventario</Link>
          {user ? (
            <>
              <Link to="/panel" className="nav-link">Panel</Link>
              <button className="nav-link" onClick={logout}>Cerrar sesión</button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
