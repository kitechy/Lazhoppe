const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const adminController = require("../controllers/adminController");

router.get("/", authenticate, adminOnly, adminController.getCategories);

module.exports = router;
