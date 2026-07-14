const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // User comes from JWT middleware
    const userId = req.user.id;

    // Check if the product is already in the cart
    const existingItem = await Cart.findOne({
      user: userId,
      product: productId,
    });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();

      return res.json(existingItem);
    }

    const cartItem = await Cart.create({
      user: userId,
      product: productId,
      quantity: quantity || 1,
    });

    res.status(201).json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to add product to cart",
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user.id,
    }).populate("product");

    const invalidItems = cart.filter((item) => !item.product);

    if (invalidItems.length) {
      await Cart.deleteMany({
        _id: { $in: invalidItems.map((i) => i._id) },
      });
    }

    res.json(cart.filter((item) => item.product));
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load cart",
    });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update quantity",
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const deleted = await Cart.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    res.json({
      message: "Item removed from cart",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to remove item",
    });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({
      user: req.user.id,
    });

    res.json({
      message: "Cart cleared",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to clear cart",
    });
  }
};
