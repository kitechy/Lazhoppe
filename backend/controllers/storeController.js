const Store = require("../models/Store");
const Product = require("../models/Product");

// Create Store
exports.createStore = async (req, res) => {
  try {
    const { storeName, description, address, latitude, longitude, phone } =
      req.body;

    // Check if this user already owns a store
    const existingStore = await Store.findOne({
      owner: req.user.id,
    });

    if (req.user.role !== "store-owner") {
      return res.status(403).json({
        message: "Only store owners can create a store.",
      });
    }

    if (existingStore) {
      return res.status(400).json({
        message: "You already own a store.",
      });
    }

    const store = await Store.create({
      owner: req.user.id,
      storeName,
      description,
      address,
      latitude,
      longitude,
      phone,
    });

    res.status(201).json({
      message: "Store created successfully",
      store,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create store",
    });
  }
};

exports.getMyStore = async (req, res) => {
  try {
    const store = await Store.findOne({
      owner: req.user.id,
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found.",
      });
    }

    res.json(store);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load store.",
    });
  }
};

exports.updateStore = async (req, res) => {
  try {
    const store = await Store.findOne({
      owner: req.user.id,
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found.",
      });
    }

    if (req.body.storeName !== undefined) {
      store.storeName = req.body.storeName;
    }

    if (req.body.description !== undefined) {
      store.description = req.body.description;
    }

    if (req.body.address !== undefined) {
      store.address = req.body.address;
    }

    if (req.body.phone !== undefined) {
      store.phone = req.body.phone;
    }

    if (req.body.latitude !== undefined) {
      store.latitude = req.body.latitude;
    }

    if (req.body.longitude !== undefined) {
      store.longitude = req.body.longitude;
    }

    if (req.body.logo !== undefined) {
      store.logo = req.body.logo;
    }

    if (req.body.banner !== undefined) {
      store.banner = req.body.banner;
    }

    await store.save();

    res.json({
      message: "Store updated successfully.",
      store,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update store.",
    });
  }
};

exports.getDashboard = async (req, res) => {
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

    const totalProducts = products.length;
    const activeProducts = products.filter((p) => p.isActive).length;
    const inactiveProducts = products.filter((p) => !p.isActive).length;

    res.json({
      store,
      stats: {
        totalProducts,
        activeProducts,
        inactiveProducts,
      },
      recentProducts: products.slice(0, 5),
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load dashboard.",
    });
  }
};

// =======================================
// ADMIN - GET ALL STORES
// =======================================

exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.find()
      .populate("owner", "firstName lastName email")
      .populate("allowedCategories", "name")
      .sort({ createdAt: -1 });

    res.json(stores);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load stores.",
    });
  }
};

// =======================================
// ADMIN - ASSIGN CATEGORIES
// =======================================

exports.assignCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { categories } = req.body;

    const store = await Store.findById(id);

    if (!store) {
      return res.status(404).json({
        message: "Store not found.",
      });
    }

    store.allowedCategories = categories;

    await store.save();

    const updatedStore = await Store.findById(id)
      .populate("owner", "firstName lastName")
      .populate("allowedCategories", "name");

    res.json({
      message: "Categories assigned successfully.",
      store: updatedStore,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to assign categories.",
    });
  }
};

// =======================================
// STORE OWNER - GET MY ALLOWED CATEGORIES
// =======================================

exports.getMyCategories = async (req, res) => {
  try {
    const store = await Store.findOne({
      owner: req.user.id,
    }).populate("allowedCategories");

    if (!store) {
      return res.status(404).json({
        message: "Store not found.",
      });
    }

    res.json(store.allowedCategories);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load categories.",
    });
  }
};
