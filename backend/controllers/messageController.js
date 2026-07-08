const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Store = require("../models/Store");

exports.startConversation = async (req, res) => {
  try {
    const { storeId } = req.body;

    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({
        message: "Store not found.",
      });
    }

    let conversation = await Conversation.findOne({
      customer: req.user.id,
      store: storeId,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        customer: req.user.id,
        store: storeId,
      });
    }

    res.status(200).json(conversation);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to start conversation.",
    });
  }
};

exports.getConversations = async (req, res) => {
  try {
    let conversations;

    if (req.user.role === "customer") {
      conversations = await Conversation.find({
        customer: req.user.id,
      })
        .populate("store", "storeName logo address phone")
        .sort({
          lastMessageAt: -1,
        });
    } else {
      const store = await Store.findOne({
        owner: req.user.id,
      });

      conversations = await Conversation.find({
        store: store._id,
      })
        .populate("customer", "firstName lastName email")
        .sort({
          lastMessageAt: -1,
        });
    }

    const result = await Promise.all(
      conversations.map(async (conversation) => {
        const unreadCount = await Message.countDocuments({
          conversation: conversation._id,
          sender: { $ne: req.user.id },
          isRead: false,
        });

        return {
          ...conversation.toObject(),
          unreadCount,
        };
      }),
    );

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load conversations.",
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id).populate(
      "store",
      "owner",
    );

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found.",
      });
    }

    const isCustomer = conversation.customer.toString() === req.user.id;

    const isStoreOwner = conversation.store.owner.toString() === req.user.id;

    if (!isCustomer && !isStoreOwner) {
      return res.status(403).json({
        message: "Unauthorized.",
      });
    }

    await Message.updateMany(
      {
        conversation: conversation._id,
        sender: { $ne: req.user.id },
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      },
    );

    const messages = await Message.find({
      conversation: conversation._id,
    })
      .populate("sender", "firstName lastName")
      .sort({
        createdAt: 1,
      });

    res.json(messages);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load messages.",
    });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id).populate(
      "store",
      "owner",
    );

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found.",
      });
    }

    const isCustomer = conversation.customer.toString() === req.user.id;

    const isStoreOwner = conversation.store.owner.toString() === req.user.id;

    if (!isCustomer && !isStoreOwner) {
      return res.status(403).json({
        message: "Unauthorized.",
      });
    }

    const message = await Message.create({
      conversation: conversation._id,
      sender: req.user.id,
      text: req.body.text,
    });

    conversation.lastMessage = req.body.text;
    conversation.lastMessageAt = new Date();

    await conversation.save();

    const populatedMessage = await Message.findById(message._id).populate(
      "sender",
      "firstName lastName",
    );

    res.status(201).json(populatedMessage);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to send message.",
    });
  }
};
