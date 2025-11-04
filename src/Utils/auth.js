
import axios from "axios";

export function readTokenFromLocalStorage() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("token");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed?.token ?? parsed?.access_token ?? null;
  } catch {
    // not JSON, return raw string, trimming possible "Bearer " prefix
    return typeof raw === "string" ? raw.replace(/^Bearer\s+/i, "") : null;
  }
}

export function setTokenToLocalStorage(token) {
  if (typeof window === "undefined") return;
  // store raw token string
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function removeTokenFromLocalStorage() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
}
