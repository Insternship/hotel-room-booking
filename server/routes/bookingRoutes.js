const express = require("express");

const {
  getBookings,
  getBooking,
  createBooking,
   updateBooking,
  cancelBooking,
} = require("../controllers/bookingController");

const router = express.Router();

router.get("/", getBookings);
router.get("/:id", getBooking);
router.post("/", createBooking);
router.delete("/:id", cancelBooking);
router.put("/:id", updateBooking);

module.exports = router;