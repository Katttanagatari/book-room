import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Skeleton } from "@mui/material";
import type { Room } from "../../entities/room/api/rooms";
import "./RoomPage.css";

interface RoomLinksProps {
  room?: Room;
  isLoading?: boolean;
}

function RoomLinks({ room, isLoading = false }: RoomLinksProps) {
  if (isLoading) {
    return (
      <nav className="room__links" aria-label="Хлебные крошки">
        <Skeleton variant="text" width={110} height={24} />
        <NavigateNextIcon className="room__links-separator" />
        <Skeleton variant="text" width={120} height={24} />
        <NavigateNextIcon className="room__links-separator" />
        <Skeleton variant="text" width={150} height={24} />
      </nav>
    );
  }

  return (
    <nav className="room__links" aria-label="Хлебные крошки">
      <div className="room__links-item">
        <Link to="/rooms" className="room__links-link">
          Переговорные
        </Link>

        <NavigateNextIcon className="room__links-separator" />
      </div>

      <div className="room__links-item">
        {/* //// */}
        <span className="room__links-text">{room?.office?.name}</span>
        {/* //// */}
        <NavigateNextIcon className="room__links-separator" />
      </div>

      <div className="room__links-item">
        <span className="room__links-text room__links-text--current">
          Комната '{room?.name}'
        </span>
      </div>
    </nav>
  );
}

export default RoomLinks;
