import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 32,
          borderRadius: 20,
          background: "#ffffff",
          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              width: 70,
              height: 70,
              margin: "0 auto 16px",
              borderRadius: 20,
              background: "#1f2937",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            EPAP
          </div>
          <h1 style={{ margin: 0, fontSize: 24, color: "#111827" }}>Enterprise Playwright</h1>
          <p style={{ margin: "8px 0 0", color: "#6b7280" }}>Automation Platform</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ textAlign: "left", marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 8, color: "#374151", fontWeight: 600 }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid #d1d5db",
                outline: "none",
                fontSize: 15,
              }}
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: 24 }}>
            <label style={{ display: "block", marginBottom: 8, color: "#374151", fontWeight: 600 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid #d1d5db",
                outline: "none",
                fontSize: 15,
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 12,
              border: "none",
              background: "#2563eb",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", fontSize: 14 }}>
          <Link to="#" style={{ color: "#2563eb", textDecoration: "none" }}>
            Forgot Password?
          </Link>
          <Link to="/register" style={{ color: "#2563eb", textDecoration: "none" }}>
            Register
          </Link>
        </div>

        {error && (
          <div style={{ marginTop: 20, color: "#dc2626", fontSize: 14, textAlign: "left" }}>{error}</div>
        )}
      </div>
    </div>
  );
}
