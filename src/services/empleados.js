const API_URL = "https://huitzilapps.com/biblioteca_api";
const API_KEY = "aserejeajaeje";

import { useAuth } from '../context/AuthContext';


export const createEmpleadoService = (authFetch) => {
  return {
    registrarEmpleado: async (data) => {
      const response = await authFetch(`${API_URL}/empleados_registrar.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      if (!response.ok || !json.ok) {
        throw new Error(json.error || "Error al registrar empleado");
      }

      return json;
    }
  };
};

export async function registrarEmpleado(data) {

  const payload = {
    username: data.usernametoLowerCase().replace(/\s/g, ""),
    nombre: data.nombre,
    password: data.password,
    rol: data.rol,
  };

  const res = await fetch(`${API_URL}/empleados_registrar.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
    body: JSON.stringify(payload),
  });

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Error al registrar empleado: " + errorText.slice(0, 100));
  }

  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  } else {
    throw new Error("Respuesta inesperada del servidor al registrar empleado");
  }
}
