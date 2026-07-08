const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const messageController = require("../controllers/messageController");

router.post("/start", authenticate, messageController.startConversation);

router.get("/conversations", authenticate, messageController.getConversations);

router.get("/:id", authenticate, messageController.getMessages);

router.post("/:id", authenticate, messageController.sendMessage);

module.exports = router;
