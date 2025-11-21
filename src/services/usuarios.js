const API_URL = "https://proyecto-progint2.rf.gd/biblioteca_api";
const API_KEY = "aserejeajaeje";

export async function registrarUsuario(data) {
  const res = await fetch(`${API_URL}/registrar_usuarios.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
    body: JSON.stringify(data),
  });

  const contentType = res.headers.get("content-type");
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Error al registrar usuario: " + errorText.slice(0, 100));
  }

  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  } else {
    throw new Error("Respuesta inesperada del servidor al registrar usuario");
  }
}

export async function listarUsuarios() {
  const res = await fetch(`${API_URL}/usuarios_listar.php`, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });

  const contentType = res.headers.get("content-type");
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Error al cargar usuarios: " + errorText.slice(0, 100));
  }

  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  } else {
    throw new Error("Respuesta inesperada del servidor al cargar usuarios");
  }
}