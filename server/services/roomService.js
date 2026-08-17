const Room = require("../models/Room");

const getAllRooms = async () => {
  return await Room.find().sort({ roomNumber: 1 });
};

const getRoomById = async (id) => {
  return await Room.findById(id);
};

const createRoom = async (roomData) => {
  return await Room.create(roomData);
};

const updateRoom = async (id, roomData) => {
  return await Room.findByIdAndUpdate(id, roomData, {
    new: true,
    runValidators: true,
  });
};

const deleteRoom = async (id) => {
  return await Room.findByIdAndDelete(id);
};

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};