const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const storeController = require("../controllers/storeController");

// =======================================
// STORE OWNER
// =======================================

router.post("/", authenticate, storeController.createStore);

router.get("/me", authenticate, storeController.getMyStore);

router.put("/me", authenticate, storeController.updateStore);

router.get("/dashboard", authenticate, storeController.getDashboard);

router.get("/my/categories", authenticate, storeController.getMyCategories);

// =======================================
// ADMIN
// =======================================

router.get("/", authenticate, adminOnly, storeController.getAllStores);

router.put(
  "/:id/categories",
  authenticate,
  adminOnly,
  storeController.assignCategories,
);

module.exports = router;
