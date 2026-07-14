const Product = require("../models/Product");
const Store = require("../models/Store");

// =======================================
// CUSTOMER
// =======================================

// Get all active products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true,
    })
      .populate("store", "storeName")
      .populate("category", "name");

    res.json(products);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate(
        "store",
        "storeName address phone description latitude longitude logo banner isActive",
      )
      .populate("category", "name");

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

// Get products by category (Category ID)
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
      isActive: true,
    })
      .populate("store", "storeName")
      .populate("category", "name");

    res.json(products);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// =======================================
// STORE OWNER
// =======================================

// Get my products
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
    })
      .populate("category", "name")
      .sort({
        createdAt: -1,
      });

    res.json(products);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// Create product
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

    if (
      !store.allowedCategories ||
      !store.allowedCategories.some((id) => id.toString() === req.body.category)
    ) {
      return res.status(403).json({
        message: "This category is not assigned to your store.",
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

    const populatedProduct = await Product.findById(product._id)
      .populate("store", "storeName")
      .populate("category", "name");

    res.status(201).json(populatedProduct);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const store = await Store.findOne({
      owner: req.user.id,
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    if (
      !store.allowedCategories ||
      !store.allowedCategories.some((id) => id.toString() === req.body.category)
    ) {
      return res.status(403).json({
        message: "This category is not assigned to your store.",
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

    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.category = req.body.category;
    product.imageUrl = req.body.imageUrl;

    // Only update if the frontend actually sends it
    if (req.body.isActive !== undefined) {
      product.isActive = req.body.isActive;
    }

    await product.save();

    const populatedProduct = await Product.findById(product._id)
      .populate("store", "storeName")
      .populate("category", "name");

    res.json(populatedProduct);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// Delete product
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

// Toggle product status
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

// Upload image
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
