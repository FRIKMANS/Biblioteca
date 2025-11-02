const API = "https://huitzilapps.com/biblioteca_api";

export async function loginRequest(username, password) {
  const res = await fetch(`${API}/login.php`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Login failed" }));
    throw new Error(err.error || "Login failed");
  }
  return res.json();
}

export async function refreshRequest() {
  const res = await fetch(`${API}/refresh.php`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Refresh failed");
  return res.json();
}

export async function logoutRequest(username) {
  const res = await fetch(`${API}/logout.php`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  return res.json();
}
