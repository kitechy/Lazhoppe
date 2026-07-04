const express = require("express");
const router = express.Router();

const storeApplicationController = require("../controllers/storeApplicationController");
const authenticate = require("../middleware/authMiddleware");

// Customer
router.post("/", authenticate, storeApplicationController.submitApplication);

// Admin
router.get("/", authenticate, storeApplicationController.getApplications);

router.get("/:id", authenticate, storeApplicationController.getApplicationById);

router.put(
  "/:id/approve",
  authenticate,
  storeApplicationController.approveApplication,
);

router.put(
  "/:id/reject",
  authenticate,
  storeApplicationController.rejectApplication,
);

module.exports = router;
