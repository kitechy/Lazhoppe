const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Store = require("../models/Store");

exports.placeOrder = async (req, res) => {
  try {
    const { shipping, paymentMethod } = req.body;

    const cartItems = await Cart.find({
      user: req.user.id,
    }).populate("product");

    if (!cartItems.length) {
      return res.status(400).json({
        message: "Cart is empty.",
      });
    }

    const storeId = cartItems[0].product.store;

    let subtotal = 0;
    const items = [];

    for (const cartItem of cartItems) {
      const product = await Product.findById(cartItem.product._id);

      if (!product) {
        return res.status(404).json({
          message: "Product not found.",
        });
      }

      if (!product.isActive) {
        return res.status(400).json({
          message: `${product.name} is unavailable.`,
        });
      }

      if (product.stock < cartItem.quantity) {
        return res.status(400).json({
          message: `${product.name} is out of stock.`,
        });
      }

      subtotal += product.price * cartItem.quantity;

      items.push({
        product: product._id,
        quantity: cartItem.quantity,
        price: product.price,
      });
    }

    const deliveryFee = 50;
    const total = subtotal + deliveryFee;

    const order = await Order.create({
      customer: req.user.id,
      store: storeId,
      items,
      shipping,
      paymentMethod,
      subtotal,
      deliveryFee,
      total,
    });

    for (const cartItem of cartItems) {
      await Product.findByIdAndUpdate(cartItem.product._id, {
        $inc: {
          stock: -cartItem.quantity,
        },
      });
    }

    await Cart.deleteMany({
      user: req.user.id,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to place order.",
    });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user.id,
    })
      .populate("store")
      .populate("courier", "firstName lastName")
      .populate("items.product")
      .sort({
        createdAt: -1,
      });

    res.json(orders);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load orders.",
    });
  }
};

exports.getStoreOrders = async (req, res) => {
  try {
    const store = await Store.findOne({
      owner: req.user.id,
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found.",
      });
    }

    const orders = await Order.find({
      store: store._id,
    })
      .populate("customer", "firstName lastName email")
      .populate("courier", "firstName lastName")
      .populate("items.product")
      .sort({
        createdAt: -1,
      });

    res.json(orders);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load store orders.",
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    order.status = req.body.status;

    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update order.",
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer")
      .populate("store")
      .populate("courier")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.json(order);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load order.",
    });
  }
};

// =======================================
// COURIER
// =======================================

exports.getAvailableOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      status: "Ready for Pickup",
      courier: null,
    })
      .populate("store", "storeName address phone")
      .populate("customer", "firstName lastName")
      .populate("items.product", "name imageUrl");

    res.json(orders);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load available orders.",
    });
  }
};

exports.acceptDelivery = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    if (order.courier) {
      return res.status(400).json({
        message: "Order already accepted.",
      });
    }

    order.courier = req.user.id;
    order.status = "Picked Up";
    order.pickedUpAt = new Date();

    await order.save();

    res.json({
      message: "Delivery accepted successfully.",
      order,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to accept delivery.",
    });
  }
};

exports.getCourierOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      courier: req.user.id,
    })
      .populate("store", "storeName address phone")
      .populate("customer", "firstName lastName phone")
      .populate("items.product", "name imageUrl")
      .sort({
        createdAt: -1,
      });

    res.json(orders);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load courier orders.",
    });
  }
};

exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["Picked Up", "On the Way", "Delivered"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid delivery status.",
      });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      courier: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    order.status = status;

    if (status === "Picked Up") {
      order.pickedUpAt = new Date();
    }

    if (status === "Delivered") {
      order.deliveredAt = new Date();
    }

    await order.save();

    res.json({
      message: "Delivery status updated.",
      order,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update delivery status.",
    });
  }
};
