import React from "react";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  browserFilter: string;
  onBrowserFilterChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  pageSize: number;
  onPageSizeChange: (value: number) => void;
};

export default function AgentToolbar({
  query,
  onQueryChange,
  statusFilter,
  onStatusFilterChange,
  browserFilter,
  onBrowserFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  pageSize,
  onPageSizeChange,
}: Props) {
  return (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr auto", marginBottom: 24 }}>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr 1fr" }}>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search name, website, category"
          style={{ padding: 12, borderRadius: 12, border: "1px solid #d1d5db" }}
        />
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          style={{ padding: 12, borderRadius: 12, border: "1px solid #d1d5db" }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="disabled">Disabled</option>
        </select>
        <input
          value={browserFilter}
          onChange={(e) => onBrowserFilterChange(e.target.value)}
          placeholder="Browser"
          style={{ padding: 12, borderRadius: 12, border: "1px solid #d1d5db" }}
        />
      </div>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr auto" }}>
        <input
          value={categoryFilter}
          onChange={(e) => onCategoryFilterChange(e.target.value)}
          placeholder="Category"
          style={{ padding: 12, borderRadius: 12, border: "1px solid #d1d5db" }}
        />
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          style={{ padding: 12, borderRadius: 12, border: "1px solid #d1d5db" }}
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>{size} / page</option>
          ))}
        </select>
      </div>
    </div>
  );
}
