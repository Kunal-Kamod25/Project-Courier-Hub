// routes/admin.js
const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const User = require('./User');


// Example admin-only endpoint to list users
router.get('/users', protect, adminOnly, async (req, res) => {
try {
const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
res.json(users);
} catch (err) {
res.status(500).json({ message: err.message });
}
});


module.exports = router;