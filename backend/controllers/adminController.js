const bcrypt = require("bcryptjs");
const User = require("../models/user");

// GET all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch users",
    });
  }
};


// CREATE user
const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "practitioner",
      isActive: true,
    });

    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create user",
    });
  }
};


// UPDATE user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      role,
      password,
    } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (email !== undefined) {
      user.email = email;
    }

    if (role !== undefined) {
      user.role = role;
    }

    if (password !== undefined) {
      user.password =
        await bcrypt.hash(password, 10);
    }

    await user.save();

    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update user",
    });
  }
};


// DEACTIVATE user
const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    user.isActive = false;

    await user.save();

    res.status(200).json({
      status: "success",
      message: "User deactivated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to deactivate user",
    });
  }
};


module.exports = {
  getUsers,
  createUser,
  updateUser,
  deactivateUser,
};