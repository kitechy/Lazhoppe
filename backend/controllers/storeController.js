const Store = require("../models/Store");

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

    const {
      storeName,
      description,
      address,
      phone,
      latitude,
      longitude,
      logo,
      banner,
    } = req.body;

    store.storeName = storeName;
    store.description = description;
    store.address = address;
    store.phone = phone;
    store.latitude = latitude;
    store.longitude = longitude;
    store.logo = logo;
    store.banner = banner;

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
