const express = require("express");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const {
  protect,
  allowRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/stats",
  protect,
  allowRoles("practitioner", "admin"),
  getDashboardStats
);

module.exports = router;