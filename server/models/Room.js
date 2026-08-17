const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, "Room number is required"],
      unique: true,
      trim: true,
    },

    type: {
      type: String,
      required: [true, "Room type is required"],
      enum: ["Single", "Double", "Deluxe", "Suite"],
    },

    pricePerNight: {
      type: Number,
      required: [true, "Price per night is required"],
      min: [1, "Price must be greater than 0"],
    },

    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },

    status: {
      type: String,
      enum: ["Available", "Maintenance"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;