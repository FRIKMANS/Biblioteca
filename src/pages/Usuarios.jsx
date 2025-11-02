import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/Interno.css";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { listarUsuarios } from "../services/usuarios.js";

export default function ListaUsuarios() {
  const [busqueda, setBusqueda] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      setError("");
      
      const data = await listarUsuarios();
      console.log("✅ Usuarios cargados:", data);
      setUsuarios(data);
      
    } catch (error) {
      console.error("❌ Error cargando usuarios:", error);
      setError("Error al cargar usuarios: " + error.message);
    } finally {
      setCargando(false);
    }
  };

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const b = busqueda.toLowerCase();
    return (
      usuario.Nombre?.toLowerCase().includes(b) ||
      usuario.Correo?.toLowerCase().includes(b) ||
      usuario.Telefono?.toLowerCase().includes(b) ||
      (usuario.ID_Usuario && usuario.ID_Usuario.toString().includes(b)) ||
      (usuario.id && usuario.id.toString().includes(b))
    );
  });

  const obtenerIdUsuario = (usuario) => {
    return usuario.ID_Usuario || usuario.id || usuario.UsuarioID || '-';
  };

  const formatearFecha = (fechaString) => {
    if (!fechaString) return '-';
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES');
  };

  return (
    <div className="page">
      <Header />
      
      <main>
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-text">
              <div>
                <a href="/registro_usuarios" className="btn-primary2"> Agregar Usuario </a>
                <h2 className="hero-title2">Gestión de Usuarios</h2>
                <p className="lead2">Consulta y administra los usuarios registrados en la biblioteca.</p>
                
              </div>

              {error && (
                <div style={{ 
                  background: '#ffebee', 
                  color: '#c62828', 
                  padding: '10px', 
                  borderRadius: '4px',
                  marginBottom: '15px',
                  border: '1px solid #ffcdd2'
                }}>
                  <strong>Error:</strong> {error}
                </div>
              )}

              <input
                type="text"
                className="buscador"
                placeholder="Buscar por nombre, correo, teléfono o ID..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

            </div>
          </div>
        </section>

        <section className="band band-dark">
          <div className="band-content">
            <h2>Usuarios Registrados</h2>
            <p>Total: {usuariosFiltrados.length} usuarios</p>
          </div>
          <div className="container">
            {cargando ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p>Cargando usuarios...</p>
              </div>
            ) : usuariosFiltrados.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p>{busqueda ? 'No se encontraron usuarios con ese criterio de búsqueda' : 'No hay usuarios registrados'}</p>
              </div>
            ) : (
              <table className="tabla-inventario">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo Electrónico</th>
                    <th>Teléfono</th>
                    <th>Fecha de Registro</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.map((usuario, index) => (
                    <tr key={obtenerIdUsuario(usuario) || index}>
                      <td>{obtenerIdUsuario(usuario)}</td>
                      <td>
                        <strong>{usuario.Nombre}</strong>
                      </td>
                      <td>{usuario.Correo || '-'}</td>
                      <td>{usuario.Telefono || '-'}</td>
                      <td>{formatearFecha(usuario.Fecha_registro)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}