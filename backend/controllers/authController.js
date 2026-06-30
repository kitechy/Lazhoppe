const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    res.status(200).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = {
  register,
};
