import React, { useState, useEffect, useRef } from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { listarDonaciones } from "../services/inventario.js";
import jsPDF from "jspdf";
import "../styles/interno.css";

export default function Certificados() {
  const [donaciones, setDonaciones] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const dialogRef = useRef(null);

  useEffect(() => {
    async function cargar() {
      try {
        const res = await listarDonaciones();
        if (res.ok && Array.isArray(res.data)) {
          setDonaciones(res.data);
        } else {
          throw new Error(res.error || "Error en respuesta del servidor");
        }
      } catch (err) {
        console.error("Error cargando donaciones:", err);
        setMensaje("❌ No se pudo cargar el historial de donaciones");
        dialogRef.current?.showModal();
        setTimeout(() => dialogRef.current?.close(), 2500);
      }
    }
    cargar();
  }, []);

  const generarPDF = (donacion) => {
    const motivo =
      "por su amable contribución al material para la biblioteca";
    const fecha = donacion.FechaRegistro?.split(" ")[0] || "Fecha no disponible";

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("CERTIFICADO DE DONACIÓN", 60, 25);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Se otorga el presente reconocimiento a:`, 20, 50);
    doc.setFont("helvetica", "bold");
    doc.text(donacion.DonanteNombre, 90, 50);

    doc.setFont("helvetica", "normal");
    doc.text(
      `Por su valiosa donación del material "${donacion.Titulo}" (${donacion.Tipo}).`,
      20,
      65
    );
    doc.text(`Cantidad donada: ${donacion.Cantidad} ejemplares`, 20, 73);
    doc.text(`Motivo: ${motivo}`, 20, 81);
    doc.text(`Fecha de emisión: ${fecha}`, 20, 89);

    doc.line(20, 120, 190, 120);
    doc.text("Firma del Encargado de Biblioteca", 60, 130);

    doc.save(`Certificado_${donacion.DonanteNombre}.pdf`);
    setMensaje("✅ Certificado generado correctamente.");
    dialogRef.current?.showModal();
    setTimeout(() => dialogRef.current?.close(), 2500);
  };

  return (
    <div className="certificados-page">
      <Header />
      <div className="panel-content">
        <h2 className="panel-title">Historial de Donaciones</h2>

        <div className="tabla-donaciones">
          <table className="tabla-inventario">
            <thead>
              <tr>
                <th>Donante</th>
                <th>Tipo</th>
                <th>Título</th>
                <th>Autor/Director</th>
                <th>Cantidad</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {donaciones.map((d) => (
                <tr key={d.ID}>
                  <td>{d.DonanteNombre}</td>
                  <td>{d.Tipo}</td>
                  <td>{d.Titulo}</td>
                  <td>{d.AutorDirector}</td>
                  <td>{d.Cantidad}</td>
                  <td>{d.FechaRegistro?.split(" ")[0]}</td>
                  <td>
                    <button
                      className="btn-secundary"
                      onClick={() => generarPDF(d)}
                    >
                      Generar Certificado
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
