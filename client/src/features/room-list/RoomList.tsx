import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import RoomCard from "../../entities/room/ui/RoomCard";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import Btn from "../../shared/ui/Btn";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Skeleton } from "@mui/material";
import BookingModal from "../book-room/BookingModal";
import BookingConflictModal from "../book-room/BookingConflictModal";
import Toast from "../../shared/ui/Toast/Toast";

import useRooms from "../../entities/room/model/useRooms";
import { type Filters } from "../room-filters/RoomFilters";
import { useNavigate } from "react-router-dom";

interface RoomListProps {
  filters: Filters;
  onReset?: () => void;
}

function RoomList({ filters, onReset }: RoomListProps) {
  const {
    rooms,
    isLoading,
    isError,
    selectedRoom,
    setSelectedRoom,
    showToast,
    setShowToast,
    conflictState,
    setConflictState,
  } = useRooms(filters);
  const navigate = useNavigate();

  if (!filters.office) {
    return (
      <div className="rooms__list">
        <div className="rooms__empty">
          <div className="rooms__empty-icon">
            <MeetingRoomIcon />
          </div>

          <h2 className="rooms__empty-title">Выберите офис</h2>

          <p className="rooms__empty-text">
            Для просмотра доступных переговорных сначала выберите офис
            <br />
            из списка выше
          </p>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="rooms__list">
        <Skeleton variant="text" width={320} height={32} sx={{ mb: 2 }} />

        <div className="rooms__available">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <RoomCard key={i} isLoading={true} />
          ))}
        </div>
      </div>
    );
  }
  if (isError && !isLoading) {
    return (
      <div className="rooms__list">
        <div className="rooms__empty">
          <div
            className="rooms__empty-icon"
            style={{ backgroundColor: "#fee2e2", color: "#ef4444" }}
          >
            <ErrorOutlineOutlinedIcon />
          </div>

          <h2 className="rooms__empty-title">
            Не удалось загрузить переговорные
          </h2>

          <p className="rooms__empty-text">
            Произошла ошибка при загрузке данных. Попробуйте обновить страницу
          </p>

          <Btn variant="contained" onClick={() => window.location.reload()}>
            Попробовать снова
          </Btn>
        </div>
      </div>
    );
  }
  if (!isLoading && rooms.length === 0) {
    return (
      <div className="rooms__list">
        <div className="rooms__empty">
          <div className="rooms__empty-icon">
            <SearchOffOutlinedIcon />
          </div>

          <h2 className="rooms__empty-title">Нет доступных переговорных</h2>

          <p className="rooms__empty-text">
            Попробуйте изменить параметры фильтрации или выбрать другой офис
          </p>

          <Btn variant="contained" onClick={onReset}>
            Сбросить фильтры
          </Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="rooms__list">
      <div className="rooms__available-text">
        Доступные переговорные в этом офисе
      </div>

      <div className="rooms__available">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            name={room.name}
            floor={room.floor}
            capacity={room.capacity}
            available={room.available}
            onDetails={() => navigate(`/rooms/${room.id}`)}
            onBook={() => setSelectedRoom(room)}
          />
        ))}
      </div>
      <BookingModal
        open={Boolean(selectedRoom)}
        room={selectedRoom ?? undefined}
        onClose={() => setSelectedRoom(null)}
        onSuccess={() => setShowToast(true)}
        onConflict={(title, text) =>
          setConflictState({ open: true, title, text })
        }
      />

      <BookingConflictModal
        open={conflictState.open}
        title={conflictState.title}
        text={conflictState.text}
        onClose={() => setConflictState({ open: false })}
      />

      <Toast
        open={showToast}
        onClose={() => setShowToast(false)}
        type="success"
        title="Бронирование создано"
        subtitle={selectedRoom ? `Комната ${selectedRoom.name}` : ""}
      />
    </div>
  );
}

export default RoomList;
