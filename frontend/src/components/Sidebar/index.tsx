import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuthData } from '../../services/auth';
import { useTheme } from '../../contexts/ThemeContext';

export default function Sidebar() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  };

  return (
    <aside
      style={{
        width: 260,
        padding: '24px 20px',
        background: theme === 'dark' ? '#0f172a' : '#111827',
        color: '#f9fafb',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
      }}
    >
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>EPAP</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 24 }}>
          Enterprise Playwright Automation Platform
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Link to="/dashboard" style={{ color: '#f9fafb', textDecoration: 'none', fontWeight: 600 }}>
            Dashboard
          </Link>
          <Link to="/agents" style={{ color: '#d1d5db', textDecoration: 'none' }}>
            Agents
          </Link>
          <Link to="/scheduler" style={{ color: '#d1d5db', textDecoration: 'none' }}>
            Scheduler
          </Link>
          <Link to="/reports" style={{ color: '#d1d5db', textDecoration: 'none' }}>
            Reports
          </Link>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        style={{
          padding: '12px 16px',
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
    </aside>
  );
}
