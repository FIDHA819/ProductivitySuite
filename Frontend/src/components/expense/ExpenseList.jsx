import ExpenseItem from "./ExpenseItem";


function ExpenseList({ expenses }) {
 
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "18px", color: "#111827" }}>
        Recent Expenses
      </h3>

      <div style={{ display: "grid", gap: "14px" }}>
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;