const StoreApplication = require("../models/StoreApplication");
const User = require("../models/User");
const Store = require("../models/Store");

// Submit application
exports.submitApplication = async (req, res) => {
  try {
    const existing = await StoreApplication.findOne({
      user: req.user.id,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({
        message: "You already have an application",
      });
    }

    const application = await StoreApplication.create({
      user: req.user.id,
      storeName: req.body.storeName,
      description: req.body.description,
      address: req.body.address,
      phone: req.body.phone,
    });

    res.status(201).json(application);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to submit application",
    });
  }
};

// Admin: Get all applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await StoreApplication.find()
      .populate("user", "firstName lastName email")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load applications",
    });
  }
};

// Admin: Get one application
exports.getApplicationById = async (req, res) => {
  try {
    const application = await StoreApplication.findById(req.params.id).populate(
      "user",
      "firstName lastName email",
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json(application);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load application",
    });
  }
};

// Admin: Approve application
exports.approveApplication = async (req, res) => {
  try {
    const application = await StoreApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (application.status === "approved") {
      return res.status(400).json({
        message: "Application has already been approved.",
      });
    }

    if (application.status === "rejected") {
      return res.status(400).json({
        message: "Rejected applications cannot be approved.",
      });
    }

    const existingStore = await Store.findOne({
      owner: application.user,
    });

    if (existingStore) {
      return res.status(400).json({
        message: "This user already owns a store.",
      });
    }

    application.status = "approved";
    await application.save();

    await User.findByIdAndUpdate(application.user, {
      role: "store-owner",
    });

    await Store.create({
      owner: application.user,
      storeName: application.storeName,
      description: application.description,
      address: application.address,
      phone: application.phone,
    });

    res.json({
      message: "Application approved",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to approve application",
    });
  }
};

// Admin: Reject application
exports.rejectApplication = async (req, res) => {
  try {
    const application = await StoreApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    const { remarks = "" } = req.body || {};

    application.status = "rejected";
    application.remarks = remarks;

    await application.save();

    res.json({
      message: "Application rejected",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to reject application",
    });
  }
};
