const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // ✅ fixed import
const Booking = require('../models/booking');

// ✅ Create booking
router.post('/', protect, async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      user: req.user.id, // ✅ use .id (consistent with middleware)
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error('❌ Error creating booking:', err);
    res.status(500).json({ msg: 'Server error while creating booking' });
  }
});

module.exports = router;
