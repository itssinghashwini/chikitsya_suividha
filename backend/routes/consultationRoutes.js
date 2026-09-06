const express = require("express");

const {
  createConsultation,
  getTodayQueue,
  updateConsultation,
  confirmConsultation,
} = require("../controllers/consultationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/queue", protect, getTodayQueue);

router.post("/", protect, createConsultation);

router.patch("/:id", protect, updateConsultation);

router.post(
  "/:id/confirm",
  protect,
  confirmConsultation
);

module.exports = router;