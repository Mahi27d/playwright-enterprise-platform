import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/auth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register({ username, email, password, role });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Registration failed");
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
          textAlign: "left",
        }}
      >
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: 26, color: "#111827" }}>Create Account</h1>
        </div>

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: 16 }}>
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

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 8, color: "#374151", fontWeight: 600 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div style={{ marginBottom: 16 }}>
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

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 8, color: "#374151", fontWeight: 600 }}>
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", marginBottom: 8, color: "#374151", fontWeight: 600 }}>
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid #d1d5db",
                background: "#ffffff",
                fontSize: 15,
                outline: "none",
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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
            Register
          </button>
        </form>

        <div style={{ marginTop: 20, textAlign: "center", fontSize: 14 }}>
          <Link to="/login" style={{ color: "#2563eb", textDecoration: "none" }}>
            Already have an account?
          </Link>
        </div>

        {error && (
          <div style={{ marginTop: 20, color: "#dc2626", fontSize: 14 }}>{error}</div>
        )}
      </div>
    </div>
  );
}
