import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import AgentToolbar from "./components/AgentToolbar";
import AgentTable from "./components/AgentTable";
import AgentForm from "./components/AgentForm";
import DeleteDialog from "./components/DeleteDialog";

export type Agent = {
  id: number;
  name: string;
  description?: string;
  category: string;
  website: string;
  start_url: string;
  browser: string;
  schedule?: string;
  timeout: number;
  retry_count: number;
  enabled: boolean;
  deleted: boolean;
  created_at: string;
  updated_at: string;
};

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [browserFilter, setBrowserFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const fetchAgents = async () => {
    try {
      const response = await api.get("/agents", { params: { search: query, limit: pageSize } });
      let results = response.data as Agent[];
      if (statusFilter !== "all") {
        const enabled = statusFilter === "active";
        results = results.filter((agent) => agent.enabled === enabled);
      }
      if (browserFilter) {
        results = results.filter((agent) => agent.browser.toLowerCase().includes(browserFilter.toLowerCase()));
      }
      if (categoryFilter) {
        results = results.filter((agent) => agent.category.toLowerCase().includes(categoryFilter.toLowerCase()));
      }
      setAgents(results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, [query, statusFilter, browserFilter, categoryFilter, pageSize]);

  const openCreate = () => {
    setSelectedAgent(null);
    setIsFormOpen(true);
  };

  const handleEdit = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsFormOpen(true);
  };

  const handleDelete = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsDeleteOpen(true);
  };

  const handleClone = async (agent: Agent) => {
    try {
      await api.post(`/agents/${agent.id}/clone`);
      fetchAgents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (agent: Agent) => {
    try {
      await api.patch(`/agents/${agent.id}/${agent.enabled ? "disable" : "enable"}`);
      fetchAgents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async (data: Partial<Agent>) => {
    try {
      if (selectedAgent) {
        await api.put(`/agents/${selectedAgent.id}`, data);
      } else {
        await api.post("/agents", data);
      }
      setIsFormOpen(false);
      fetchAgents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedAgent) return;
    try {
      await api.delete(`/agents/${selectedAgent.id}`);
      setIsDeleteOpen(false);
      fetchAgents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0 }}>Agent Management</h2>
          <p style={{ margin: "8px 0 0", color: "#6b7280" }}>Create, clone, edit, disable, and search agents.</p>
        </div>
        <button
          onClick={openCreate}
          style={{ padding: "12px 18px", borderRadius: 12, border: "none", background: "#2563eb", color: "#fff", cursor: "pointer" }}
        >
          Create Agent
        </button>
      </div>

      <AgentToolbar
        query={query}
        onQueryChange={setQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        browserFilter={browserFilter}
        onBrowserFilterChange={setBrowserFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />

      <AgentTable
        agents={agents}
        onEdit={handleEdit}
        onClone={handleClone}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />

      {isFormOpen && (
        <AgentForm
          agent={selectedAgent}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {isDeleteOpen && selectedAgent && (
        <DeleteDialog
          agent={selectedAgent}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
