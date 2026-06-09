function SummaryCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        borderTop: `4px solid ${color}`,
      }}
    >
      <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>{title}</p>
      <h2 style={{ marginTop: "10px", marginBottom: 0, color: "#111827" }}>
        {value}
      </h2>
    </div>
  );
}

export default SummaryCard;