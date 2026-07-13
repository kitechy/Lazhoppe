const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const adminController = require("../controllers/adminController");

// ================= Dashboard =================

router.get(
  "/dashboard",
  authenticate,
  adminOnly,
  adminController.getDashboardStats,
);

// ================= Store Categories =================

router.put(
  "/stores/:id/categories",
  authenticate,
  adminOnly,
  adminController.assignStoreCategories,
);

module.exports = router;
