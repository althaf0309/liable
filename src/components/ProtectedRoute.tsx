import { Navigate } from "react-router-dom";
import { getAuthUser } from "@/lib/auth";

function normalizeRole(role?: string) {
  const r = String(role || "").toUpperCase();
  if (r === "ADMIN" || r === "SUPERADMIN" || r === "SUPER_ADMIN") return "ADMIN";
  if (r === "STAFF") return "STAFF";
  if (r === "LANDLORD") return "LANDLORD";
  if (r === "STUDENT") return "STUDENT";
  return "GUEST";
}

export default function ProtectedRoute({
  allow,
  children,
}: {
  allow: string[];
  children: JSX.Element;
}) {
  const user = getAuthUser();
  const allowUpper = allow.map((x) => x.toUpperCase());

  // ✅ If route allows GUEST, let public users pass
  if (!user) {
    if (allowUpper.includes("GUEST")) return children;
    return <Navigate to="/auth" replace />;
  }

  const role = normalizeRole(user.role);
  const ok = allowUpper.includes(role);

  if (!ok) return <Navigate to="/" replace />;
  return children;
}
