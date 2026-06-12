// src/lib/api.ts

const defaultApiBase =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? `http://${window.location.hostname}:8000`
    : "https://api.lgsltd.uk";

export const API_BASE = (import.meta.env.VITE_API_BASE_URL || defaultApiBase).replace(/\/+$/, "");

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
let csrfToken: string | null = null;

async function ensureCsrfCookie() {
  if (getCookie("csrftoken")) return;
  if (!csrfPromise) {
    csrfPromise = fetch(`${API_BASE}/api/accounts/auth/csrf/`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        try {
          const data = await response.json();
          csrfToken = data?.csrfToken || csrfToken;
        } catch {
          // Cookie-only CSRF endpoints are still valid.
        }
      })
      .catch(() => {
        // CSRF preflight failed — proceed anyway; the server will 403 if the token is required.
      })
      .finally(() => {
        csrfPromise = null;
      });
  }
  await csrfPromise;
}

function normalizeNetworkError(err: unknown): Error {
  if (err instanceof Error) {
    const msg = err.message.toLowerCase();
    if (
      msg.includes("failed to fetch") ||
      msg.includes("networkerror") ||
      msg.includes("socket") ||
      msg.includes("connection") ||
      msg.includes("load failed") ||
      msg.includes("network request failed")
    ) {
      return new Error("Unable to reach the server. Please check your connection or try again.");
    }
    return err;
  }
  return new Error("An unexpected error occurred. Please try again.");
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

  const csrf = getCookie("csrftoken") || csrfToken;
  if (csrf && method !== "GET") {
    headers["X-CSRFToken"] = csrf;
  }

  let res: Response;
  try {
    res = await fetch(url, {
      ...options,
      method,
      headers,
      credentials: "include",
    });
  } catch (err) {
    throw normalizeNetworkError(err);
  }

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
