import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import habitRoutes from "./Routes/HabitRoutes.js";
import expenseRoutes from "./Routes/expenserouter.js";
import urlRoutes from "./Routes/UrlRoutes.js";
import invoiceRoutes from "./Routes/InvoiceRoutes.js";
import ContactRoutes from "./Routes/ContactRoutes.js";

dotenv.config();





const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.use("/api/expenses", expenseRoutes);
app.use("/api/invoices", invoiceRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});
app.use("/api/habits",habitRoutes);
app.use("/api/url", urlRoutes);
app.use("/api/contacts", ContactRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});