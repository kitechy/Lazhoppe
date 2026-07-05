const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadProductImage");

const authenticate = require("../middleware/authMiddleware");
const productController = require("../controllers/productController");

// Customer Routes
router.get("/", productController.getProducts);

router.get("/mine", authenticate, productController.getMyProducts);

router.get("/category/:category", productController.getProductsByCategory);

router.get("/:id", productController.getProductById);

// Store Owner Routes
router.post("/", authenticate, productController.createProduct);

router.post(
  "/upload",
  authenticate,
  upload.single("image"),
  productController.uploadImage,
);

router.put("/:id", authenticate, productController.updateProduct);

router.patch(
  "/:id/toggle-status",
  authenticate,
  productController.toggleProductStatus,
);

module.exports = router;
