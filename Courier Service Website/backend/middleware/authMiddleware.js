const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * 🔐 Protect middleware — verifies JWT and attaches user info to req.user
 */
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ msg: "No token provided, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user in DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // ✅ Attach structured user data to request
    req.user = { id: user._id, email: user.email, role: user.role };

    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err);
    res.status(401).json({ msg: "Token is invalid or expired" });
  }
};

/**
 * 🛡️ Admin middleware — allows only admins
 */
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ msg: "Access denied — admin privileges required." });
  }
};

module.exports = { protect, admin };
