import React, { useState, useRef, useEffect } from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { useAuth } from "../context/AuthContext";
import { registrarEmpleado } from "../services/empleados.js";
import jsPDF from "jspdf";
import "../styles/Interno.css";

export default function RegistroEmpleados() {
  const [form, setForm] = useState({
    username: "",
    nombre: "",
    password: "",
    confirmPassword: "",
    rol: "empleado"
  });
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const dialogRef = useRef(null);
  const { authFetch, user, loading: authLoading } = useAuth();


  useEffect(() => {
    if (!authLoading && user && user.rol !== 'admin') {
      setMensaje("❌ No tienes permisos de administrador. Redirigiendo...");
      dialogRef.current?.showModal();
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (!authLoading && !user) {
      setMensaje("❌ No hay sesión activa. Redirigiendo al login...");
      dialogRef.current?.showModal();
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  }, [user, authLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      username: "",
      nombre: "",
      password: "",
      confirmPassword: "",
      rol: "empleado"
    });
  };

  const generarCredencialPDF = (username, nombre, rol, fecha) => {
    try {
      const doc = new jsPDF();
      doc.setDrawColor(0, 112, 192);
      doc.setLineWidth(4);
      doc.rect(10, 10, 190, 100);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Credencial de Empleado", 55, 25);

      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.text(`Nombre: ${nombre}`, 20, 45);
      doc.text(`Usuario: ${username}`, 20, 60);
      doc.text(`Rol: ${rol === 'admin' ? 'Administrador' : 'Empleado'}`, 20, 75);
      doc.text(`Registrado el: ${fecha}`, 20, 90);

      doc.save(`Credencial_${username}.pdf`);
    } catch (error) {
      console.error("Error generando PDF:", error);
      throw new Error("Error al generar la credencial PDF");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setCargando(true);

    try {
      // Validaciones
      if (!form.username.trim() || !form.nombre.trim() || !form.password) {
        throw new Error("Todos los campos son obligatorios");
      }

      if (form.password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }

      if (form.password !== form.confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
      }

      if (!form.rol) {
        throw new Error("Debe seleccionar un rol");
      }

      const empleadoData = {
        username: form.username.trim(),
        nombre: form.nombre.trim(),
        password: form.password,
        rol: form.rol
      };

      const response = await authFetch('http://localhost/biblioteca_api/empleados_registrar.php', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "aserejeajaeje",
        },
        body: JSON.stringify(empleadoData),
      });

      const json = await response.json();
      
      if (!response.ok || !json.ok) {
        throw new Error(json.error || "Error al registrar empleado");
      }

      const fecha = new Date().toLocaleDateString('es-ES');
      generarCredencialPDF(form.username, form.nombre, form.rol, fecha);

      setMensaje("✅ Empleado registrado y credencial generada correctamente");
      dialogRef.current?.showModal();
      
      setTimeout(() => {
        dialogRef.current?.close();
        resetForm();
      }, 3000);

    } catch (err) {
      console.error("Error:", err);
      setMensaje("❌ " + err.message);
      dialogRef.current?.showModal();
      setTimeout(() => dialogRef.current?.close(), 3000);
    } finally {
      setCargando(false);
    }
  };

  const cerrarDialogo = () => {
    dialogRef.current?.close();
  };

  if (authLoading) {
    return (
      <div className="registro-page">
        <Header />
        <div className="panel-content">
          <p>Verificando permisos...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // No es admin
  if (user && user.rol !== 'admin') {
    return (
      <div className="registro-page">
        <Header />
        <div className="panel-content">
          <p>No tienes permisos para acceder a esta página.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Redirigir si no hay usuario
  if (!user) {
    return (
      <div className="registro-page">
        <Header />
        <div className="panel-content">
          <p>Redirigiendo al login...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="registro-page">
      <Header />
      <div className="panel-content">
        <h2 className="panel-title">Registro de Empleado</h2>

        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario *</label>
            <input 
              id="username"
              name="username" 
              type="text" 
              value={form.username} 
              onChange={handleChange} 
              required 
              disabled={cargando}
              placeholder="Ingrese el nombre de usuario"
              maxLength="50"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo *</label>
            <input 
              id="nombre"
              name="nombre" 
              type="text" 
              value={form.nombre} 
              onChange={handleChange} 
              required 
              disabled={cargando}
              placeholder="Ingrese el nombre completo"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Contraseña *</label>
              <input 
                id="password"
                name="password" 
                type="password" 
                value={form.password} 
                onChange={handleChange} 
                required 
                disabled={cargando}
                placeholder="Mínimo 6 caracteres"
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña *</label>
              <input 
                id="confirmPassword"
                name="confirmPassword" 
                type="password" 
                value={form.confirmPassword} 
                onChange={handleChange} 
                required 
                disabled={cargando}
                placeholder="Repita la contraseña"
                minLength="6"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="rol">Rol *</label>
            <select 
              id="rol"
              name="rol" 
              value={form.rol} 
              onChange={handleChange} 
              required 
              disabled={cargando}
            >
              <option value="empleado">Empleado</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={cargando}
          >
            {cargando ? "Registrando..." : "Registrar Empleado"}
          </button>
        </form>

      </div>

      <dialog ref={dialogRef} className="dialog-box">
        <div className="dialog-content">
          <p>{mensaje}</p>
          {!mensaje.includes("Redirigiendo") && (
            <button 
              onClick={cerrarDialogo} 
              className="btn-close"
              disabled={cargando}
            >
              Cerrar
            </button>
          )}
        </div>
      </dialog>

      <Footer />
    </div>
  );
}