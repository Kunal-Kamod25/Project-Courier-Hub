const Booking = require('../models/booking');

// Create a new booking
exports.createBooking = async (req, res) => {
  console.log("📦 Incoming booking request:", req.body);

  try {
    const userId = req.user?.id; // From authMiddleware

    const {
      senderName,
      senderPhone,
      senderAddress,
      senderCity,
      senderPincode,
      receiverName,
      receiverPhone,
      receiverAddress,
      receiverCity,
      receiverPincode,
      serviceType,
      weight,
      description,
      declaredValue,
      price
    } = req.body;

    if (!senderName || !receiverName || !price) {
      return res.status(400).json({ msg: "Missing required booking details" });
    }

    const booking = await Booking.create({
      userId,
      senderName,
      senderPhone,
      senderAddress,
      senderCity,
      senderPincode,
      receiverName,
      receiverPhone,
      receiverAddress,
      receiverCity,
      receiverPincode,
      serviceType,
      weight,
      description,
      declaredValue,
      price,
      trackingNumber: 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: 'Booked',
      estimatedDelivery: new Date(Date.now() + (serviceType === 'express' ? 86400000 : 259200000))
    });

    console.log("✅ Booking created:", booking);
    res.status(201).json({ msg: 'Booking created successfully', booking });
  } catch (err) {
    console.error("❌ Error creating booking:", err);
    res.status(500).json({ msg: err.message });
  }
};
