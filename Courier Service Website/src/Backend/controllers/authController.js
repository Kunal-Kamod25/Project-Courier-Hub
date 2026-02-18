const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ REGISTER USER — POST /api/auth/register
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Basic validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user (hash handled automatically in model)
    const newUser = new User({
      fullName,
      email,
      password,
      role: "user",
    });

    await newUser.save(); // model pre-save hook hashes password

    // Remove password before response
    const safeUser = newUser.toObject();
    delete safeUser.password;

    res.status(201).json({
      msg: "Registered successfully",
      user: safeUser,
    });
  } catch (err) {
    console.error("❌ Error in registerUser:", err);
    res.status(500).json({ msg: "Server error during registration" });
  }
};

// ✅ LOGIN USER — POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Block check
    if (user.isBlocked) {
      return res.status(403).json({
        msg: "Your account has been blocked by admin. Contact support.",
      });
    }

    // Compare passwords
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "yourSecretKey",
      { expiresIn: "7d" }
    );

    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(200).json({
      msg: "Login successful",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("❌ Error in loginUser:", err);
    res.status(500).json({ msg: "Server error during login" });
  }
};
