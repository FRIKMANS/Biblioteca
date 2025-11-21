import React, { useState, useRef, useEffect } from "react";
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
  const modifiedAriaRef = useRef(new Set());

  // ...existing code...
  // Modal accessibility: hide background from assistive tech only while dialog is open
  const setBackgroundAriaHidden = (hidden) => {
    const dialogEl = dialogRef.current;
    if (!dialogEl) return;
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach((el) => {
      if (el === dialogEl) return;
      if (hidden) {
        // Only set aria-hidden on elements that don't already have it, and track them
        if (!el.hasAttribute("aria-hidden")) {
          el.setAttribute("aria-hidden", "true");
          modifiedAriaRef.current.add(el);
        }
      } else {
        // Restore only those we modified
        if (modifiedAriaRef.current.has(el)) {
          el.removeAttribute("aria-hidden");
          modifiedAriaRef.current.delete(el);
        }
      }
    });
  };

  useEffect(() => {
    // Cleanup on unmount: remove aria-hidden from any elements we modified
    return () => {
      modifiedAriaRef.current.forEach((el) => {
        try {
          el.removeAttribute("aria-hidden");
        } catch (e) {
          // ignore
        }
      });
      modifiedAriaRef.current.clear();
    };
  }, []);

  const openDialog = (msg) => {
    setMensaje(msg);
    setBackgroundAriaHidden(true);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setBackgroundAriaHidden(false);
  };
  // ...existing code...

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

      openDialog("Material y donación registrados correctamente");
      setTimeout(() => {
        closeDialog();
        resetForm();
      }, 2500);

    } catch (err) {
      console.error("Error:", err);
      openDialog("❌ " + err.message);
      setTimeout(() => closeDialog(), 2500);
    }
  };

  // ...existing code...
  return (
    <div className="donaciones-page">
  
      <Header />
      
      <main className="main-content">
        <div className="panel-content">
          <h1 className="panel-title">Registrar Donación</h1>

          <form className="form-card" onSubmit={handleSubmit}>
            <label htmlFor="donante-nombre">Nombre del Donador</label>
            <input 
              id="donante-nombre"
              name="DonanteNombre" 
              type="text" 
              value={form.DonanteNombre} 
              onChange={handleChange} 
              required
            />

            <label htmlFor="donante-email">Email del Donador</label>
            <input 
              id="donante-email"
              name="DonanteEmail" 
              type="email" 
              value={form.DonanteEmail} 
              onChange={handleChange} 
              required
            />

            <label htmlFor="tipo-material">Tipo de Material</label>
            <select 
              id="tipo-material"
              name="Tipo" 
              value={form.Tipo} 
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar</option>
              <option value="libro">Libro</option>
              <option value="pelicula">Película</option>
            </select>

            <label htmlFor="titulo">Título</label>
            <input 
              id="titulo"
              name="Titulo" 
              type="text" 
              value={form.Titulo} 
              onChange={handleChange} 
              required
            />

            <label htmlFor="autor-director">Autor / Director</label>
            <input 
              id="autor-director"
              name="AutorDirector" 
              type="text" 
              value={form.AutorDirector} 
              onChange={handleChange} 
              required
            />

            {form.Tipo === "libro" && (
              <div role="region" aria-label="Detalles del libro">
                <label htmlFor="editorial">Editorial</label>
                <input 
                  id="editorial"
                  name="Editorial" 
                  type="text" 
                  value={form.Editorial} 
                  onChange={handleChange} 
                />

                <label htmlFor="edicion">Edición</label>
                <input 
                  id="edicion"
                  name="Edicion" 
                  type="text" 
                  value={form.Edicion} 
                  onChange={handleChange} 
                />

                <label htmlFor="num-pags">Número de páginas</label>
                <input 
                  id="num-pags"
                  name="Num_Pags" 
                  type="number" 
                  value={form.Num_Pags} 
                  onChange={handleChange} 
                />

                <label htmlFor="fecha-publicacion">Fecha de publicación</label>
                <input 
                  id="fecha-publicacion"
                  name="Fecha_Publicacion" 
                  type="date" 
                  value={form.Fecha_Publicacion} 
                  onChange={handleChange} 
                />

                <label htmlFor="categoria">Categoría</label>
                <input 
                  id="categoria"
                  name="Categoria" 
                  type="text" 
                  value={form.Categoria} 
                  onChange={handleChange} 
                />
              </div>
            )}

            {form.Tipo === "pelicula" && (
              <div role="region" aria-label="Detalles de la película">
                <label htmlFor="productora">Productora</label>
                <input 
                  id="productora"
                  name="Productora" 
                  type="text" 
                  value={form.Productora} 
                  onChange={handleChange} 
                />

                <label htmlFor="genero">Género</label>
                <input 
                  id="genero"
                  name="Genero" 
                  type="text" 
                  value={form.Genero} 
                  onChange={handleChange} 
                />

                <label htmlFor="clasificacion">Clasificación</label>
                <input 
                  id="clasificacion"
                  name="Clasificacion" 
                  type="text" 
                  value={form.Clasificacion} 
                  onChange={handleChange} 
                />

                <label htmlFor="duracion">Duración (minutos)</label>
                <input 
                  id="duracion"
                  name="Duracion" 
                  type="number" 
                  value={form.Duracion} 
                  onChange={handleChange} 
                />

                <label htmlFor="fecha-estreno">Fecha de estreno</label>
                <input 
                  id="fecha-estreno"
                  name="Fecha_estreno" 
                  type="date" 
                  value={form.Fecha_estreno} 
                  onChange={handleChange} 
                />
              </div>
            )}

            <label htmlFor="disponible">Cantidad disponible</label>
            <input 
              id="disponible"
              name="Disponible" 
              type="number" 
              value={form.Disponible} 
              onChange={handleChange} 
              min="1"
            />

            <button type="submit" className="btn-primary">Registrar</button>
          </form>
        </div>
      </main>

      <dialog 
        ref={dialogRef} 
        className="dialog-box"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <h2 id="dialog-title" className="visually-hidden">
          Resultado del registro
        </h2>
        <div id="dialog-description">{mensaje}</div>
        <button 
          onClick={closeDialog} 
          className="btn-close"
        >
          Cerrar
        </button>
      </dialog>

      <Footer />
    </div>
  );
}