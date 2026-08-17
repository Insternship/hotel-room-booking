const roomService = require("../services/roomService");

const getRooms = async (req, res, next) => {
  try {
    const rooms = await roomService.getAllRooms();

    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = await roomService.getRoomById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    next(error);
  }
};

const createRoom = async (req, res, next) => {
  try {
    const room = await roomService.createRoom(req.body);

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    next(error);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const room = await roomService.updateRoom(
      req.params.id,
      req.body
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      room,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const room = await roomService.deleteRoom(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
};