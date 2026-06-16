import express from "express";

import {
  createHabit,
  getHabits,
  deleteHabit,
  updateHabit,
  completeHabit,
} from "../Controllers/HabitController.js";

const router = express.Router();

router.get("/", getHabits);

router.post("/", createHabit);

router.put("/:id", updateHabit);

router.delete("/:id", deleteHabit);

router.patch("/:id/complete", completeHabit);

export default router;