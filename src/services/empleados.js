const API_URL = "https://huitzilapps.com/biblioteca_api";
const API_KEY = "aserejeajaeje";

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


      const contentType = response.headers.get("content-type");
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText.slice(0, 100)}`);
      }

      if (!contentType?.includes("application/json")) {
        throw new Error("Respuesta inesperada del servidor");
      }

      const json = await response.json();
      

      if (json && typeof json.ok !== 'undefined' && !json.ok) {
        throw new Error(json.error || "Error en la operación");
      }

      return json;
    }
  };
};
