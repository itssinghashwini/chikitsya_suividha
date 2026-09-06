const express = require("express");

const {
  getUsers,
  createUser,
  updateUser,
  deactivateUser,
} = require("../controllers/adminController");

const {
  protect,
  allowRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.use(allowRoles("admin"));

router.get("/users", getUsers);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.patch(
  "/users/:id/deactivate",
  deactivateUser
);

module.exports = router;