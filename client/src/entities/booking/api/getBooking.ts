import apiFetch from "../../../shared/api/api";
import { type User } from "../../user/api/user";
import { startOfDay, endOfDay, parseISO } from "date-fns";

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  title: string;
  comment?: string | null;
  startsAt: string;
  endsAt: string;
  owner?: User;
}

interface BookingsResponse {
  items: Booking[];
}

function getRoomBookings(
  roomId: string,
  dateStr: string,
): Promise<BookingsResponse> {
  const from = startOfDay(parseISO(dateStr)).toISOString();
  const to = endOfDay(parseISO(dateStr)).toISOString();

  return apiFetch<BookingsResponse>(
    `/rooms/${roomId}/bookings?from=${from}&to=${to}`,
  );
}

export default getRoomBookings;
