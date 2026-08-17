import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function BookingConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [guestName, setGuestName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!state) {
    return <h2>Booking details not found</h2>;
  }

  const { room, checkIn, checkOut } = state;

  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);

  const numberOfNights = Math.ceil(
    (endDate - startDate) / (1000 * 60 * 60 * 24)
  );

  const totalPrice =
    numberOfNights * room.pricePerNight;

  const handleConfirm = async () => {
    if (!guestName.trim()) {
      setError("Guest name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          roomId: room._id,
          guestName,
          checkIn,
          checkOut,
        }
      );

      alert("Booking confirmed successfully!");

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Booking failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Booking Confirmation</h1>

      <h2>Room {room.roomNumber}</h2>

      <p>Type: {room.type}</p>

      <p>Check-in: {checkIn}</p>

      <p>Check-out: {checkOut}</p>

      <p>Number of nights: {numberOfNights}</p>

      <p>
        Price per night: ₹{room.pricePerNight}
      </p>

      <h2>Total: ₹{totalPrice}</h2>

      <input
        type="text"
        placeholder="Guest name"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
      />

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <br />

      <button
        onClick={handleConfirm}
        disabled={loading}
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>

      <button onClick={() => navigate("/")}>
        Cancel
      </button>
    </div>
  );
}

export default BookingConfirmation;