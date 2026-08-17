const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hotel Room Booking API is running",
  });
});

app.use("/api/rooms", roomRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use(errorHandler); 

module.exports = app;