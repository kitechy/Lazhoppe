const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};
