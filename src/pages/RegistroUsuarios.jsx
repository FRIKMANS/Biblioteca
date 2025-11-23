import React, { useState, useRef } from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { registrarUsuario } from "../services/usuarios.js";
import jsPDF from "jspdf";
import "../Styles/Interno.css";

export default function RegistroUsuario() {
  const [form, setForm] = useState({
    Nombre: "",
    Correo: "",
    Telefono: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const dialogRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      Nombre: "",
      Correo: "",
      Telefono: "",
    });
  };

  const generarPDF = (id, nombre, fecha) => {
    const doc = new jsPDF();
    doc.setDrawColor(0, 112, 192);
    doc.setLineWidth(4);
    doc.rect(10, 10, 190, 100);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Credencial de Usuario", 60, 25);

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`Nombre: ${nombre}`, 20, 50);
    doc.text(`ID: ${id}`, 20, 65);
    doc.text(`Afiliado el: ${fecha}`, 20, 80);

    doc.save(`Credencial_${nombre.replace(/[^a-z0-9]/gi, '_')}.pdf`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setCargando(true);

    try {
      if (!form.Nombre.trim()) throw new Error("El nombre es obligatorio");

      const usuarioData = {
        Nombre: form.Nombre.trim(),
        Correo: form.Correo.trim() || null,
        Telefono: form.Telefono.trim() || null,
      };

      console.log('Enviando datos de usuario:', usuarioData);

      const respuesta = await registrarUsuario(usuarioData);
      console.log('Respuesta recibida:', respuesta);

      if (respuesta && respuesta.ok === false) {
        throw new Error(respuesta.error || "Error al registrar usuario");
      }

      const fecha = new Date().toISOString().split("T")[0];
      
      const idUsuario = respuesta.id || respuesta.ID || respuesta.usuario_id;
      generarPDF(idUsuario, form.Nombre, fecha);

      setMensaje("Usuario registrado y credencial generada");
      dialogRef.current?.showModal();
      
      setTimeout(() => {
        dialogRef.current?.close();
        resetForm();
      }, 2500);

    } catch (err) {
      console.error("💥 Error en registro:", err);
      setMensaje("Error: " + err.message);
      dialogRef.current?.showModal();
      setTimeout(() => dialogRef.current?.close(), 2500);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="registro-page">
      <Header />
      <div className="panel-content">
        <h2 className="panel-title">Registro de Usuario</h2>

        <form className="form-card" onSubmit={handleSubmit}>
          <label>Nombre *</label>
          <input 
            name="Nombre" 
            type="text" 
            value={form.Nombre} 
            onChange={handleChange} 
            required 
            disabled={cargando}
          />

          <label>Correo electrónico</label>
          <input 
            name="Correo" 
            type="email" 
            value={form.Correo} 
            onChange={handleChange} 
            disabled={cargando}
          />

          <label>Teléfono</label>
          <input 
            name="Telefono" 
            type="text" 
            value={form.Telefono} 
            onChange={handleChange} 
            disabled={cargando}
          />

          <button 
            type="submit" 
            className="btn-primary"
            disabled={cargando}
          >
            {cargando ? "Registrando..." : "Registrar"}
          </button>
        </form>
      </div>

      <dialog ref={dialogRef} className="dialog-box">
        <p>{mensaje}</p>
        <button onClick={() => dialogRef.current?.close()} className="btn-close">
          Cerrar
        </button>
      </dialog>

      <Footer />
    </div>
  );
}