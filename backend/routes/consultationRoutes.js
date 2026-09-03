const express = require("express");

const {
  createConsultation,
  getTodayQueue,
} = require("../controllers/consultationController");

const {
  protect,
  allowRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  allowRoles("practitioner", "admin"),
  createConsultation
);

router.get(
  "/queue",
  protect,
  allowRoles("practitioner", "admin"),
  getTodayQueue
);

module.exports = router;