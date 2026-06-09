import axios from "axios"

const smallEditButton = {
  background: "#e0f2fe",
  color: "#0369a1",
  border: "none",
  borderRadius: "8px",
  padding: "8px 12px",
  cursor: "pointer",
};

const smallDeleteButton = {
  background: "#fee2e2",
  color: "#b91c1c",
  border: "none",
  borderRadius: "8px",
  padding: "8px 12px",
  cursor: "pointer",
};

function ExpenseItem({ expense }) {
   const handleDelete = async () => {
  try {
    await axios.delete(
      `http://localhost:5000/api/expenses/${expense._id}`
    );

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div
      style={{
        padding: "18px",
        border: "1px solid #e5e7eb",
        borderRadius: "14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <div>
        <h4 style={{ margin: 0, color: "#111827" }}>{expense.title}</h4>
        <p style={{ margin: "6px 0", color: "#6b7280", fontSize: "14px" }}>
          {expense.category} • {expense.date}
        </p>
        <p style={{ margin: 0, color: "#9ca3af", fontSize: "13px" }}>
          {expense.notes}
        </p>
      </div>

      <div style={{ textAlign: "right" }}>
        <h4 style={{ margin: 0, color: "#dc2626" }}>₹{expense.amount}</h4>
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <button style={smallEditButton}>Edit</button>
      <button
  style={smallDeleteButton}
  onClick={handleDelete}
>
  Delete
</button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItem;