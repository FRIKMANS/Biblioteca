import React from "react";
import { Link } from "react-router-dom";
import "../Styles/NotFound.css";

export default function NoAuth() {
  return (
    <div className="notfound-container">
      <div className="notfound-box">
        <h2>403 — No autorizado</h2>
        <p>No cuentas con los permisos para acceder a esta página</p>
        <Link to="/panel" className="notfound-button">Volver</Link>
      </div>
    </div>
  );
}
