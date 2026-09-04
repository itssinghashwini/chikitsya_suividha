const express = require("express");

const {
  createSession,
  updateSession,
  completeSession,
  generateSummary,
} = require("../controllers/sessionController");

const router = express.Router();

router.post("/", createSession);

router.patch("/:id", updateSession);
router.post("/:id/complete", completeSession);
router.post("/:id/generate-summary", generateSummary);
module.exports = router;