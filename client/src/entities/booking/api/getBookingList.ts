import apiFetch from "../../../shared/api/api";

export interface UserBooking {
  id: string;
  roomId: string;
  userId: string;
  title: string;
  comment?: string | null;
  startsAt: string;
  endsAt: string;
  room?: {
    id: string;
    officeId: string;
    name: string;
    floor: number;
    capacity: number;
  };
  office?: {
    id: string;
    name: string;
    timezone: string;
  };
}

function getBookingList(): Promise<{ items: UserBooking[] }> {
  return apiFetch<{ items: UserBooking[] }>("/bookings?scope=all");
}

export default getBookingList;
