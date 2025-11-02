import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import {
  listarLibros,
  listarPeliculas
} from "./services/inventario.js";

export default function Inventario() {
  const [busqueda, setBusqueda] = useState("");
  const [tipo, setTipo] = useState("todos");
  const [libros, setLibros] = useState([]);
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    listarLibros().then(setLibros);
    listarPeliculas().then(setPeliculas);
  }, []);

  const filtroLibros = libros.filter((l) => {
    const b = busqueda.toLowerCase();
    return (
      l.Nombre?.toLowerCase().includes(b) ||
      l.Autor?.toLowerCase().includes(b) ||
      l.Categoria?.toLowerCase().includes(b) ||
      l.ISBN?.toLowerCase().includes(b)
    );
  });

  const filtroPeliculas = peliculas.filter((p) => {
    const b = busqueda.toLowerCase();
    const anio = p.Fecha_estreno?.substring(0, 4);
    return (
      p.Titulo?.toLowerCase().includes(b) ||
      p.Director?.toLowerCase().includes(b) ||
      p.Genero?.toLowerCase().includes(b) ||
      (anio && anio.includes(b))
    );
  });

  return (
    <div className="page">

      {/* HEADER */}
      <Header />

      {/* BUSCAR */}
      <main>
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-text">
              <h2 className="hero-title2">Inventario general</h2>
              <p className="lead2">Consulta el inventario actualizado de libros y películas.</p>

              <input
                type="text"
                className="buscador"
                placeholder="Buscar por título, autor, ISBN, director o año..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <select
                className="buscador"
                style={{ marginTop: "10px" }}
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="libros">Libros</option>
                <option value="peliculas">Películas</option>
              </select>

            </div>
          </div>
        </section>

        {/* TABLA LIBROS */}
        {(tipo === "todos" || tipo === "libros") && (
          <section className="band band-dark">
            <div className="band-content"><h2>Libros</h2></div>
            <div className="container">
              <table className="tabla-inventario">
                <thead>
                  <tr>
                    <th>ISBN</th>
                    <th>Nombre</th>
                    <th>Autor</th>
                    <th>Categoría</th>
                    <th>Disponible</th>
                  </tr>
                </thead>
                <tbody>
                  {filtroLibros.map((l) => (
                    <tr key={l.ISBN}>
                      <td>{l.ISBN}</td>
                      <td>{l.Nombre}</td>
                      <td>{l.Autor}</td>
                      <td>{l.Categoria}</td>
                      <td>{l.Disponible}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TABLA PELÍCULAS */}
        {(tipo === "todos" || tipo === "peliculas") && (
          <section className="band band-dark">
            <div className="band-content"><h2>Películas</h2></div>
            <div className="container">
              <table className="tabla-inventario">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Director</th>
                    <th>Género</th>
                    <th>Año</th>
                    <th>Disponible</th>
                  </tr>
                </thead>
                <tbody>
                  {filtroPeliculas.map((p) => (
                    <tr key={p.ID}>
                      <td>{p.ID}</td>
                      <td>{p.Titulo}</td>
                      <td>{p.Director}</td>
                      <td>{p.Genero}</td>
                      <td>{p.Fecha_estreno?.substring(0, 4)}</td>
                      <td>{p.Disponible}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
