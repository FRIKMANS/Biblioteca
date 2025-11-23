const API_URL = "https://huitzilapps.com/biblioteca_api";
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

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Error al registrar usuario: " + errorText.slice(0, 100));
  }

  const json = await res.json();
  return json;
}

export async function listarUsuarios() {
  const res = await fetch(`${API_URL}/usuarios_listar.php`, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Error al cargar usuarios: " + errorText.slice(0, 100));
  }

  const json = await res.json();
  return json;
}