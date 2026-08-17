const Booking = require("../models/Booking");
const Room = require("../models/Room");
const mongoose = require("mongoose");

const getAllBookings = async () => {
  return await Booking.find()
    .populate("roomId")
    .sort({ createdAt: -1 });
};

const getBookingById = async (id) => {
  return await Booking.findById(id).populate("roomId");
};

const createBooking = async (bookingData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

     try{
    
  const {
    roomId,
    guestName,
    checkIn,
    checkOut,
  } = bookingData;
  

  // 1. Validate dates
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);

  if (isNaN(startDate) || isNaN(endDate)) {
    throw new Error("Invalid check-in or check-out date");
  }

  if (endDate <= startDate) {
    throw new Error("Check-out must be after check-in");
  }

  // 2. Check that room exists
const room = await Room.findOneAndUpdate(
  { _id: roomId },
  { $set: { updatedAt: new Date() } },
  {
    new: true,
    session,
  }
);

  if (!room) {
    throw new Error("Room not found");
  }

  // 3. Check overlapping bookings
  const overlappingBooking = await Booking.findOne({
    roomId,
    status: "Confirmed",
    checkIn: { $lt: endDate },
    checkOut: { $gt: startDate },
  }).session(session);//add

  if (overlappingBooking) {
  const error = new Error("Room is already booked for these dates");
  error.statusCode = 409;
  throw error;
}
  // 4. Calculate number of nights
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const numberOfNights = Math.ceil(
    (endDate - startDate) / millisecondsPerDay
  );

  // 5. Store current room price
  const pricePerNight = room.pricePerNight;

  // 6. Calculate total
  const totalPrice = numberOfNights * pricePerNight;

  // 7. Create booking
  const createdBookings = await Booking.create(
  [
    {
      roomId,
      guestName,
      checkIn: startDate,
      checkOut: endDate,
      numberOfNights,
      pricePerNight,
      totalPrice,
      status: "Confirmed",
    },
  ],
  { session }
);

const booking = createdBookings[0];
await session.commitTransaction();
return booking;

  } catch (error) {
    await session.abortTransaction();
    throw error;
  }finally{
    await session.endSession();

  }
};

const cancelBooking = async (id) => {
  const booking = await Booking.findById(id);

  if (!booking) {
    throw new Error("Booking not found");
  }

  booking.status = "Cancelled";

  await booking.save();

  return booking;
};


const updateBooking = async (id, bookingData) => {
  const booking = await Booking.findById(id);

  if (!booking) {
    const error = new Error("Booking not found");
    error.statusCode = 404;
    throw error;
  }

  if (booking.status === "Cancelled") {
    const error = new Error("Cancelled booking cannot be updated");
    error.statusCode = 400;
    throw error;
  }

  const allowedFields = [
    "guestName",
    "checkIn",
    "checkOut",
  ];

  allowedFields.forEach((field) => {
    if (bookingData[field] !== undefined) {
      booking[field] = bookingData[field];
    }
  });

  const startDate = new Date(booking.checkIn);
  const endDate = new Date(booking.checkOut);

  if (isNaN(startDate) || isNaN(endDate)) {
    const error = new Error("Invalid check-in or check-out date");
    error.statusCode = 400;
    throw error;
  }

  if (endDate <= startDate) {
    const error = new Error("Check-out must be after check-in");
    error.statusCode = 400;
    throw error;
  }

  const overlappingBooking = await Booking.findOne({
    _id: { $ne: id },
    roomId: booking.roomId,
    status: "Confirmed",
    checkIn: { $lt: endDate },
    checkOut: { $gt: startDate },
  });

  if (overlappingBooking) {
    const error = new Error(
      "Room is already booked for these dates"
    );
    error.statusCode = 409;
    throw error;
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  booking.numberOfNights = Math.ceil(
    (endDate - startDate) / millisecondsPerDay
  );

  // Keep the original booking price.
  booking.totalPrice =
    booking.numberOfNights * booking.pricePerNight;

  await booking.save();

  return booking;
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  cancelBooking,
  updateBooking,
};