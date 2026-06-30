const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "Profile retrieved successfully",
    user: req.user,
  });
});

router.get(
  "/customer",
  authenticate,
  authorize("customer"),
  (req, res) => {
    res.json({
      message: "Welcome Customer!",
      user: req.user,
    });
  }
);

router.get(
  "/store-owner",
  authenticate,
  authorize("store_owner"),
  (req, res) => {
    res.json({
      message: "Welcome Store Owner!",
      user: req.user,
    });
  }
);

router.get(
  "/admin",
  authenticate,
  authorize("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin!",
      user: req.user,
    });
  }
);

module.exports = router;
