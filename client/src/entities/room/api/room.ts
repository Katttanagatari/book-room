import apiFetch from "../../../shared/api/api";
import { type Room } from "./rooms";

function getRoomById(roomId: string): Promise<Room> {
  return apiFetch(`/rooms/${roomId}`);
}

export default getRoomById;
