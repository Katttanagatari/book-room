import "./RoomsPage.css";

import OfficeSelector from "../../features/office-select/OfficeSelector";
import RoomFilter from "../../features/room-filters";
import RoomList from "../../features/room-list/RoomList";
import useRoomFilters from "../../features/room-filters/model/useRoomFilters";

function RoomsPage() {
  const { filters, setFilters } = useRoomFilters();

  return (
    <main className="rooms">
      <OfficeSelector
        value={filters.office}
        onChange={(officeId, initialTime) => {
          setFilters((prev) => ({
            ...prev,
            office: officeId,
            timeFrom: initialTime,
          }));
        }}
      />
      <RoomFilter value={filters} onChange={setFilters} />
      <RoomList
        filters={filters}
        onReset={() => {
          const today = new Date().toISOString().split("T")[0];
          setFilters((prev) => ({
            ...prev,
            day: today,
            capacity: 2,
            duration: 15,
            timeFrom: "09:00",
          }));
        }}
      />
    </main>
  );
}

export default RoomsPage;
