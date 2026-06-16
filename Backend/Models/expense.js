import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Expense =
  mongoose.models.Expense ||
  mongoose.model(
    "Expense",
    expenseSchema
  );

export default Expense;