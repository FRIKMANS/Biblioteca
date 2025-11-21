const API_URL = "https://red-quetzal-941940.hostingersite.com/biblioteca_api";
const API_KEY = "aserejeajaeje";

/*-------------------------*/
/*-------- LIBROS --------*/
/*-------------------------*/

export async function listarLibros() {
  const res = await fetch(`${API_URL}/libros_listar.php?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Error al listar libros");
  return await res.json();
}

export async function agregarLibro(data) {
  const res = await fetch(`${API_URL}/libros_insertar.php`, {
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
    throw new Error("Error al registrar libro: " + errorText.slice(0, 100));
  }

  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  } else {
    throw new Error("Respuesta inesperada del servidor al registrar libro");
  }
}

export async function actualizarLibroExistencias(isbn, existencias) {
  const res = await fetch(`${API_URL}/libros_actualizar.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
    body: JSON.stringify({ isbn, existencias }),
  });

  if (!res.ok) throw new Error("Error al actualizar libro");
  return await res.json();
}

/*-------------------------*/
/*------- PELÍCULAS -------*/
/*-------------------------*/

export async function listarPeliculas() {
  const res = await fetch(`${API_URL}/peliculas_listar.php?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Error al listar películas");
  return await res.json();
}

export async function insertarPelicula(data) {
  const res = await fetch(`${API_URL}/peliculas_insertar.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
    body: JSON.stringify(data),
  });

  const contentType = res.headers.get("content-type");
  const json = contentType && contentType.includes("application/json") ? await res.json() : null;

  if (!res.ok || !json?.ok) {
    const errorText = json?.error || "Error al registrar película";
    throw new Error(errorText);
  }

  return json;
}

export async function actualizarPeliculaExistencias(id, disponibles) {
  const res = await fetch(`${API_URL}/peliculas_actualizar.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
    body: JSON.stringify({ id, disponibles }),
  });

  if (!res.ok) throw new Error("Error al actualizar película");
  return await res.json();
}

/*-------------------------*/
/*------- DONACIONES -------*/
/*-------------------------*/

export async function registrarDonacion(data) {
  try {
    const res = await fetch(`${API_URL}/donaciones_insertar.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
      body: JSON.stringify(data),
    });

    const contentType = res.headers.get("content-type");
    const json = contentType && contentType.includes("application/json")
      ? await res.json()
      : { error: "Respuesta no válida del servidor" };

    if (!res.ok || !json.ok) {
      throw new Error(json.error || "Error al registrar donación");
    }

    return json;
  } catch (err) {
    console.error("registrarDonacion error:", err);
    throw err;
  }
}

export async function listarDonaciones() {
  const res = await fetch(`${API_URL}/donaciones_listar.php?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Error al listar donaciones");
  return await res.json();
}

/*-------------------------*/
/*-------- PRÉSTAMOS --------*/
/*-------------------------*/

export async function registrarPrestamo(data) {
  const res = await fetch(`${API_URL}/prestamos_insertar.php`, {
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
    throw new Error("Error al registrar préstamo: " + errorText.slice(0, 100));
  }

  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  } else {
    throw new Error("Respuesta inesperada del servidor al registrar préstamo");
  }
}

export async function registrarDevolucion(data) {
  const res = await fetch(`${API_URL}/prestamos_devolver.php`, {
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
    throw new Error("Error al registrar devolución: " + errorText.slice(0, 100));
  }

  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  } else {
    throw new Error("Respuesta inesperada del servidor al registrar devolución");
  }
}

export async function listarPrestamos(filtros = {}) {
  const params = new URLSearchParams();
  if (filtros.q) params.append('q', filtros.q);
  if (filtros.estado) params.append('estado', filtros.estado);
  
  const res = await fetch(`${API_URL}/prestamos_listar.php?${params.toString()}`, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });

  const contentType = res.headers.get("content-type");
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Error al cargar préstamos: " + errorText.slice(0, 100));
  }

  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  } else {
    throw new Error("Respuesta inesperada del servidor al cargar préstamos");
  }
}

/*-------------------------*/
/*-------- GLOBAL --------*/
/*-------------------------*/

export async function buscar(q) {
  const res = await fetch(
    `${API_URL}/buscar.php?api_key=${API_KEY}&q=${encodeURIComponent(q)}`
  );

  if (!res.ok) throw new Error("Error al realizar la búsqueda");
  return await res.json();
}
