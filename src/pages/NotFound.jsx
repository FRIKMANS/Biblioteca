import React from "react";
import { Link } from "react-router-dom";
import "../Styles/NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-box">
        <h2>404 — Página no encontrada</h2>
        <p>La ruta que buscas no existe o ha sido movida.</p>
        <Link to="/" className="notfound-button">Volver al inicio</Link>
      </div>
    </div>
  );
}
