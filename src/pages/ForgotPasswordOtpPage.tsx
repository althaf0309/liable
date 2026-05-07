import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

export default function ForgotPasswordOtpPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/password/otp/request/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || data.message || "Failed to send OTP");

      toast({ title: "OTP Sent", description: "Check your email for OTP." });

      // move to reset page
      window.location.href = `/auth/reset?email=${encodeURIComponent(email)}`;
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-md bg-background border border-border rounded-2xl p-6">
        <h1 className="text-xl font-semibold mb-2">Forgot Password</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Enter your email. We will send you an OTP to reset password.
        </p>

        <label className="text-sm font-medium">Email</label>
        <input
          className="w-full mt-2 mb-4 border border-border rounded-lg px-3 py-2 bg-background"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
          required
        />

        <button
          disabled={loading}
          className="w-full rounded-lg py-2 bg-primary text-primary-foreground disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
