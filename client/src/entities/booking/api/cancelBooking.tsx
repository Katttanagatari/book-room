import apiFetch from "../../../shared/api/api";

export function cancelBooking(bookingId: string) {
  return apiFetch(`/bookings/${bookingId}`, {
    method: "DELETE",
  });
}

export default cancelBooking;
