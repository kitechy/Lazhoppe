const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const adminController = require("../controllers/adminController");

router.get(
  "/dashboard",
  authenticate,
  adminOnly,
  adminController.getDashboardStats,
);

module.exports = router;
