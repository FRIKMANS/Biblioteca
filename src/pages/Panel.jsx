import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import "../Styles/Interno.css";

export default function Panel() {
  return (
    <div className="panel-page">
      <Header />
      <div className="panel-content">
        <h2 className="panel-title">Panel Administrativo</h2>

        <div className="panel-grid">

          <a href="/prestamos" className="panel-card">
            <h3>Prestamos</h3>
            <p>Prestamo de libros y peliculas</p>
          </a>

          <a href="/donaciones" className="panel-card">
            <h3>Donaciones</h3>
            <p>Registrar libro o película donada</p>
          </a>

          <a href="/certificados" className="panel-card">
            <h3>Certificados</h3>
            <p>Generar constancias para usuarios</p>
          </a>

          <a href="/usuarios" className="panel-card">
            <h3>Usuarios</h3>
            <p>Agrega usuarios nuevos o genera las credenciales</p>
          </a>

          <a href="/registro_empleados" className="panel-card">
            <h3>Empleados</h3>
            <p>Registra los empleados</p>
          </a>

        </div>
      </div>
      <Footer />
    </div>
  );
}
