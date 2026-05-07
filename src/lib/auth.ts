// src/lib/auth.ts
export type AuthUser = {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  role?: "ADMIN" | "STAFF" | "LANDLORD" | "STUDENT" | string;
  verification_status?: string;
  landlord_profile?: Record<string, any> | null;
  student_profile?: Record<string, any> | null;
  form_details?: {
    role: "LANDLORD" | "STUDENT";
    details: Record<string, any>;
  } | null;
};

const USER_KEY = "liable_user";

export function setAuthUser(user: AuthUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  // ✅ notify Header to update immediately
  window.dispatchEvent(new Event("storage"));
}

export function getAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function clearAuthUser() {
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("storage"));
}
