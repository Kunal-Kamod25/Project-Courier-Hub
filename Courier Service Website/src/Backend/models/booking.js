const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  senderName: String,
  senderPhone: String,
  senderAddress: String,
  senderCity: String,
  senderPincode: String,

  receiverName: String,
  receiverPhone: String,
  receiverAddress: String,
  receiverCity: String,
  receiverPincode: String,

  serviceType: String,
  weight: Number,
  description: String,
  declaredValue: Number,
  price: Number,

  trackingNumber: String,
  status: {
    type: String,
    enum: ['Booked', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Booked'
  },
  estimatedDelivery: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
