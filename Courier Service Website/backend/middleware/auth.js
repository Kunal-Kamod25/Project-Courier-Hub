// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../routes/User');
const JWT_SECRET = process.env.JWT_SECRET;


exports.protect = async (req, res, next) => {
const authHeader = req.headers.authorization;
const token = authHeader && authHeader.split(' ')[1];
if (!token) return res.status(401).json({ message: 'No token provided' });
try {
const decoded = jwt.verify(token, JWT_SECRET);
const user = await User.findById(decoded.id).select('-passwordHash');
if (!user) return res.status(401).json({ message: 'User not found' });
req.user = user;
next();
} catch (err) {
return res.status(401).json({ message: 'Token invalid', error: err.message });
}
};


exports.adminOnly = (req, res, next) => {
if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
next();
};