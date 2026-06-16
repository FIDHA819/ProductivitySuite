import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    category: {
      type: String,
      default: "General",
    },

    completedDates: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Habit =
  mongoose.models.Habit ||
  mongoose.model("Habit", habitSchema);

export default Habit;