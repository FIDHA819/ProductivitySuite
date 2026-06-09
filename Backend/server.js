const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const habitRoutes = require("./routes/HabitRoutes");


require("dotenv").config();

const expenseRoutes = require("./Routes/expenserouter");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});
app.use("/api/habits",habitRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});