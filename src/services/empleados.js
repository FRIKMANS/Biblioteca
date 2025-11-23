const API_URL = "https://huitzilapps.com/biblioteca_api";
const API_KEY = "aserejeajaeje";

import { useAuth } from '../context/AuthContext';

export async function registrarEmpleado(data) {
  const res = await fetch(`${API_URL}/empleados_registrar.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Error al registrar empleado: " + errorText.slice(0, 100));
  }

  const json = await res.json();
  return json;
}