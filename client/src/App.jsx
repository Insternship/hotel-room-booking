import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rooms from "./pages/Rooms";
import BookingConfirmation from "./pages/BookingConfirmation";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rooms />} />
          <Route
          path="/booking/:id"
          element={<BookingConfirmation />}
        />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;