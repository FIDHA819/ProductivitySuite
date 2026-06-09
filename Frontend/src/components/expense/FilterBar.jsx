const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  outline: "none",
  background: "#fff",
};

function FilterBar() {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "18px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        marginBottom: "20px",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "16px", color: "#111827" }}>
        Filter Expenses
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >
        <select style={inputStyle}>
          <option>All Categories</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Health</option>
          <option>Other</option>
        </select>

        <input type="month" style={inputStyle} />

        <select style={inputStyle}>
          <option>Latest First</option>
          <option>Oldest First</option>
          <option>Amount High to Low</option>
          <option>Amount Low to High</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;