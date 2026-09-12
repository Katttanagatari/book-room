import { useState, useEffect } from "react";
import getRoomBookings, { type Booking } from "../api/getBooking";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

export function formatHeaderDate(dateStr: string): string {
  return format(parseISO(dateStr), "EEEE, d MMMM", { locale: ru });
}

export function formatTime(isoStr: string): string {
  return format(parseISO(isoStr), "HH:mm");
}

export const HOURS = Array.from({ length: 12 }, (_, i) => {
  const hour = i + 9;
  return `${hour.toString().padStart(2, "0")}:00`;
});

export function useRoomSchedule(roomId: string) {
  const today = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(today);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleError, setScheduleError] = useState(false);

  const loadBookings = () => {
    if (!roomId || !selectedDate) return;

    setIsLoading(true);

    getRoomBookings(roomId, selectedDate)
      .then((data) => {
        setBookings(data.items || []);
      })
      .catch((err) => {
        console.error("Ошибка загрузки расписания:", err);
        setBookings([]);
        setScheduleError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadBookings();
  }, [roomId, selectedDate]);

  useEffect(() => {
    if (!roomId) return;

    const ws = new WebSocket("ws://localhost:3000/api/v1/ws");

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (
          message.type === "booking.created" ||
          message.type === "booking.cancelled" ||
          message.type === "room.availability_changed" ||
          message.type === "data.reset"
        ) {
          loadBookings();
        }
      } catch (err) {
        console.error("Ошибка парсинга WS сообщения:", err);
      }
    };

    return () => {
      ws.close();
    };
  }, [roomId, selectedDate]);

  return {
    selectedDate,
    setSelectedDate,
    bookings,
    isLoading,
    scheduleError,
    loadBookings,
  };
}

export default useRoomSchedule;
