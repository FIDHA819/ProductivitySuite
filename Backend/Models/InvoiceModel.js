import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: String,

    clientName: {
      type: String,
      required: true,
    },

    clientEmail: {
      type: String,
      required: true,
    },

    projectDesc: {
      type: String,
      required: true,
    },

    hoursWorked: {
      type: Number,
      required: true,
    },

    hourlyRate: {
      type: Number,
      required: true,
    },

    tax: {
      type: Number,
      default: 0,
    },

    subtotal: Number,

    taxAmount: Number,

    total: {
      type: Number,
      required: true,
    },

    currency: String,

    companyLogo: String,

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Invoice",
  invoiceSchema
);