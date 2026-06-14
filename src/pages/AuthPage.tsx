import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, CheckCircle2, Building2, Users, MessageSquare, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiPost, API_BASE } from "@/lib/api";
import { setAuthUser } from "@/lib/auth";
import { submitContact } from "@/lib/contact";
import logo from "@/assets/logo.png";

type Mode = "choose" | "login" | "register" | "custom_request" | "otp_request" | "otp_verify" | "pending_approval";
type RegisterRole = "STUDENT" | "LANDLORD";

const DASHBOARD_BASE_URL = (
  import.meta.env.VITE_DASHBOARD_BASE_URL ||
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? window.location.origin
    : "https://app.lgsltd.uk")
).replace(/\/+$/, "");

function normalizeRole(role?: string) {
  const r = String(role || "").toUpperCase();
  if (r === "ADMIN" || r === "SUPERADMIN" || r === "SUPER_ADMIN") return "ADMIN";
  if (r === "STAFF") return "STAFF";
  if (r === "LANDLORD") return "LANDLORD";
  return "STUDENT";
}

function redirectByRole(role?: string) {
  const r = normalizeRole(role);
  if (r === "ADMIN" || r === "STAFF") window.location.assign(`${DASHBOARD_BASE_URL}/admin`);
  else if (r === "LANDLORD") window.location.assign(`${DASHBOARD_BASE_URL}/landlord`);
  else window.location.assign(`${DASHBOARD_BASE_URL}/student`);
}

