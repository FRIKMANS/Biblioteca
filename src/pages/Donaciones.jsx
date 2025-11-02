import React, { useState, useRef } from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { agregarLibro, insertarPelicula, registrarDonacion } from "../services/inventario.js";
import "../Styles/Interno.css";

export default function Donaciones() {
  const [form, setForm] = useState({
    DonanteNombre: "",
    DonanteEmail: "",
    Tipo: "",
    Titulo: "",
    AutorDirector: "",
    Productora: "",
    Genero: "",
    Clasificacion: "",
    Duracion: "",
    Fecha_estreno: "",
    Disponible: 1,
    Editorial: "",
    Edicion: "",
    Num_Pags: "",
    Fecha_Publicacion: "",
    Categoria: "",
  });
  const [mensaje, setMensaje] = useState("");
  const dialogRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      DonanteNombre: "",
      DonanteEmail: "",
      Tipo: "",
      Titulo: "",
      AutorDirector: "",
      Productora: "",
      Genero: "",
      Clasificacion: "",
      Duracion: "",
      Fecha_estreno: "",
      Disponible: 1,
      Editorial: "",
      Edicion: "",
      Num_Pags: "",
      Fecha_Publicacion: "",
      Categoria: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      if (form.Tipo === "libro") {
        const libroData = {
          ISBN: Math.floor(1000000000000 + Math.random() * 900000000000).toString(),
          Nombre: form.Titulo,
          Autor: form.AutorDirector,
          Editorial: form.Editorial,
          Edicion: form.Edicion,
          Num_Pags: parseInt(form.Num_Pags) || null,
          Fecha_Publicacion: form.Fecha_Publicacion,
          Disponible: parseInt(form.Disponible) || 1,
          Categoria: form.Categoria,
        };

        const res = await agregarLibro(libroData);
        if (!res.ok) throw new Error(res.error || "Error al registrar libro");
      }

      else if (form.Tipo === "pelicula") {
        const peliData = {
          Titulo: form.Titulo,
          Director: form.AutorDirector,
          Productora: form.Productora,
          Genero: form.Genero,
          Clasificacion: form.Clasificacion,
          Duracion: parseInt(form.Duracion) || null,
          Fecha_estreno: form.Fecha_estreno,
          Disponible: parseInt(form.Disponible) || 1,
        };

        const res = await insertarPelicula(peliData);
        if (!res.ok) throw new Error(res.error || "Error al registrar película");
      }

      else {
        throw new Error("Debes seleccionar un tipo de material.");
      }

      // Registrar donación
      const donacionData = {
        DonanteNombre: form.DonanteNombre,
        DonanteEmail: form.DonanteEmail,
        Tipo: form.Tipo,
        Titulo: form.Titulo,
        AutorDirector: form.AutorDirector,
        Cantidad: parseInt(form.Disponible) || 1,
      };

      await registrarDonacion(donacionData);

      setMensaje("Material y donación registrados correctamente");
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
    <div className="donaciones-page">
      <Header />
      <div className="panel-content">
        <h2 className="panel-title">Registrar Donación</h2>

        <form className="form-card" onSubmit={handleSubmit}>
          <label>Nombre del Donador</label>
          <input name="DonanteNombre" type="text" value={form.DonanteNombre} onChange={handleChange} />

          <label>Email del Donador</label>
          <input name="DonanteEmail" type="email" value={form.DonanteEmail} onChange={handleChange} />

          <label>Tipo de Material</label>
          <select name="Tipo" value={form.Tipo} onChange={handleChange}>
            <option value="">Seleccionar</option>
            <option value="libro">Libro</option>
            <option value="pelicula">Película</option>
          </select>

          <label>Título</label>
          <input name="Titulo" type="text" value={form.Titulo} onChange={handleChange} />

          <label>Autor / Director</label>
          <input name="AutorDirector" type="text" value={form.AutorDirector} onChange={handleChange} />

          {form.Tipo === "libro" && (
            <>
              <label>Editorial</label>
              <input name="Editorial" type="text" value={form.Editorial} onChange={handleChange} />

              <label>Edición</label>
              <input name="Edicion" type="text" value={form.Edicion} onChange={handleChange} />

              <label>Número de páginas</label>
              <input name="Num_Pags" type="number" value={form.Num_Pags} onChange={handleChange} />

              <label>Fecha de publicación</label>
              <input name="Fecha_Publicacion" type="date" value={form.Fecha_Publicacion} onChange={handleChange} />

              <label>Categoría</label>
              <input name="Categoria" type="text" value={form.Categoria} onChange={handleChange} />
            </>
          )}

          {form.Tipo === "pelicula" && (
            <>
              <label>Productora</label>
              <input name="Productora" type="text" value={form.Productora} onChange={handleChange} />

              <label>Género</label>
              <input name="Genero" type="text" value={form.Genero} onChange={handleChange} />

              <label>Clasificación</label>
              <input name="Clasificacion" type="text" value={form.Clasificacion} onChange={handleChange} />

              <label>Duración (minutos)</label>
              <input name="Duracion" type="number" value={form.Duracion} onChange={handleChange} />

              <label>Fecha de estreno</label>
              <input name="Fecha_estreno" type="date" value={form.Fecha_estreno} onChange={handleChange} />
            </>
          )}

          <label>Cantidad disponible</label>
          <input name="Disponible" type="number" value={form.Disponible} onChange={handleChange} />

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
