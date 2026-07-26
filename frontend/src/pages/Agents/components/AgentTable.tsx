import React from "react";
import { Agent } from "../index";

type Props = {
  agents: Agent[];
  onEdit: (agent: Agent) => void;
  onClone: (agent: Agent) => void;
  onDelete: (agent: Agent) => void;
  onToggle: (agent: Agent) => void;
};

export default function AgentTable({ agents, onEdit, onClone, onDelete, onToggle }: Props) {
  return (
    <div style={{ overflowX: "auto", background: "#ffffff", borderRadius: 20, boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)", padding: 20 }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {['ID', 'Name', 'Website', 'Category', 'Browser', 'Status', 'Updated', 'Actions'].map((title) => (
              <th key={title} style={{ textAlign: 'left', padding: '12px 8px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id}>
              <td style={{ padding: '12px 8px' }}>{agent.id}</td>
              <td style={{ padding: '12px 8px' }}>{agent.name}</td>
              <td style={{ padding: '12px 8px' }}>{agent.website}</td>
              <td style={{ padding: '12px 8px' }}>{agent.category}</td>
              <td style={{ padding: '12px 8px' }}>{agent.browser}</td>
              <td style={{ padding: '12px 8px' }}>{agent.enabled ? 'Active' : 'Disabled'}</td>
              <td style={{ padding: '12px 8px' }}>{new Date(agent.updated_at).toLocaleDateString()}</td>
              <td style={{ padding: '12px 8px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button onClick={() => onEdit(agent)} style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid #2563eb', background: '#eff6ff', color: '#1d4ed8', cursor: 'pointer' }}>
                  Edit
                </button>
                <button onClick={() => onClone(agent)} style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid #d1d5db', background: '#f8fafc', cursor: 'pointer' }}>
                  Clone
                </button>
                <button onClick={() => onDelete(agent)} style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid #dc2626', background: '#fef2f2', color: '#b91c1c', cursor: 'pointer' }}>
                  Delete
                </button>
                <button onClick={() => onToggle(agent)} style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid #059669', background: '#ecfdf5', color: '#047857', cursor: 'pointer' }}>
                  {agent.enabled ? 'Disable' : 'Enable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
