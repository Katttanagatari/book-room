import RoomLinks from "./RoomLinks";
import RoomInfo from "../../entities/room/ui/RoomInfo";
import RoomSchedule from "../../features/room-schedule/RoomSchedule";

import { useParams, useNavigate } from "react-router-dom";
import { useRoom } from "../../entities/room/model/useRoom";

function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { room, isLoading, error } = useRoom(roomId);

  if (isLoading) {
    return (
      <>
        <RoomLinks isLoading={true} />
        <div className="room-page">
          <RoomInfo isLoading={true} />
        </div>
      </>
    );
  }

  if (error || !room) {
    return (
      <div className="room-page__status">
        <h2>Комната не найдена</h2>
        <button onClick={() => navigate("/rooms")}>Вернуться к списку</button>
      </div>
    );
  }
  return (
    <>
      <RoomLinks room={room} isLoading={isLoading} />
      <div className="room-page">
        <RoomInfo room={room} isLoading={isLoading} />
        <RoomSchedule room={room} />
      </div>
    </>
  );
}

export default RoomPage;
