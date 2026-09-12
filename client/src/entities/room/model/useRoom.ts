import { useState, useEffect } from "react";
import { type Room } from "../api/rooms";
import getRoomById from "../api/room";

export function useRoom(roomId?: string) {
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const id = roomId;

    async function loadRoom() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getRoomById(id);
        setRoom(data);
      } catch (err: any) {
        setError(err.message || "Ошибка загрузки комнаты");
        setRoom(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadRoom();
  }, [roomId]);

  return { room, isLoading, error };
}
