const Review = require("../models/Review");
const Order = require("../models/Order");

exports.createReview = async (req, res) => {
  try {
    const { product, order, rating, comment } = req.body;

    const existing = await Review.findOne({
      customer: req.user.id,
      product,
      order,
    });

    if (existing) {
      return res.status(400).json({
        message: "You already reviewed this product.",
      });
    }

    const orderExists = await Order.findOne({
      _id: order,
      customer: req.user.id,
      status: "Delivered",
    });

    if (!orderExists) {
      return res.status(400).json({
        message: "You can only review delivered orders.",
      });
    }

    const purchased = orderExists.items.some(
      (item) => item.product.toString() === product,
    );

    if (!purchased) {
      return res.status(400).json({
        message: "Product not found in this order.",
      });
    }

    const review = await Review.create({
      customer: req.user.id,
      product,
      order,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create review.",
    });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.id,
    })
      .populate("customer", "firstName lastName")
      .sort({
        createdAt: -1,
      });

    const total = reviews.length;

    const average =
      total === 0 ? 0 : reviews.reduce((sum, r) => sum + r.rating, 0) / total;

    res.json({
      averageRating: average,
      totalReviews: total,
      reviews,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load reviews.",
    });
  }
};

exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      customer: req.user.id,
    })
      .populate("product", "name imageUrl")
      .sort({
        createdAt: -1,
      });

    res.json(reviews);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load reviews.",
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      customer: req.user.id,
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found.",
      });
    }

    await review.deleteOne();

    res.json({
      message: "Review deleted.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to delete review.",
    });
  }
};
