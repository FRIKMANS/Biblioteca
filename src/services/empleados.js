const API_URL = "https://huitzilapps.com/biblioteca_api";
const API_KEY = "aserejeajaeje";

export const empleadoService = {
  registrarEmpleado: async (data) => {
    console.log('Enviando datos a:', `${API_URL}/empleados_registrar.php`);
    console.log('Datos:', { ...data, password: '***' });
    
    try {
      const response = await fetch(`${API_URL}/empleados_registrar.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
        },
        body: JSON.stringify(data),
      });

      console.log('Status de respuesta:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error HTTP:', response.status, errorText);
        throw new Error(`Error ${response.status}: ${errorText || 'Error del servidor'}`);
      }

      const result = await response.json();
      console.log('Respuesta del servidor:', result);
      
      if (result && typeof result.ok !== 'undefined' && !result.ok) {
        console.error('Error del backend:', result.error);
        throw new Error(result.error || 'Error al registrar empleado');
      }

      console.log('Empleado registrado exitosamente');
      return result;

    } catch (error) {
      console.error('Error en el servicio:', error.message);
      throw error;
    }
  }
};