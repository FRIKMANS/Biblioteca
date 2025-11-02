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

    try {
      if (!form.Nombre) throw new Error("El nombre es obligatorio");

      const usuarioData = {
        Nombre: form.Nombre,
        Correo: form.Correo || null,
        Telefono: form.Telefono || null,
      };

      const res = await registrarUsuario(usuarioData);
      if (!res.ok) throw new Error(res.error || "Error al registrar usuario");

      const fecha = new Date().toISOString().split("T")[0];
      generarPDF(res.id, form.Nombre, fecha);

      setMensaje("✅ Usuario registrado y credencial generada");
      dialogRef.current?.showModal();
      setTimeout(() => {
        dialogRef.current?.close();
        resetForm();
      }, 2500);
    } catch (err) {
      console.error("Error:", err);
      setMensaje("❌ " + err.message);
      dialogRef.current?.showModal();
      setTimeout(() => dialogRef.current?.close(), 2500);
    }
  };

  return (
    <div className="registro-page">
      <Header />
      <div className="panel-content">
        <h2 className="panel-title">Registro de Usuario</h2>

        <form className="form-card" onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input name="Nombre" type="text" value={form.Nombre} onChange={handleChange} required />

          <label>Correo electrónico</label>
          <input name="Correo" type="email" value={form.Correo} onChange={handleChange} />

          <label>Teléfono</label>
          <input name="Telefono" type="text" value={form.Telefono} onChange={handleChange} />

          <button type="submit" className="btn-primary">Registrar</button>
        </form>
      </div>

      <dialog ref={dialogRef} className="dialog-box">
        <p>{mensaje}</p>
        <button onClick={() => dialogRef.current?.close()} className="btn-close">Cerrar</button>
      </dialog>

      <Footer />
    </div>
  );
}