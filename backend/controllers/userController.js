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

exports.updateStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Prevent deactivating yourself
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        message: "You cannot deactivate your own account.",
      });
    }

    user.isActive = isActive;

    await user.save();

    res.json({
      message: "User status updated successfully",
      user,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};
