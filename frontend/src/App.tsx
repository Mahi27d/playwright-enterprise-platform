import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const onLogin = () => setToken(localStorage.getItem("token"));
  const onLogout = () => setToken(null);

  return (
    <div style={{ padding: 40 }}>
      <h1>Enterprise Playwright Automation Platform</h1>
      {!token ? <Login onLogin={onLogin} /> : <Dashboard onLogout={onLogout} />}
    </div>
  );
}

export default App;
