const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const reviewController = require("../controllers/reviewController");

router.post("/", authenticate, reviewController.createReview);

router.get("/my", authenticate, reviewController.getMyReviews);

router.get("/product/:id", reviewController.getProductReviews);

router.delete("/:id", authenticate, reviewController.deleteReview);

module.exports = router;
