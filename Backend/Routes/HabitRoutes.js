const express = require("express");

const router = express.Router();

const {
  createHabit,
  getHabits,
  deleteHabit,
  updateHabit,
  completeHabit
} = require("../controllers/habitController");

router.get("/",getHabits);

router.post("/",createHabit);

router.put("/:id",updateHabit);

router.delete("/:id",deleteHabit);

router.patch("/:id/complete",completeHabit);

module.exports = router;