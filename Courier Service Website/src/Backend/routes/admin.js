// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  blockOrUnblockUser,
  deleteUser,
  getAllBookings,
  updateBookingStatus
} = require("../controllers/adminController");

// 🧑‍💻 Admin login route
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    if (user.isBlocked)
      return res.status(403).json({ msg: "Your account is blocked." });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "yourSecretKey",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// 🧩 Admin data routes
router.get("/users", getAllUsers);
router.put("/users/:id/block", blockOrUnblockUser);
router.delete("/users/:id", deleteUser);
router.get("/bookings", getAllBookings);
router.put("/bookings/:id", updateBookingStatus);

module.exports = router;