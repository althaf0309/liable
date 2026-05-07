import { apiFetch } from "@/lib/api";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;

  phone?: string;
  subject?: string;

  // ✅ for homepage dropdown
  contact_type?: "student" | "landlord" | "tenant" | "other" | "";
};

export async function submitContact(payload: ContactPayload) {
  const body = {
    name: (payload.name || "").trim(),
    phone: (payload.phone || "").trim(),
    email: (payload.email || "").trim(),
    subject: (payload.subject || "").trim(),
    contact_type: (payload.contact_type || "").trim(), // ✅ send if exists
    message: (payload.message || "").trim(),
  };

  // ✅ IMPORTANT: ensure JSON header is set
  return apiFetch("/api/core/contact/public/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
