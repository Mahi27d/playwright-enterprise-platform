import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import { useTheme } from '../contexts/ThemeContext';

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { theme } = useTheme();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: theme === 'dark' ? '#0f172a' : '#f3f4f6' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, padding: 24 }}>{children}</main>
      </div>
    </div>
  );
}
