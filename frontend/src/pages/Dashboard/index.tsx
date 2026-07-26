import React from "react";
import { useNavigate } from "react-router-dom";
import { getStoredUser } from "../../services/auth";

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = getStoredUser();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 24,
          borderRadius: 20,
          background: '#ffffff',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 28, color: '#111827' }}>
            Welcome {user?.username || 'Mahendra'}
          </h1>
          <p style={{ margin: '8px 0 0', color: '#4b5563' }}>System Healthy</p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '12px 18px',
            borderRadius: 12,
            border: 'none',
            background: '#ef4444',
            color: '#ffffff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gap: 24,
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        }}
      >
        {[
          { label: 'Total Agents', value: 0 },
          { label: 'Running', value: 0 },
          { label: 'Success', value: 0 },
          { label: 'Failed', value: 0 },
        ].map((metric) => (
          <div
            key={metric.label}
            style={{
              padding: 24,
              borderRadius: 20,
              background: '#ffffff',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
            }}
          >
            <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 8 }}>{metric.label}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#111827' }}>{metric.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
