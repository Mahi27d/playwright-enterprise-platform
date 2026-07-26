import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [agents, setAgents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get("/agents")
      .then((res) => setAgents(res.data))
      .catch((err) => setError(err?.response?.data?.detail || "Failed to load agents"));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => { localStorage.removeItem("token"); onLogout(); }}>Logout</button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <h3>Agents</h3>
      {agents.length === 0 && <div>No agents yet</div>}
      <ul>
        {agents.map((a) => (
          <li key={a.id}>{a.name} — {a.category} — {a.enabled ? 'enabled' : 'disabled'}</li>
        ))}
      </ul>
    </div>
  );
}
