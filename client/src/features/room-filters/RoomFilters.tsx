import BookingDate from "../../shared/ui/BookingDate";
import BookingTime from "../../shared/ui/BookingTime";
import BookingDuration from "../../shared/ui/BookingDuration";
import BookingPpl from "../../shared/ui/BookingPpl";

export interface Filters {
  office: string;
  day: string;
  duration: number;
  capacity: number;
  timeFrom: string;
  timeTo: string;
}

interface RoomFiltersProps {
  value: Filters;
  onChange: (filters: Filters) => void;
}

function RoomFilters({ value, onChange }: RoomFiltersProps) {
  const isDisable = !value.office;

  return (
    <div
      className={`rooms__filters-list ${
        isDisable ? "rooms__filters-list--disabled" : ""
      }`}
    >
      <BookingDate
        disable={isDisable}
        value={value.day}
        onChange={(day) =>
          onChange({
            ...value,
            day,
          })
        }
      />

      <BookingTime
        disable={isDisable}
        value={value.timeFrom}
        onChange={(timeFrom) =>
          onChange({
            ...value,
            timeFrom,
          })
        }
      />

      <BookingDuration
        disable={isDisable}
        value={value.duration}
        onChange={(duration) =>
          onChange({
            ...value,
            duration,
          })
        }
      />

      <BookingPpl
        disable={isDisable}
        value={value.capacity}
        onChange={(capacity) =>
          onChange({
            ...value,
            capacity,
          })
        }
      />
    </div>
  );
}

export default RoomFilters;
