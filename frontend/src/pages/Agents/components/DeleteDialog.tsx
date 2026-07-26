import React from "react";
import { Agent } from "../index";

type Props = {
  agent: Agent;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteDialog({ agent, onClose, onConfirm }: Props) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, zIndex: 50 }}>
      <div style={{ width: "100%", maxWidth: 480, background: "#ffffff", borderRadius: 24, padding: 24 }}>
        <h3>Delete Agent?</h3>
        <p>Mark <strong>{agent.name}</strong> as deleted and disabled. The record will be preserved for history.</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
          <button onClick={onClose} style={{ padding: "12px 18px", borderRadius: 12, border: "1px solid #d1d5db", background: "#f8fafc", cursor: "pointer" }}>
            Cancel
          </button>
          <button onClick={onConfirm} style={{ padding: "12px 18px", borderRadius: 12, border: "none", background: "#ef4444", color: "#fff", cursor: "pointer" }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
