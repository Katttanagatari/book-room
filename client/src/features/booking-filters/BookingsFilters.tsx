import BookingOffice from "../../shared/ui/BookingOffice";
import BookingDate from "../../shared/ui/BookingDate";
import useOffice from "../../entities/office/model/useOffice";

interface BookingsFiltersProps {
  officeId: string;
  onOfficeChange: (officeId: string) => void;
  date: string;
  onDateChange: (date: string) => void;
}

function BookingsFilters({
  officeId,
  onOfficeChange,
  date,
  onDateChange,
}: BookingsFiltersProps) {
  const { offices } = useOffice("");

  return (
    <div className="bookings__filters">
      <BookingOffice
        value={officeId}
        onChange={onOfficeChange}
        offices={offices}
      />

      <BookingDate value={date} onChange={onDateChange} />
    </div>
  );
}

export default BookingsFilters;
