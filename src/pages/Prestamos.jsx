import React, { useState, useEffect, useRef } from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { registrarPrestamo, registrarDevolucion, listarPrestamos, listarLibros, listarPeliculas } from "../services/inventario.js";
import "../Styles/Interno.css";

export default function Prestamos() {
  const [activeTab, setActiveTab] = useState("prestamo");
  const [mensaje, setMensaje] = useState("");
  const [prestamos, setPrestamos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const dialogRef = useRef(null);

  const [formPrestamo, setFormPrestamo] = useState({
    Tipo_Material: "libro",
    ID_Material: "",
    ID_Usuario: "",
    Nombre_Usuario: "",
    Fecha_Prestamo: new Date().toISOString().split('T')[0],
    Fecha_Devolucion: ""
  });

  const [formDevolucion, setFormDevolucion] = useState({
    ID_Prestamo: "",
    Fecha_Devolucion_Real: new Date().toISOString().split('T')[0]
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    cargarPrestamos();
  }, [busqueda, filtroEstado]);

  // Mostrar popup cuando hay mensaje
  useEffect(() => {
    if (mensaje) {
      dialogRef.current?.showModal();
      const timer = setTimeout(() => {
        dialogRef.current?.close();
        setMensaje("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  const cargarPrestamos = async () => {
    try {
      const data = await listarPrestamos({ q: busqueda, estado: filtroEstado });
      // Marcar préstamos atrasados
      const prestamosConAtraso = data.map(prestamo => {
        if (prestamo.Estado === 'prestado') {
          const hoy = new Date();
          const fechaDevolucion = new Date(prestamo.Fecha_Devolucion);
   
          if (fechaDevolucion < hoy && !prestamo.Fecha_Devolucion_Real) {
            return { ...prestamo, Estado: 'atrasado' };
          }
        }
        return prestamo;
      });
      setPrestamos(prestamosConAtraso);
    } catch (error) {
      console.error("Error cargando préstamos:", error);
      setMensaje("Error " + error.message);
    }
  };

  const handlePrestamoChange = (e) => {
    const { name, value } = e.target;
    setFormPrestamo(prev => ({ ...prev, [name]: value }));
    
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDevolucionChange = (e) => {
    const { name, value } = e.target;
    setFormDevolucion(prev => ({ ...prev, [name]: value }));
    
    // Validar fecha de devolución real
    if (name === 'Fecha_Devolucion_Real') {
      const hoy = new Date().toISOString().split('T')[0];
      if (value < hoy) {
        setErrores(prev => ({ ...prev, Fecha_Devolucion_Real: 'La fecha de devolución no puede ser anterior a la fecha actual' }));
      } else {
        setErrores(prev => ({ ...prev, Fecha_Devolucion_Real: '' }));
      }
    }
  };

  const calcularFechaDevolucion = (fechaPrestamo, dias = 15) => {
    const fecha = new Date(fechaPrestamo);
    fecha.setDate(fecha.getDate() + dias);
    return fecha.toISOString().split('T')[0];
  };

  const handleFechaPrestamoChange = (e) => {
    const fechaPrestamo = e.target.value;
    const hoy = new Date().toISOString().split('T')[0];
    
    // Validar que la fecha de préstamo no sea futura
    if (fechaPrestamo > hoy) {
      setErrores(prev => ({ ...prev, Fecha_Prestamo: 'La fecha de préstamo no puede ser futura' }));
      return;
    } else {
      setErrores(prev => ({ ...prev, Fecha_Prestamo: '' }));
    }

    const fechaDevolucion = calcularFechaDevolucion(fechaPrestamo);
    setFormPrestamo(prev => ({
      ...prev,
      Fecha_Prestamo: fechaPrestamo,
      Fecha_Devolucion: fechaDevolucion
    }));
  };

  const validarFormularioPrestamo = () => {
    const nuevosErrores = {};
    const hoy = new Date().toISOString().split('T')[0];

    // Validar fecha de préstamo
    if (formPrestamo.Fecha_Prestamo > hoy) {
      nuevosErrores.Fecha_Prestamo = 'La fecha de préstamo no puede ser futura';
    }

    // Validar fecha de devolución
    if (formPrestamo.Fecha_Devolucion < hoy) {
      nuevosErrores.Fecha_Devolucion = 'La fecha de devolución no puede ser anterior a la fecha actual';
    }

    // Validar fecha de devolución posterior a la de préstamo
    if (formPrestamo.Fecha_Devolucion <= formPrestamo.Fecha_Prestamo) {
      nuevosErrores.Fecha_Devolucion = 'La fecha de devolución debe ser posterior a la fecha de préstamo';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleRegistrarPrestamo = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      if (!formPrestamo.ID_Material || !formPrestamo.ID_Usuario || !formPrestamo.Nombre_Usuario) {
        throw new Error("Todos los campos son requeridos");
      }

      // Validar fechas
      if (!validarFormularioPrestamo()) {
        throw new Error("Por favor corrige los errores en el formulario");
      }

      await registrarPrestamo(formPrestamo);
      setMensaje("Préstamo registrado correctamente");
      
      setFormPrestamo({
        Tipo_Material: "libro",
        ID_Material: "",
        ID_Usuario: "",
        Nombre_Usuario: "",
        Fecha_Prestamo: new Date().toISOString().split('T')[0],
        Fecha_Devolucion: calcularFechaDevolucion(new Date().toISOString().split('T')[0])
      });
      
      cargarPrestamos();
      
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error " + error.message);
    }
  };

  const handleRegistrarDevolucion = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      if (!formDevolucion.ID_Prestamo) {
        throw new Error("ID de préstamo es requerido");
      }

      // Validar fecha de devolución real
      const hoy = new Date().toISOString().split('T')[0];
      if (formDevolucion.Fecha_Devolucion_Real < hoy) {
        throw new Error("La fecha de devolución no puede ser anterior a la fecha actual");
      }

      await registrarDevolucion(formDevolucion);
      setMensaje("Devolución registrada correctamente");
      
      setFormDevolucion({
        ID_Prestamo: "",
        Fecha_Devolucion_Real: new Date().toISOString().split('T')[0]
      });
      
      cargarPrestamos();
      
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error " + error.message);
    }
  };

  const formatearFecha = (fechaString) => {
    if (!fechaString) return '-';
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES');
  };

  const obtenerEstadoColor = (estado) => {
    switch (estado) {
      case 'prestado': return '#2196f3';
      case 'devuelto': return '#4caf50';
      case 'atrasado': return '#f44336';
      default: return '#666';
    }
  };

  const cerrarDialogo = () => {
    dialogRef.current?.close();
    setMensaje("");
  };

  return (
    <div className="page">
      <Header />
      
      <main>
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-text">
              <h2 className="hero-title2">Gestión de Préstamos</h2>
              <p className="lead2">Registra préstamos y devoluciones de libros y películas.</p>

              {/* Tabs */}
              <div className="tabs">
                <button 
                  className={`tab ${activeTab === 'prestamo' ? 'active' : ''}`}
                  onClick={() => setActiveTab('prestamo')}
                >
                  Registrar Préstamo
                </button>
                <button 
                  className={`tab ${activeTab === 'devolucion' ? 'active' : ''}`}
                  onClick={() => setActiveTab('devolucion')}
                >
                  Registrar Devolución
                </button>
              </div>

              {/* Formulario de Préstamo */}
              {activeTab === "prestamo" && (
                <form className="form-card2" onSubmit={handleRegistrarPrestamo}>
                  <h3>Nuevo Préstamo</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Tipo de Material *</label>
                      <select 
                        name="Tipo_Material" 
                        value={formPrestamo.Tipo_Material} 
                        onChange={handlePrestamoChange}
                        required
                      >
                        <option value="libro">Libro</option>
                        <option value="pelicula">Película</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>ID del Material *</label>
                      <input 
                        name="ID_Material" 
                        type="text" 
                        value={formPrestamo.ID_Material} 
                        onChange={handlePrestamoChange}
                        placeholder={formPrestamo.Tipo_Material === 'libro' ? 'ISBN del libro' : 'ID de la película'}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>ID Usuario *</label>
                      <input 
                        name="ID_Usuario" 
                        type="number" 
                        value={formPrestamo.ID_Usuario} 
                        onChange={handlePrestamoChange}
                        placeholder="ID del usuario"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Nombre Usuario *</label>
                      <input 
                        name="Nombre_Usuario" 
                        type="text" 
                        value={formPrestamo.Nombre_Usuario} 
                        onChange={handlePrestamoChange}
                        placeholder="Nombre completo del usuario"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Fecha de Préstamo *</label>
                      <input 
                        name="Fecha_Prestamo" 
                        type="date" 
                        value={formPrestamo.Fecha_Prestamo} 
                        onChange={handleFechaPrestamoChange}
                        max={new Date().toISOString().split('T')[0]} // No permite fechas futuras
                        required
                      />
                      {errores.Fecha_Prestamo && (
                        <span className="error-message" style={{color: 'red', fontSize: '12px'}}>
                          {errores.Fecha_Prestamo}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Fecha de Devolución *</label>
                      <input 
                        name="Fecha_Devolucion" 
                        type="date" 
                        value={formPrestamo.Fecha_Devolucion} 
                        onChange={handlePrestamoChange}
                        min={new Date().toISOString().split('T')[0]} // No permite fechas pasadas
                        required
                      />
                      {errores.Fecha_Devolucion && (
                        <span className="error-message" style={{color: 'red', fontSize: '12px'}}>
                          {errores.Fecha_Devolucion}
                        </span>
                      )}
                    </div>
                  </div>

                  <button type="submit" className="btn-primary">
                    Registrar Préstamo
                  </button>
                </form>
              )}

              {/* Formulario de Devolución */}
              {activeTab === "devolucion" && (
                <form className="form-card2" onSubmit={handleRegistrarDevolucion}>
                  <h3>Registrar Devolución</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>ID del Préstamo *</label>
                      <input 
                        name="ID_Prestamo" 
                        type="number" 
                        value={formDevolucion.ID_Prestamo} 
                        onChange={handleDevolucionChange}
                        placeholder="ID del préstamo a devolver"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Fecha de Devolución Real *</label>
                      <input 
                        name="Fecha_Devolucion_Real" 
                        type="date" 
                        value={formDevolucion.Fecha_Devolucion_Real} 
                        onChange={handleDevolucionChange}
                        min={new Date().toISOString().split('T')[0]} // No permite fechas pasadas
                        required
                      />
                      {errores.Fecha_Devolucion_Real && (
                        <span className="error-message" style={{color: 'red', fontSize: '12px'}}>
                          {errores.Fecha_Devolucion_Real}
                        </span>
                      )}
                    </div>
                  </div>

                  <button type="submit" className="btn-primary">
                    Registrar Devolución
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Lista de Préstamos */}
        <section className="band band-dark">
          <div className="band-content">
            <h2>Historial de Préstamos</h2>
            
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <input
                type="text"
                className="buscador"
                placeholder="Buscar por usuario o ID material..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{ flex: '1', minWidth: '200px' }}
              />
              
              <select
                className="buscador"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                style={{ minWidth: '150px' }}
              >
                <option value="">Todos los estados</option>
                <option value="prestado">Prestado</option>
                <option value="devuelto">Devuelto</option>
                <option value="atrasado">Atrasado</option>
              </select>
            </div>
          </div>

          <div className="container" data-aria-hidden="true" aria-hidden="true">
            <table className="tabla-inventario">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>ID Material</th>
                  <th>Usuario</th>
                  <th>Préstamo</th>
                  <th>Devolución Esperada</th>
                  <th>Devolución Real</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {prestamos.map((prestamo) => (
                  <tr key={prestamo.ID_Prestamo}>
                    <td>{prestamo.ID_Prestamo}</td>
                    <td>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px',
                        background: prestamo.Tipo_Material === 'libro' ? '#e3f2fd' : '#f3e5f5',
                        color: prestamo.Tipo_Material === 'libro' ? '#1976d2' : '#7b1fa2'
                      }}>
                        {prestamo.Tipo_Material}
                      </span>
                    </td>
                    <td>{prestamo.ID_Material}</td>
                    <td>
                      <strong>{prestamo.Nombre_Usuario}</strong>
                      <br />
                      <small>ID: {prestamo.ID_Usuario}</small>
                    </td>
                    <td>{formatearFecha(prestamo.Fecha_Prestamo)}</td>
                    <td>{formatearFecha(prestamo.Fecha_Devolucion)}</td>
                    <td>{formatearFecha(prestamo.Fecha_Devolucion_Real)}</td>
                    <td>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px',
                        background: obtenerEstadoColor(prestamo.Estado) + '20',
                        color: obtenerEstadoColor(prestamo.Estado),
                        fontWeight: 'bold'
                      }}>
                        {prestamo.Estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {prestamos.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p>No se encontraron préstamos</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <dialog ref={dialogRef} className="dialog-box">
        <div className="dialog-content">
          <p>{mensaje}</p>
          <button onClick={cerrarDialogo} className="btn-close">
            Cerrar
          </button>
        </div>
      </dialog>

      <Footer />
    </div>
  );
}