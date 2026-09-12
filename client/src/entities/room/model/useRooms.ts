import { useEffect, useState } from "react";
import { addMinutes } from "date-fns";
import getRooms, { type Room } from "../api/rooms";
import { type Filters } from "../../../features/room-filters/RoomFilters";

function useRooms(filters: Filters) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [conflictState, setConflictState] = useState<{
    open: boolean;
    title?: string;
    text?: string;
  }>({ open: false });

  useEffect(() => {
    if (!filters.office || !filters.day || !filters.timeFrom) {
      setRooms([]);
      return;
    }

    if (filters.timeFrom.length !== 5) {
      setRooms([]);
      return;
    }

    const startDate = new Date(`${filters.day}T${filters.timeFrom}:00`);

    if (isNaN(startDate.getTime())) {
      setRooms([]);
      return;
    }

    const from = startDate.toISOString();

    const to = addMinutes(startDate, filters.duration).toISOString();

    setIsLoading(true);
    setIsError(false);

    const loadRooms = async () => {
      try {
        const data = await getRooms(filters.office, filters.capacity, from, to);
        setRooms(data.items);
      } catch (err) {
        console.error("Ошибка загрузки комнат:", err);
        setRooms([]);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadRooms();
  }, [
    filters.office,
    filters.day,
    filters.capacity,
    filters.timeFrom,
    filters.duration,
  ]);

  return {
    rooms,
    isLoading,
    isError,
    selectedRoom,
    setSelectedRoom,
    showToast,
    setShowToast,
    conflictState,
    setConflictState,
  };
}

export default useRooms;
