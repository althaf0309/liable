// src/lib/api.ts

export const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000")
  .replace(/\/+$/, "");

async function parseJsonSafe(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { detail: text }; // HTML/Plain text error pages
  }
}

function getCookie(name: string) {
  const m = document.cookie.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));
  return m ? decodeURIComponent(m[2]) : null;
}

let csrfPromise: Promise<void> | null = null;

async function ensureCsrfCookie() {
  if (getCookie("csrftoken")) return;
  if (!csrfPromise) {
    csrfPromise = fetch(`${API_BASE}/api/accounts/auth/csrf/`, {
      method: "GET",
      credentials: "include",
    }).then(() => undefined).finally(() => {
      csrfPromise = null;
    });
  }
  await csrfPromise;
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const method = (options.method || "GET").toUpperCase();

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (method !== "GET" && options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (!["GET", "HEAD", "OPTIONS", "TRACE"].includes(method)) {
    await ensureCsrfCookie();
  }

  const csrf = getCookie("csrftoken");
  if (csrf && method !== "GET") {
    headers["X-CSRFToken"] = csrf;
  }

  const res = await fetch(url, {
    ...options,
    method,
    headers,
    credentials: "include", // ✅ REQUIRED for Django session cookie
  });

  const data = await parseJsonSafe(res);

  if (!res.ok) {
    const msg = (data as any)?.detail || (data as any)?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}

export function apiPost(path: string, body: any) {
  return apiFetch(path, { method: "POST", body: JSON.stringify(body ?? {}) });
}

export function apiGet(path: string) {
  return apiFetch(path, { method: "GET" });
}
