import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { apiPost } from "@/lib/api";

export default function ResetPasswordOtpPage() {
  const { toast } = useToast();
  const [params] = useSearchParams();

  const [email, setEmail] = useState(params.get("email") || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiPost("/api/accounts/auth/password/otp/verify/", {
        email,
        otp,
        new_password: newPassword,
      });

      toast({ title: "Password Updated", description: "Now you can login with new password." });
      window.location.href = "/auth";
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-md bg-background border border-border rounded-2xl p-6">
        <h1 className="text-xl font-semibold mb-2">Reset Password</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Enter OTP + new password.
        </p>

        <label className="text-sm font-medium">Email</label>
        <input
          className="w-full mt-2 mb-4 border border-border rounded-lg px-3 py-2 bg-background"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="text-sm font-medium">OTP</label>
        <input
          className="w-full mt-2 mb-4 border border-border rounded-lg px-3 py-2 bg-background"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="6-digit OTP"
          maxLength={6}
          required
        />

        <label className="text-sm font-medium">New Password</label>
        <input
          type="password"
          className="w-full mt-2 mb-4 border border-border rounded-lg px-3 py-2 bg-background"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Min 6 chars"
          required
        />

        <button
          disabled={loading}
          className="w-full rounded-lg py-2 bg-primary text-primary-foreground disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
