import { useState } from "react";
import { type Filters } from "../RoomFilters";
import { format } from "date-fns";

export function useRoomFilters() {
  const today = format(new Date(), "yyyy-MM-dd");

  const [filters, setFilters] = useState<Filters>({
    office: "",
    day: today,
    capacity: 2,
    duration: 15,
    timeFrom: "",
    timeTo: "",
  });

  return {
    filters,
    setFilters,
  };
}

export default useRoomFilters;
