import { useState, useEffect } from "react";
import axios from "axios";

import SummaryCard from "../../components/expense/SummaryCard";
import ExpenseForm from "../../components/expense/ExpenseForm";
import FilterBar from "../../components/expense/FilterBar";
import ExpenseList from "../../components/expense/ExpenseList";

function ExpensePage({goBack}) {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/expenses"
      );

      setExpenses(response.data.data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Dynamic Summary Values

  const totalSpent = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlySpent = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);

      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .reduce(
      (total, expense) => total + Number(expense.amount),
      0
    );

  const totalEntries = expenses.length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "32px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <header style={{ marginBottom: "28px" }}>
          <h1
            style={{
              margin: 0,
              color: "#111827",
            }}
          >
            Expense Tracker
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#6b7280",
            }}
          >
            Manage your daily spending easily
          </p>
        </header>

        {/* Dynamic Summary Cards */}
<button onClick={goBack}>Back</button>
        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            marginBottom: "28px",
          }}
        >
          <SummaryCard
            title="Total Spent"
            value={`₹${totalSpent}`}
            color="#dc2626"
          />

          <SummaryCard
            title="This Month"
            value={`₹${monthlySpent}`}
            color="#2563eb"
          />

          <SummaryCard
            title="Entries"
            value={totalEntries}
            color="#059669"
          />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "340px 1fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <div>
            <ExpenseForm fetchExpenses={fetchExpenses} />
          </div>

          <div>
            <FilterBar expenses={expenses} />
            <ExpenseList
              expenses={expenses}
              fetchExpenses={fetchExpenses}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default ExpensePage;