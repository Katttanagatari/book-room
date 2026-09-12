import apiFetch from "../../../shared/api/api";
import type { Office } from "../../office/api/offices";

export interface Room {
  id: string;
  officeId: string;
  name: string;
  floor: number;
  capacity: number;
  features: {
    code: string;
    name: string;
  }[];
  office: Office;
  available: boolean;
}

interface Rooms {
  items: Room[];
}

function getRooms(
  officeId: string,
  capacity: number,
  from: string,
  to: string,
): Promise<Rooms> {
  return apiFetch(
    `/rooms?officeId=${officeId}&minCapacity=${capacity}&from=${from}&to=${to}`,
  );
}

export default getRooms;