export default function AuthPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    fetch(`${API_BASE}/api/accounts/auth/csrf/`, { method: "GET", credentials: "include" }).catch(() => {});
  }, []);

  const initialMode: Mode = params.get("register") ? "register" : "choose";
  const initialRole: RegisterRole = params.get("register") === "landlord" ? "LANDLORD" : "STUDENT";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [registerRole, setRegisterRole] = useState<RegisterRole>(initialRole);

  // shared fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // register fields
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP fields
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  // custom request fields
  const [reqName, setReqName] = useState("");
  const [reqEmail, setReqEmail] = useState("");
  const [reqPhone, setReqPhone] = useState("");
  const [reqType, setReqType] = useState("student_accommodation");
  const [reqMessage, setReqMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const emailLocked = useMemo(() => mode === "otp_verify", [mode]);

  function go(m: Mode) { setMsg(null); setErr(null); setMode(m); }

  // ── Login ─────────────────────────────────────────────────────
  async function onLogin(e: React.FormEvent) {
    e.preventDefault(); setMsg(null); setErr(null);
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return setErr("Email is required");
    if (!password) return setErr("Password is required");
    setLoading(true);
    try {
      const data = await apiPost("/api/accounts/auth/login/", { email: cleanEmail, password });
      if (!data?.user) throw new Error("Login response missing user data");
      setAuthUser(data.user);
      redirectByRole(data.user?.role);
    } catch (ex: any) {
      setErr(ex?.message || "Login failed");
    } finally { setLoading(false); }
  }

  // ── Register ──────────────────────────────────────────────────
  async function onRegister(e: React.FormEvent) {
    e.preventDefault(); setMsg(null); setErr(null);
    const cleanEmail = email.trim().toLowerCase();
    if (!fullName.trim()) return setErr("Full name is required");
    if (!cleanEmail) return setErr("Email is required");
    if (password.length < 6) return setErr("Password must be at least 6 characters");
    if (password !== confirmPassword) return setErr("Passwords do not match");
    setLoading(true);
    try {
      const endpoint = registerRole === "LANDLORD"
        ? "/api/accounts/public/register/landlord/"
        : "/api/accounts/public/register/student/";
      await apiPost(endpoint, { full_name: fullName.trim(), email: cleanEmail, password });
      go("pending_approval");
    } catch (ex: any) {
      setErr(ex?.message || "Registration failed");
    } finally { setLoading(false); }
  }

  // ── Custom Request ────────────────────────────────────────────
  async function onCustomRequest(e: React.FormEvent) {
    e.preventDefault(); setMsg(null); setErr(null);
    if (!reqName.trim()) return setErr("Name is required");
    if (!reqEmail.trim()) return setErr("Email is required");
    if (!reqMessage.trim()) return setErr("Message is required");
    setLoading(true);
    try {
      await submitContact({
        name: reqName.trim(),
        email: reqEmail.trim().toLowerCase(),
        phone: reqPhone.trim(),
        subject: `Custom Housing Request — ${reqType.replace(/_/g, " ")}`,
        message: reqMessage.trim(),
      });
      setMsg("Request submitted! Our team will contact you within 1–2 working days.");
      setReqName(""); setReqEmail(""); setReqPhone(""); setReqMessage("");
    } catch (ex: any) {
      setErr(ex?.message || "Request failed. Please try again.");
    } finally { setLoading(false); }
  }

  // ── OTP Request ───────────────────────────────────────────────
  async function onOtpRequest(e: React.FormEvent) {
    e.preventDefault(); setMsg(null); setErr(null);
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return setErr("Email is required");
    setLoading(true);
    try {
      await apiPost("/api/accounts/auth/password/otp/request/", { email: cleanEmail });
      setMsg("OTP sent to your email");
      go("otp_verify");
    } catch (ex: any) {
      setErr(ex?.message || "OTP request failed");
    } finally { setLoading(false); }
  }

  // ── OTP Verify ────────────────────────────────────────────────
  async function onOtpVerify(e: React.FormEvent) {
    e.preventDefault(); setMsg(null); setErr(null);
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return setErr("Email is required");
    if (otp.trim().length !== 6) return setErr("OTP must be 6 digits");
    if (!newPassword || newPassword.length < 6) return setErr("New password must be at least 6 characters");
    setLoading(true);
    try {
      await apiPost("/api/accounts/auth/password/otp/verify/", {
        email: cleanEmail, otp: otp.trim(), new_password: newPassword,
      });
      setMsg("Password reset successfully. Please login.");
      go("login");
      setPassword("");
    } catch (ex: any) {
      setErr(ex?.message || "OTP verify failed");
    } finally { setLoading(false); }
  }

  // ── Shared UI pieces ──────────────────────────────────────────
  const AlertMsg = () => (
    <>
      {msg && <div className="mb-4 text-sm text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-4 py-3">{msg}</div>}
      {err && <div className="mb-4 text-sm text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-lg px-4 py-3">{err}</div>}
    </>
  );

  const PasswordInput = ({
    value, onChange, show, onToggle, placeholder = "Enter password", name = "password",
  }: { value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void; placeholder?: string; name?: string }) => (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={name}
        className="pr-10 bg-[hsl(220,44%,8%)] border-[hsl(220,30%,18%)] focus:border-primary"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle password"
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );

  // ── RENDER ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex bg-[hsl(222,48%,4%)]">
      {/* Left panel — London brand */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1640035012100-faf53d817838?fm=jpg&q=80&w=900&auto=format&fit=crop"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,48%,4%)]/80 via-[hsl(222,48%,4%)]/50 to-[hsl(222,48%,4%)]/90" />
        <div className="relative z-10 p-10">
          <img src={logo} alt="Liable" className="h-14 w-auto" />
        </div>
        <div className="relative z-10 p-10">
          <p className="font-serif text-3xl font-bold text-white leading-tight mb-4">
            Controlled student housing infrastructure.
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            Every placement, tenancy, and decision is reviewed by a Liable operator — never autonomous.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              { label: "10", sub: "Modules" },
              { label: "100%", sub: "Human-Reviewed" },
              { label: "3", sub: "User Flows" },
              { label: "0", sub: "Auto Decisions" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-2xl font-bold text-primary font-display">{s.label}</p>
                <p className="text-xs text-white/60 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — forms */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* mobile logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <img src={logo} alt="Liable" className="h-12 w-auto" />
          </div>

          {/* ── CHOOSE MODE ── */}
          {mode === "choose" && (
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Welcome</h1>
              <p className="text-muted-foreground text-sm mb-8">Choose how to proceed with Liable Group Services.</p>
              <div className="space-y-3">
                <button
                  onClick={() => go("login")}
                  className="w-full flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-left hover:border-primary/40 hover:bg-card/80 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                    <LogIn className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Login</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Access your approved account</p>
                  </div>
                </button>

                <button
                  onClick={() => { setRegisterRole("STUDENT"); go("register"); }}
                  className="w-full flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-left hover:border-primary/40 hover:bg-card/80 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/15 transition-colors">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Register as Student</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Apply for student accommodation</p>
                  </div>
                </button>

                <button
                  onClick={() => { setRegisterRole("LANDLORD"); go("register"); }}
                  className="w-full flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-left hover:border-primary/40 hover:bg-card/80 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/15 transition-colors">
                    <Building2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Register as Landlord</p>
                    <p className="text-xs text-muted-foreground mt-0.5">List your properties with Liable</p>
                  </div>
                </button>

                <button
                  onClick={() => go("custom_request")}
                  className="w-full flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-left hover:border-primary/40 hover:bg-card/80 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/15 transition-colors">
                    <MessageSquare className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Custom Request</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Send us a housing inquiry without registering</p>
                  </div>
                </button>
              </div>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                <button className="hover:text-primary transition-colors" onClick={() => navigate("/")}>
                  ← Back to website
                </button>
              </p>
            </div>
          )}

          {/* ── LOGIN ── */}
          {mode === "login" && (
            <div>
              <button onClick={() => go("choose")} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <h1 className="font-serif text-3xl font-bold text-foreground mb-1">Login</h1>
              <p className="text-muted-foreground text-sm mb-6">Login with your approved Liable account.</p>
              <AlertMsg />
              <form onSubmit={onLogin} className="space-y-4">
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" autoComplete="email"
                    className="bg-[hsl(220,44%,8%)] border-[hsl(220,30%,18%)] focus:border-primary" />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Password</Label>
                  <PasswordInput value={password} onChange={setPassword} show={showPassword} onToggle={() => setShowPassword(s => !s)} />
                </div>
                <Button type="submit" className="w-full h-11" disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
                <div className="flex justify-between text-sm">
                  <button type="button" className="text-primary hover:underline" onClick={() => go("otp_request")}>Forgot password?</button>
                  <button type="button" className="text-muted-foreground hover:text-foreground" onClick={() => navigate("/")}>Back to home</button>
                </div>
              </form>
            </div>
          )}

          {/* ── REGISTER ── */}
          {mode === "register" && (
            <div>
              <button onClick={() => go("choose")} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <h1 className="font-serif text-3xl font-bold text-foreground mb-1">Register</h1>
              <p className="text-muted-foreground text-sm mb-5">Create your account. An admin will approve it before you can log in.</p>

              {/* Role toggle */}
              <div className="flex gap-2 mb-6 p-1 bg-muted/40 rounded-lg border border-border">
                {(["STUDENT", "LANDLORD"] as RegisterRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRegisterRole(r)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${registerRole === r ? "bg-card shadow border border-border text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {r === "STUDENT" ? "Student" : "Landlord"}
                  </button>
                ))}
              </div>

              <AlertMsg />
              <form onSubmit={onRegister} className="space-y-4">
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Full Name</Label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name"
                    className="bg-[hsl(220,44%,8%)] border-[hsl(220,30%,18%)] focus:border-primary" />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" autoComplete="email"
                    className="bg-[hsl(220,44%,8%)] border-[hsl(220,30%,18%)] focus:border-primary" />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Password</Label>
                  <PasswordInput value={password} onChange={setPassword} show={showPassword} onToggle={() => setShowPassword(s => !s)} placeholder="Min. 6 characters" />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Confirm Password</Label>
                  <PasswordInput value={confirmPassword} onChange={setConfirmPassword} show={showConfirmPassword} onToggle={() => setShowConfirmPassword(s => !s)} placeholder="Repeat password" name="confirm-password" />
                </div>
                <Button type="submit" className="w-full h-11" disabled={loading}>{loading ? "Creating account..." : `Register as ${registerRole === "STUDENT" ? "Student" : "Landlord"}`}</Button>
                <p className="text-xs text-center text-muted-foreground">
                  Already have an account?{" "}
                  <button type="button" className="text-primary hover:underline" onClick={() => go("login")}>Login</button>
                </p>
              </form>
            </div>
          )}

          {/* ── PENDING APPROVAL ── */}
          {mode === "pending_approval" && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-foreground mb-3">Account Created</h1>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Your account is now <span className="text-primary font-semibold">pending admin approval</span>. A Liable operator will review your registration and notify you by email once approved.
              </p>
              <div className="rounded-xl bg-card border border-border p-5 text-left mb-6 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">What happens next?</p>
                {[
                  "Admin reviews your registration",
                  "Your account is approved and activated",
                  "You receive an email confirmation",
                  "Log in and complete your profile",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Button className="w-full" onClick={() => go("login")}>Go to Login</Button>
                <Button variant="outline" className="w-full" onClick={() => navigate("/")}>Back to Website</Button>
              </div>
              <p className="mt-5 text-xs text-muted-foreground">
                Admin?{" "}
                <a href={`${DASHBOARD_BASE_URL}/admin`} className="text-primary hover:underline">Go to Admin Dashboard</a>
              </p>
            </div>
          )}

          {/* ── CUSTOM REQUEST ── */}
          {mode === "custom_request" && (
            <div>
              <button onClick={() => go("choose")} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <h1 className="font-serif text-3xl font-bold text-foreground mb-1">Custom Request</h1>
              <p className="text-muted-foreground text-sm mb-6">Send a housing inquiry — no account needed. We'll get back to you within 1–2 working days.</p>
              <AlertMsg />
              {!msg && (
                <form onSubmit={onCustomRequest} className="space-y-4">
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Your Name</Label>
                    <Input value={reqName} onChange={(e) => setReqName(e.target.value)} placeholder="Full name"
                      className="bg-[hsl(220,44%,8%)] border-[hsl(220,30%,18%)] focus:border-primary" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Email</Label>
                    <Input value={reqEmail} onChange={(e) => setReqEmail(e.target.value)} placeholder="your@email.com" type="email"
                      className="bg-[hsl(220,44%,8%)] border-[hsl(220,30%,18%)] focus:border-primary" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Phone (optional)</Label>
                    <Input value={reqPhone} onChange={(e) => setReqPhone(e.target.value)} placeholder="+44 7..."
                      className="bg-[hsl(220,44%,8%)] border-[hsl(220,30%,18%)] focus:border-primary" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Request Type</Label>
                    <select
                      value={reqType}
                      onChange={(e) => setReqType(e.target.value)}
                      className="w-full h-10 rounded-md border border-[hsl(220,30%,18%)] bg-[hsl(220,44%,8%)] px-3 text-sm text-foreground focus:outline-none focus:border-primary"
                    >
                      <option value="student_accommodation">Student Accommodation</option>
                      <option value="landlord_listing">List My Property</option>
                      <option value="agency_partnership">Agency Partnership</option>
                      <option value="corporate_housing">Corporate Housing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Message</Label>
                    <Textarea
                      value={reqMessage}
                      onChange={(e) => setReqMessage(e.target.value)}
                      placeholder="Tell us what you're looking for..."
                      rows={4}
                      className="bg-[hsl(220,44%,8%)] border-[hsl(220,30%,18%)] focus:border-primary resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full h-11" disabled={loading}>{loading ? "Sending..." : "Submit Request"}</Button>
                </form>
              )}
              {msg && (
                <div className="mt-4">
                  <Button variant="outline" className="w-full" onClick={() => navigate("/")}>Back to Website</Button>
                </div>
              )}
            </div>
          )}

          {/* ── OTP REQUEST ── */}
          {mode === "otp_request" && (
            <div>
              <button onClick={() => go("login")} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to login
              </button>
              <h1 className="font-serif text-3xl font-bold text-foreground mb-1">Forgot Password</h1>
              <p className="text-muted-foreground text-sm mb-6">Enter your email to receive a one-time password reset code.</p>
              <AlertMsg />
              <form onSubmit={onOtpRequest} className="space-y-4">
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" autoComplete="email"
                    className="bg-[hsl(220,44%,8%)] border-[hsl(220,30%,18%)] focus:border-primary" />
                </div>
                <Button type="submit" className="w-full h-11" disabled={loading}>{loading ? "Sending OTP..." : "Send OTP"}</Button>
              </form>
            </div>
          )}

          {/* ── OTP VERIFY ── */}
          {mode === "otp_verify" && (
            <div>
              <button onClick={() => go("otp_request")} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <h1 className="font-serif text-3xl font-bold text-foreground mb-1">Verify OTP</h1>
              <p className="text-muted-foreground text-sm mb-6">Enter the 6-digit code sent to your email and set a new password.</p>
              <AlertMsg />
              <form onSubmit={onOtpVerify} className="space-y-4">
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Email</Label>
                  <Input value={email} disabled={emailLocked} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
                    className="bg-[hsl(220,44%,8%)] border-[hsl(220,30%,18%)] focus:border-primary disabled:opacity-60" />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">OTP Code</Label>
                  <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6 digit code" inputMode="numeric" maxLength={6}
                    className="bg-[hsl(220,44%,8%)] border-[hsl(220,30%,18%)] focus:border-primary tracking-[0.4em] text-center text-lg font-bold" />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">New Password</Label>
                  <PasswordInput value={newPassword} onChange={setNewPassword} show={showNewPassword} onToggle={() => setShowNewPassword(s => !s)} placeholder="New password" name="new-password" />
                </div>
                <Button type="submit" className="w-full h-11" disabled={loading}>{loading ? "Verifying..." : "Reset Password"}</Button>
                <div className="flex justify-between text-sm">
                  <button type="button" className="text-primary hover:underline" disabled={loading} onClick={async () => {
                    setMsg(null); setErr(null); setLoading(true);
                    try {
                      await apiPost("/api/accounts/auth/password/otp/request/", { email: email.trim().toLowerCase() });
                      setMsg("OTP resent");
                    } catch (ex: any) { setErr(ex?.message || "Resend failed"); }
                    finally { setLoading(false); }
                  }}>Resend OTP</button>
                  <button type="button" className="text-muted-foreground hover:text-foreground" onClick={() => go("login")}>Back to login</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
