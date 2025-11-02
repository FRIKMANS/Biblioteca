import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../Styles/Loading.css";

function LoadingScreen() {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p className="loading-text">Cargando, por favor espera...</p>
    </div>
  );
}

export default function PrivateRoute({ children, roles = [] }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (roles.length && !roles.includes(user.rol)) {
    return <Navigate to="/403" replace />;
  }

  return children;
}
