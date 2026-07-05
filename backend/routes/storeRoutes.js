const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const storeController = require("../controllers/storeController");

router.post("/", authenticate, storeController.createStore);

router.get("/me", authenticate, storeController.getMyStore);

router.put("/me", authenticate, storeController.updateStore);

module.exports = router;
