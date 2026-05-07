import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiPost } from "@/lib/api";
import { setAuthUser } from "@/lib/auth";

type Mode = "login" | "otp_request" | "otp_verify";

function normalizeRole(role?: string) {
  const r = String(role || "").toUpperCase();
  if (r === "ADMIN" || r === "SUPERADMIN" || r === "SUPER_ADMIN") return "ADMIN";
  if (r === "STAFF") return "STAFF";
  if (r === "LANDLORD") return "LANDLORD";
  return "STUDENT";
}

const DASHBOARD_BASE_URL = (
  import.meta.env.VITE_DASHBOARD_BASE_URL || window.location.origin
).replace(/\/+$/, "");

export default function AuthPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // OTP reset fields
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // ✅ after OTP request, lock email field on verify screen (better UX)
  const emailLocked = useMemo(() => mode === "otp_verify", [mode]);

  function resetAlerts() {
    setMsg(null);
    setErr(null);
  }

  function redirectByRole(role?: string) {
    const r = normalizeRole(role);

    if (r === "ADMIN" || r === "STAFF") {
      window.location.assign(`${DASHBOARD_BASE_URL}/admin`);
      return;
    }

    if (r === "STUDENT") {
      window.location.assign(`${DASHBOARD_BASE_URL}/student`);
      return;
    }

    if (r === "LANDLORD") {
      window.location.assign(`${DASHBOARD_BASE_URL}/landlord`);
      return;
    }

    window.location.assign(`${DASHBOARD_BASE_URL}/student`);
  }

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    resetAlerts();

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return setErr("Email is required");
    if (!password) return setErr("Password is required");

    setLoading(true);
    try {
      const data = await apiPost("/api/accounts/auth/login/", {
        email: cleanEmail,
        password,
      });

      // backend returns: { message, user: {...} }
      if (!data?.user) throw new Error("Login response missing user data");

      // ✅ Store user with role
      setAuthUser(data.user);

      setMsg("Login success");
      redirectByRole(data.user?.role);
    } catch (ex: any) {
      setErr(ex?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function onOtpRequest(e: React.FormEvent) {
    e.preventDefault();
    resetAlerts();

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return setErr("Email is required");

    setLoading(true);
    try {
      await apiPost("/api/accounts/auth/password/otp/request/", {
        email: cleanEmail,
      });

      setMsg("OTP sent to email");
      setMode("otp_verify");
      setOtp("");
      setNewPassword("");
    } catch (ex: any) {
      setErr(ex?.message || "OTP request failed");
    } finally {
      setLoading(false);
    }
  }

  async function onOtpVerify(e: React.FormEvent) {
    e.preventDefault();
    resetAlerts();

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.trim();

    if (!cleanEmail) return setErr("Email is required");
    if (cleanOtp.length !== 6) return setErr("OTP must be 6 digits");
    if (!newPassword || newPassword.length < 6) return setErr("New password must be at least 6 chars");

    setLoading(true);
    try {
      await apiPost("/api/accounts/auth/password/otp/verify/", {
        email: cleanEmail,
        otp: cleanOtp,
        new_password: newPassword,
      });

      setMsg("Password reset success. Now login.");
      setMode("login");
      setPassword("");
      setOtp("");
      setNewPassword("");
    } catch (ex: any) {
      setErr(ex?.message || "OTP verify failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md border border-border rounded-2xl p-6 shadow-sm bg-card">
        <h1 className="text-xl font-semibold mb-1">
          {mode === "login"
            ? "Login"
            : mode === "otp_request"
            ? "Forgot Password"
            : "Verify OTP"}
        </h1>

        <p className="text-sm text-muted-foreground mb-6">
          {mode === "login"
            ? "Login with your approved account."
            : mode === "otp_request"
            ? "Enter your email to receive OTP."
            : "Enter OTP and set a new password."}
        </p>

        {msg && <div className="mb-4 text-sm text-green-600">{msg}</div>}
        {err && <div className="mb-4 text-sm text-red-600">{err}</div>}

        {/* ---------------- LOGIN ---------------- */}
        {mode === "login" && (
          <form onSubmit={onLogin} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                autoComplete="email"
              />
            </div>

            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label="Toggle password"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="flex justify-between text-sm">
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => {
                  resetAlerts();
                  setMode("otp_request");
                }}
              >
                Forgot password?
              </button>

              <button
                type="button"
                className="text-muted-foreground hover:underline"
                onClick={() => navigate("/")}
              >
                Back to home
              </button>
            </div>
          </form>
        )}

        {/* ---------------- OTP REQUEST ---------------- */}
        {mode === "otp_request" && (
          <form onSubmit={onOtpRequest} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                autoComplete="email"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </Button>

            <div className="flex justify-between text-sm">
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => {
                  resetAlerts();
                  setMode("login");
                }}
              >
                Back to login
              </button>
            </div>
          </form>
        )}

        {/* ---------------- OTP VERIFY ---------------- */}
        {mode === "otp_verify" && (
          <form onSubmit={onOtpVerify} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                value={email}
                disabled={emailLocked}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              {emailLocked && (
                <div className="text-xs text-muted-foreground mt-1">
                  Email locked for verification. Click “Back to login” to change.
                </div>
              )}
            </div>

            <div>
              <Label>OTP</Label>
              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6 digit OTP"
                inputMode="numeric"
                maxLength={6}
              />
            </div>

            <div>
              <Label>New Password</Label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label="Toggle new password"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP & Reset"}
            </Button>

            <div className="flex justify-between text-sm">
              <button
                type="button"
                className="text-primary hover:underline"
                disabled={loading}
                onClick={async () => {
                  // ✅ Resend OTP using same email
                  resetAlerts();
                  setLoading(true);
                  try {
                    await apiPost("/api/accounts/auth/password/otp/request/", {
                      email: email.trim().toLowerCase(),
                    });
                    setMsg("OTP resent to email");
                  } catch (ex: any) {
                    setErr(ex?.message || "Resend OTP failed");
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                Resend OTP
              </button>

              <button
                type="button"
                className="text-muted-foreground hover:underline"
                onClick={() => {
                  resetAlerts();
                  setMode("login");
                }}
              >
                Back to login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
