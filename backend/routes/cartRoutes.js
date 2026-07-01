const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const authenticate = require("../middleware/authMiddleware");

router.get("/", authenticate, cartController.getCart);

router.post("/", authenticate, cartController.addToCart);

router.put("/:id", authenticate, cartController.updateQuantity);

router.delete("/:id", authenticate, cartController.removeFromCart);

router.delete(
  "/:id",
  authenticate,
  (req, res, next) => {
    console.log("DELETE route hit:", req.params.id);
    next();
  },
  cartController.removeFromCart,
);

module.exports = router;
