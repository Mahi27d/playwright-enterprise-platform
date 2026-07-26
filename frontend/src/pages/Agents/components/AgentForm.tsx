import React, { useEffect, useState } from "react";
import { Agent } from "../index";

type Props = {
  agent: Agent | null;
  onClose: () => void;
  onSubmit: (data: Partial<Agent>) => void;
};

const defaultValues = {
  name: "",
  description: "",
  category: "",
  website: "",
  start_url: "",
  browser: "",
  schedule: "",
  timeout: 30,
  retry_count: 3,
  enabled: true,
};

export default function AgentForm({ agent, onClose, onSubmit }: Props) {
  const [data, setData] = useState<Partial<Agent>>(defaultValues);

  useEffect(() => {
    if (agent) {
      setData(agent);
    } else {
      setData(defaultValues);
    }
  }, [agent]);

  const handleChange = (field: keyof Agent, value: string | number | boolean) => {
    setData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(data);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, zIndex: 50 }}>
      <div style={{ width: "100%", maxWidth: 640, background: "#ffffff", borderRadius: 24, padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h3 style={{ margin: 0 }}>{agent ? "Edit Agent" : "Create Agent"}</h3>
          <button onClick={onClose} style={{ border: "none", background: "transparent", fontSize: 18, cursor: "pointer" }}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gap: 12 }}>
            <label>Name</label>
            <input
              value={data.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              style={{ padding: 12, borderRadius: 12, border: "1px solid #d1d5db" }}
            />
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <label>Description</label>
            <textarea
              value={data.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              style={{ padding: 12, borderRadius: 12, border: "1px solid #d1d5db", minHeight: 100 }}
            />
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <label>Category</label>
            <input
              value={data.category || ""}
              onChange={(e) => handleChange("category", e.target.value)}
              required
              style={{ padding: 12, borderRadius: 12, border: "1px solid #d1d5db" }}
            />
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <label>Website</label>
            <input
              value={data.website || ""}
              onChange={(e) => handleChange("website", e.target.value)}
              required
              style={{ padding: 12, borderRadius: 12, border: "1px solid #d1d5db" }}
            />
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <label>Start URL</label>
            <input
              value={data.start_url || ""}
              onChange={(e) => handleChange("start_url", e.target.value)}
              required
              style={{ padding: 12, borderRadius: 12, border: "1px solid #d1d5db" }}
            />
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <label>Browser</label>
            <input
              value={data.browser || ""}
              onChange={(e) => handleChange("browser", e.target.value)}
              required
              style={{ padding: 12, borderRadius: 12, border: "1px solid #d1d5db" }}
            />
          </div>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ display: "grid", gap: 12 }}>
              <label>Retry Count</label>
              <input
                type="number"
                value={data.retry_count ?? 3}
                onChange={(e) => handleChange("retry_count", Number(e.target.value))}
                style={{ padding: 12, borderRadius: 12, border: "1px solid #d1d5db" }}
              />
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              <label>Timeout</label>
              <input
                type="number"
                value={data.timeout ?? 30}
                onChange={(e) => handleChange("timeout", Number(e.target.value))}
                style={{ padding: 12, borderRadius: 12, border: "1px solid #d1d5db" }}
              />
            </div>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <label>Schedule</label>
            <input
              value={data.schedule || ""}
              onChange={(e) => handleChange("schedule", e.target.value)}
              style={{ padding: 12, borderRadius: 12, border: "1px solid #d1d5db" }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <button type="button" onClick={onClose} style={{ padding: "12px 18px", borderRadius: 12, border: "1px solid #d1d5db", background: "#f8fafc", cursor: "pointer" }}>
              Cancel
            </button>
            <button type="submit" style={{ padding: "12px 18px", borderRadius: 12, border: "none", background: "#2563eb", color: "#fff", cursor: "pointer" }}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
