import React from "react";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import VideoPlayer from "./Components/VideoPlayer.jsx";

export default function App() {
  return (
    <div className="page">

{/* Encabezado */}      
     <Header />

      <main>

{/* Primer contenedor "VIDEO" */}

        <section className="hero">

          <div className="hero-inner">

            <div className="hero-text">

              <h2>Bienvenido a la biblioteca ejidal</h2>

              <p className="lead">

                Centro de cultura, conocimiento y entretenimiento. Descubre
                nuestros recursos y participa en nuestras actividades.
              
              </p>

              <VideoPlayer/>

            </div>

          </div>

        </section>

{/* Segundo contenedor "NOSOTROS" */}
        <section id="sobre" className="band band-dark">
          <div className="band-content">
            <h2>Sobre nosotros</h2>
          </div>

          <p className="muted">
            Somos un espacio comunitario dedicado a la promoción de la lectura,
            el aprendizaje y la cultura local.
          </p>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m11!1m3!1d578.4724865974341!2d-99.1283881304101!3d19.661228868760723!2m2!1f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f45c651dcd55%3A0x705758e6bae6d10d!2sBiblioteca%20Ejidal!5e1!3m2!1ses-419!2smx!4v1760486596972!5m2!1ses-419!2smx"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
        
{/* Tercer contenedor "SERVICIOS" */}
        <section id="servicios">

          <div  className="band band-dark">

            <div className="band-content">

              <h2>Servicios</h2>

            </div>

            <p className="muted">

              Todos los servicios son gratuitos y abiertos a la
              comunidad.
              
            </p>
          
          </div>

          <div className="container">

            <div className="cards">

              <article className="card">

                <div className="card-img">
                
                  <img className='card-img' src="/img/Prestamos.jpg" alt="Préstamos" />
                
                </div>

                  <h3>Préstamos</h3>

                  <p>Consulta y lleva libros en préstamo a casa.</p>

              </article>

              <article className="card">

                <div className="card-img">
                
                  <img className='card-img' src="/img/Computadoras.jpg" alt="Préstamos" />
                
                </div>

                  <h3>Computadoras</h3>

                  <p>Acceso a equipos y recursos digitales.</p>

              </article>

              <article className="card">

                <div className="card-img">
                
                  <img className='card-img' src="/img/Actividades.jpg" alt="Computadoras" />

                </div>

                  <h3>Actividades</h3>

                  <p>Talleres, lecturas y eventos comunitarios.</p>

              </article>

            </div>

          </div>
          
        </section>

{/* Cuarto contenedor "NOTICIAS" */}
        <section id="noticias">

          <div  className="band band-dark">

            <div className="band-content">

              <h2>Noticias</h2>

            </div>

            <p className="muted">

              Mantente informado sobre nuestras últimas novedades y eventos.
            
            </p>
        
          </div>

          <div className="container">

            <div className="cards">

              <article className="card">

                <div className="card-img">
                
                  <img className='card-img' src="/img/Feria.jpg" alt="Préstamos" />
                
                </div>

                  <h3>Feria el empleo</h3>

                  <p>Sé parte de la feria del empleo y encuentra nuevas oportunidades laborales.</p>

              </article>

              <article className="card">

                <div className="card-img">
                
                  <img className='card-img' src="/img/Deportes.jpg" alt="Préstamos" />
                
                </div>

                  <h3>Deportes</h3>

                  <p>Participa en actividades deportivas y mantente activo.</p>

              </article>

              <article className="card">

                <div className="card-img">
                
                  <img className='card-img' src="/img/Cerca.jpg" alt="Computadoras" />

                </div>

                  <h3>Cerca de aquí</h3>

                  <p>Novedades cerca de ti.</p>

              </article>

            </div>

          </div>

        </section>

      </main>

{/* Pie de página */}
      <Footer />

    </div>

  );
}