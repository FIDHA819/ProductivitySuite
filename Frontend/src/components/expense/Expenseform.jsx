import { useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontSize: "14px",
  color: "#374151",
  fontWeight: 500,
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  outline: "none",
  background: "#fff",
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "90px",
  resize: "vertical",
};

const buttonStyle = {
  width: "100%",
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "10px",
  padding: "12px 16px",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
};




function ExpenseForm() {
    const [title,setTitle]=useState("")
    const [amount,setAmount]=useState("")
    const [category,setCategory]=useState("")
    const [date,setDate]=useState("")
    const [notes,setNotes]=useState("")

    const handleSubmit = async () => {
  try {
    await axios.post(
      "http://localhost:5000/api/expenses",
      {
        title,
        amount,
        category,
        date,
        notes,
      }
    );

    toast.success("expense saved successfully")

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
    setNotes("");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ marginBottom: "20px", color: "#111827" }}>Add New Expense</h3>

      <div style={{ display: "grid", gap: "14px" }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input type="text" placeholder="Enter expense title" style={inputStyle}  value={title} onChange={(e)=>setTitle(e.target.value)}/>
        </div>

        <div>
          <label style={labelStyle} >Amount</label>
          <input type="number" placeholder="Enter amount" style={inputStyle}  value={amount} onChange={(e)=>setAmount(e.target.value)}/>
        </div>

      <div>
  <label style={labelStyle}>Category</label>
  <select
    style={inputStyle}
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="">Select category</option>
    <option value="Food">Food</option>
    <option value="Travel">Travel</option>
    <option value="Shopping">Shopping</option>
    <option value="Bills">Bills</option>
    <option value="Health">Health</option>
    <option value="Other">Other</option>
  </select>
</div>

        <div>
          <label style={labelStyle}>Date</label>
          <input type="date" style={inputStyle} value={date} onChange={(e)=>setDate(e.target.value)} />
        </div>

        <div>
          <label style={labelStyle}>Notes</label>
          <textarea placeholder="Optional notes" style={textareaStyle} value={notes} onChange={(e)=>setNotes(e.target.value)}></textarea>
        </div>

      <button
  style={buttonStyle}
  onClick={handleSubmit}
>
  Save Expense
</button>
      </div>
    </div>
  );
}

export default ExpenseForm;