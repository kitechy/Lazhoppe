const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");

// ================= CUSTOMER =================

router.post("/", authenticate, orderController.placeOrder);

router.get("/my", authenticate, orderController.getMyOrders);

// ================= STORE OWNER =================

router.get("/store", authenticate, orderController.getStoreOrders);

router.patch("/:id/status", authenticate, orderController.updateStatus);

// ================= COURIER =================

// ================= COURIER =================

router.get("/available", authenticate, orderController.getAvailableOrders);

router.get("/courier", authenticate, orderController.getCourierOrders);

router.patch("/:id/accept", authenticate, orderController.acceptDelivery);

router.patch(
  "/:id/delivery-status",
  authenticate,
  orderController.updateDeliveryStatus,
);

// ================= ORDER DETAILS =================

router.get("/:id", authenticate, orderController.getOrder);

module.exports = router;
