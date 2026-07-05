const User = require("../models/User");
const Product = require("../models/Product");
const StoreApplication = require("../models/StoreApplication");
// We'll add Order later

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
