const User = require("../models/User");
const Booking = require("../models/booking");

/**
 * ✅ GET /api/admin/users
 * Get all users (Admin only)
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ success: false, msg: "Server error fetching users" });
  }
};

/**
 * ✅ PUT /api/admin/users/:id/block
 * Block or Unblock a user
 * Example body: { "isBlocked": true }
 */
exports.blockOrUnblockUser = async (req, res) => {
  try {
    const { isBlocked } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ success: false, msg: "User not found" });

    user.isBlocked = isBlocked;
    await user.save();

    res.status(200).json({
      success: true,
      msg: `User ${isBlocked ? "blocked" : "unblocked"} successfully`,
      user,
    });
  } catch (err) {
    console.error("❌ Error updating user block status:", err);
    res.status(500).json({ success: false, msg: "Error updating user block status" });
  }
};

/**
 * ✅ DELETE /api/admin/users/:id
 * Delete a user and their related bookings
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, msg: "User not found" });

    // Delete all bookings linked to this user
    await Booking.deleteMany({ user: user._id });

    // Delete user
    await user.deleteOne();

    res.status(200).json({
      success: true,
      msg: "User and related bookings deleted successfully",
    });
  } catch (err) {
    console.error("❌ Error deleting user:", err);
    res.status(500).json({ success: false, msg: "Error deleting user" });
  }
};

/**
 * ✅ GET /api/admin/bookings
 * Get all bookings (Admin only)
 */
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email");
    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (err) {
    console.error("❌ Error fetching bookings:", err);
    res.status(500).json({ success: false, msg: "Server error fetching bookings" });
  }
};

/**
 * ✅ PUT /api/admin/bookings/:id
 * Update booking status (Admin only)
 * Example body: { "status": "Delivered" }
 */
exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, msg: "Booking not found" });

    booking.status = req.body.status || booking.status;
    await booking.save();

    res.status(200).json({
      success: true,
      msg: "Booking status updated successfully",
      booking,
    });
  } catch (err) {
    console.error("❌ Error updating booking:", err);
    res.status(500).json({ success: false, msg: "Server error updating booking" });
  }
};
