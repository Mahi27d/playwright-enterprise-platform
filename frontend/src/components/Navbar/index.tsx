import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(148, 163, 184, 0.24)',
        background: theme === 'dark' ? '#111827' : '#ffffff',
        color: theme === 'dark' ? '#f9fafb' : '#111827',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontSize: 14, color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>Welcome back</div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{'Your workspace'}</div>
      </div>
      <button
        onClick={toggleTheme}
        style={{
          padding: '10px 16px',
          borderRadius: 12,
          border: '1px solid rgba(148, 163, 184, 0.4)',
          background: theme === 'dark' ? '#1f2937' : '#f8fafc',
          color: theme === 'dark' ? '#f9fafb' : '#111827',
          cursor: 'pointer',
        }}
      >
        {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
      </button>
    </header>
  );
}
