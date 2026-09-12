import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./shared/ui/Header";
import RoomsPage from "./pages/rooms";
import RoomPage from "./pages/room";
import BookingsPage from "./pages/booking/BookingPages";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/rooms" replace />} />
          <Route path="/rooms/:roomId" element={<RoomPage />} />

          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
