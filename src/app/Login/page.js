"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If we're already logged in, skip the login page and go straight to admin!
    if (localStorage.getItem("isLoggedIn") === "true") {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // ✅ Store session in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("adminEmail", email);

        // Redirect to the actual Admin Upload page
        router.push("/admin");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Server is down. Please check your Spring Boot backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-['Poppins'] px-6">

      {/* Back to Home Link */}
      <Link href="/" className="mb-8 text-slate-400 hover:text-[#004e92] transition-colors flex items-center gap-2">
        ← Back to Home
      </Link>

      <div className="w-full max-w-[450px] bg-white p-10 rounded-[30px] shadow-2xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#004e92]/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🔐</div>
          <h2 className="text-3xl font-bold text-slate-800">Admin Login</h2>
          <p className="text-slate-500 mt-2">Enter your credentials to access UltraLab</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#004e92] transition-all"
              placeholder="admin@ultralab.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#004e92] transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg text-center font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${loading ? "bg-slate-400" : "bg-[#004e92] hover:bg-[#003366] active:scale-95"
              }`}
          >
            {loading ? "Verifying..." : "Sign In to Dashboard"}
          </button>
        </form>
      </div>

      <p className="mt-8 text-slate-400 text-sm">
        © 2026 UltraLab Security System
      </p>
    </div>
  );
}