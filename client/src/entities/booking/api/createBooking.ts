import apiFetch from "../../../shared/api/api";
import { type Booking } from "../api/getBooking";

export interface CreateBookingData {
  roomId: string;
  title: string;
  comment?: string | null;
  startsAt: string;
  endsAt: string;
}

function createBooking(data: CreateBookingData): Promise<Booking> {
  return apiFetch<Booking>("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export default createBooking;
