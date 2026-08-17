import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/rooms"
        );

        setRooms(response.data.rooms);
      } catch (err) {
        setError("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };

    getRooms();
  }, []);

  const handleBook = (room) => {
    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError("Check-out must be after check-in");
      return;
    }

    navigate(`/booking/${room._id}`, {
      state: {
        room,
        checkIn,
        checkOut,
      },
    });
  };

  if (loading) {
    return <h2>Loading rooms...</h2>;
  }

  if (error && rooms.length === 0) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Hotel Rooms</h1>

      <div>
        <label>Check-in: </label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        <label> Check-out: </label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {rooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        <div>
          {rooms.map((room) => (
            <div key={room._id}>
              <h2>Room {room.roomNumber}</h2>

              <p>Type: {room.type}</p>
              <p>Capacity: {room.capacity}</p>
              <p>₹{room.pricePerNight} per night</p>

              <button onClick={() => handleBook(room)}>
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Rooms;