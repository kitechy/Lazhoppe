const User = require("../models/User");
const Product = require("../models/Product");
const Store = require("../models/Store");
const StoreApplication = require("../models/StoreApplication");
const Category = require("../models/Category");

// ======================================
// Dashboard
// ======================================

exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      customers,
      storeOwners,
      admins,
      products,
      pendingApplications,
      activeAccounts,
      inactiveAccounts,
    ] = await Promise.all([
      User.countDocuments(),

      User.countDocuments({
        role: "customer",
      }),

      User.countDocuments({
        role: "store-owner",
      }),

      User.countDocuments({
        role: "admin",
      }),

      Product.countDocuments(),

      StoreApplication.countDocuments({
        status: "pending",
      }),

      User.countDocuments({
        isActive: true,
      }),

      User.countDocuments({
        isActive: false,
      }),
    ]);

    res.json({
      totalUsers,
      customers,
      storeOwners,
      admins,
      products,
      pendingApplications,
      activeAccounts,
      inactiveAccounts,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};

// ======================================
// Assign Categories to Store
// ======================================

exports.assignStoreCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { categories } = req.body;

    const store = await Store.findById(id);

    if (!store) {
      return res.status(404).json({
        message: "Store not found.",
      });
    }

    const existingCategories = await Category.find({
      _id: { $in: categories },
    });

    if (existingCategories.length !== categories.length) {
      return res.status(400).json({
        message: "One or more categories are invalid.",
      });
    }

    store.allowedCategories = categories;

    await store.save();

    res.json({
      message: "Categories assigned successfully.",
      store,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to assign categories.",
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      name: 1,
    });

    res.json(categories);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load categories.",
    });
  }
};
