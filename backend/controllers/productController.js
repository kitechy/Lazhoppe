const Product = require("../models/Product");
const Store = require("../models/Store");

// Customer: Get all active products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).populate(
      "store",
      "storeName",
    );

    res.json(products);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// Customer: Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "store",
      "storeName address phone description latitude longitude logo banner isActive",
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (e) {
    console.error("[ERROR] getProductById failed:", e);
    res.status(500).json({
      message: e.message,
    });
  }
};

// Customer: Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
      isActive: true,
    }).populate("store", "storeName");

    res.json(products);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// Store Owner: Get my products
exports.getMyProducts = async (req, res) => {
  try {
    const store = await Store.findOne({
      owner: req.user.id,
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const products = await Product.find({
      store: store._id,
    }).sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// Store Owner: Create product
exports.createProduct = async (req, res) => {
  try {
    const store = await Store.findOne({
      owner: req.user.id,
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const product = await Product.create({
      store: store._id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
    });

    res.status(201).json(product);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// Store Owner: Update product
exports.updateProduct = async (req, res) => {
  try {
    const store = await Store.findOne({
      owner: req.user.id,
    });

    const product = await Product.findOne({
      _id: req.params.id,
      store: store._id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.category = req.body.category;
    product.imageUrl = req.body.imageUrl;
    product.isActive = req.body.isActive;

    await product.save();

    res.json(product);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// Store Owner: Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const store = await Store.findOne({
      owner: req.user.id,
    });

    const product = await Product.findOne({
      _id: req.params.id,
      store: store._id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

exports.toggleProductStatus = async (req, res) => {
  try {
    const store = await Store.findOne({
      owner: req.user.id,
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const product = await Product.findOne({
      _id: req.params.id,
      store: store._id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.isActive = !product.isActive;

    await product.save();

    res.json({
      message: `Product ${
        product.isActive ? "activated" : "deactivated"
      } successfully.`,
      product,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded.",
      });
    }

    res.json({
      imageUrl: `/uploads/products/${req.file.filename}`,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};
