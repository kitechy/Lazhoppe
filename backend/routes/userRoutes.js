const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/", authenticate, adminOnly, userController.getUsers);
router.patch(
  "/:id/status",
  authenticate,
  adminOnly,
  userController.updateStatus,
);

module.exports = router;
