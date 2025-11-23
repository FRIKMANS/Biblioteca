const API_URL = "https://huitzilapps.com/biblioteca_api";
const API_KEY = "aserejeajaeje";

const handleApiError = (operation, error, response = null) => {
  const errorDetails = {
    operation,
    timestamp: new Date().toISOString(),
    error: error.message,
    status: response?.status,
    statusText: response?.statusText,
    url: response?.url
  };

  console.groupCollapsed(`Error en API: ${operation}`);
  console.error('Detalles del error:', errorDetails);
  
  if (response) {
    console.error('Respuesta HTTP:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });
  }
  
  console.error('Stack trace:', error.stack);
  console.groupEnd();


  return errorDetails;
};

export const createEmpleadoService = (authFetch) => {
  return {
    registrarEmpleado: async (data) => {
      try {
        console.log('📤 Registrando empleado:', { 
          data: { ...data, password: '***' }, 
          timestamp: new Date().toISOString()
        });

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
          let errorMessage = `Error HTTP ${response.status}: ${response.statusText}`;
          
          try {
            const errorText = await response.text();
            errorMessage = errorText ? `${errorMessage} - ${errorText.slice(0, 200)}` : errorMessage;
          } catch (textError) {
            console.warn('No se pudo obtener texto del error:', textError);
          }
          
          const error = new Error(errorMessage);
          handleApiError('registrarEmpleado', error, response);
          throw error;
        }

        if (!contentType?.includes("application/json")) {
          const error = new Error("Respuesta inesperada del servidor: se esperaba JSON");
          handleApiError('registrarEmpleado', error, response);
          throw error;
        }

        const json = await response.json();
        

        if (json && typeof json.ok !== 'undefined' && !json.ok) {
          const error = new Error(json.error || "Error en la operación del servidor");
          handleApiError('registrarEmpleado', error, response);
          throw error;
        }

        console.log('✅ Empleado registrado exitosamente:', {
          id: json.id,
          timestamp: new Date().toISOString()
        });

        return json;

      } catch (error) {

        if (error instanceof Error && error.message.includes('Error HTTP')) {
          throw error;
        }
        
        const errorDetails = handleApiError('registrarEmpleado', error);
        

        const userFriendlyError = new Error(
          error.message.includes('Failed to fetch') 
            ? 'Error de conexión. Verifique su internet.'
            : `Error al registrar empleado: ${error.message}`
        );
        
        throw userFriendlyError;
      }
    }
  };
};