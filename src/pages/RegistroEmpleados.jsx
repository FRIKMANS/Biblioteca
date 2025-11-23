import React, { useState, useRef, useEffect } from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { useAuth } from "../context/AuthContext";
import { createEmpleadoService } from "../services/empleados.js";
import jsPDF from "jspdf";
import "../Styles/Interno.css";

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
    if (!authLoading && user && user.rol !== "admin") {
      setMensaje("❌ No tienes permisos de administrador. Redirigiendo...");
      dialogRef.current?.showModal();
      setTimeout(() => (window.location.href = "/"), 2000);
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (!authLoading && !user) {
      setMensaje("❌ No hay sesión activa. Redirigiendo al login...");
      dialogRef.current?.showModal();
      setTimeout(() => (window.location.href = "/login"), 2000);
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
    doc.text(`Rol: ${rol === "admin" ? "Administrador" : "Empleado"}`, 20, 75);
    doc.text(`Registrado el: ${fecha}`, 20, 90);

    doc.save(`Credencial_${username}.pdf`);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setCargando(true);

    try {
      if (!form.username.trim() || !form.nombre.trim() || !form.password) {
        throw new Error("Todos los campos son obligatorios");
      }
      if (form.password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }
      if (form.password !== form.confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
      }

      const empleadoData = {
        username: form.username.trim(),
        nombre: form.nombre.trim(),
        password: form.password,
        rol: form.rol
      };


      const res = await createEmpleadoService(authFetch, empleadoData);

      if (!res.ok) {
        throw new Error(res.error || "Error al registrar empleado");
      }

      const fecha = new Date().toLocaleDateString("es-ES");
      generarCredencialPDF(form.username, form.nombre, form.rol, fecha);

      setMensaje("✅ Empleado registrado y credencial generada correctamente");
      dialogRef.current?.showModal();

      setTimeout(() => {
        dialogRef.current?.close();
        resetForm();
      }, 3000);

    } catch (err) {
      setMensaje("❌ " + err.message);
      dialogRef.current?.showModal();
      setTimeout(() => dialogRef.current?.close(), 3000);

    } finally {
      setCargando(false);
    }
  };


  if (authLoading) {
    return (
      <div className="registro-page">
        <Header />
        <div className="panel-content"><p>Verificando permisos...</p></div>
        <Footer />
      </div>
    );
  }

  if (user && user.rol !== "admin") {
    return (
      <div className="registro-page">
        <Header />
        <div className="panel-content"><p>No tienes permisos para acceder.</p></div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="registro-page">
        <Header />
        <div className="panel-content"><p>Redirigiendo al login...</p></div>
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
          <label>Nombre de Usuario *</label>
          <input name="username" value={form.username} onChange={handleChange} required />

          <label>Nombre Completo *</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />

          <label>Contraseña *</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required />

          <label>Confirmar Contraseña *</label>
          <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />

          <label>Rol *</label>
          <select name="rol" value={form.rol} onChange={handleChange}>
            <option value="empleado">Empleado</option>
            <option value="admin">Administrador</option>
          </select>

          <button type="submit" className="btn-primary" disabled={cargando}>
            {cargando ? "Registrando..." : "Registrar Empleado"}
          </button>
        </form>
      </div>

      <dialog ref={dialogRef} className="dialog-box">
        <p>{mensaje}</p>
        <button className="btn-close" onClick={() => dialogRef.current?.close()}>
          Cerrar
        </button>
      </dialog>

      <Footer />
    </div>
  );
}
