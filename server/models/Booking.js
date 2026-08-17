const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: [true, "Room ID is required"],
    },

    guestName: {
      type: String,
      required: [true, "Guest name is required"],
      trim: true,
      minlength: [2, "Guest name must be at least 2 characters"],
    },

    checkIn: {
      type: Date,
      required: [true, "Check-in date is required"],
    },

    checkOut: {
      type: Date,
      required: [true, "Check-out date is required"],
    },

    numberOfNights: {
      type: Number,
      required: true,
      min: [1, "Number of nights must be at least 1"],
    },

    pricePerNight: {
      type: Number,
      required: true,
      min: [1, "Price per night must be greater than 0"],
    },

    totalPrice: {
      type: Number,
      required: true,
      min: [1, "Total price must be greater than 0"],
    },

    status: {
      type: String,
      enum: ["Confirmed", "Cancelled"],
      default: "Confirmed",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;