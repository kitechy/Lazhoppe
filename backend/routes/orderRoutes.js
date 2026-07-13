const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const orderController = require("../controllers/orderController");

router.post("/", authenticate, orderController.placeOrder);

router.get("/my", authenticate, orderController.getMyOrders);

router.get("/store", authenticate, orderController.getStoreOrders);

router.get("/:id", authenticate, orderController.getOrder);

router.patch("/:id/status", authenticate, orderController.updateStatus);

module.exports = router;
