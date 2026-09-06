const express = require("express");

const {
  getDueReminders,
} = require("../controllers/reminderController");

const router = express.Router();

router.get("/due", getDueReminders);

module.exports = router;