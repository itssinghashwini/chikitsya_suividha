const express = require("express");

const {
  createPatient,
  getPatients,
  getPatientById,
} = require("../controllers/patientController");

const {
  protect,
  allowRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  allowRoles("practitioner", "admin"),
  createPatient
);

router.get(
  "/",
  protect,
  allowRoles("practitioner", "admin"),
  getPatients
);

router.get(
  "/:id",
  protect,
  allowRoles("practitioner", "admin"),
  getPatientById
);

module.exports = router;