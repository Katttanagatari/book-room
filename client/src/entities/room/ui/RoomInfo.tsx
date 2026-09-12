import {
  GroupsOutlined,
  EditOutlined,
  TvOutlined,
  VideocamOutlined,
} from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import type { Room } from "../api/rooms";
import "../../../pages/room/RoomPage.css";

interface RoomInfoProps {
  room?: Room;
  isLoading?: boolean;
}

function RoomInfo({ room, isLoading = false }: RoomInfoProps) {
  if (isLoading) {
    return (
      <div className="room">
        <Skeleton variant="text" width="45%" height={38} />

        <Skeleton variant="text" width="70%" height={24} sx={{ mt: "10px" }} />

        <div className="room__divider" />

        <div className="room__features">
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="55%" height={24} />
          <Skeleton variant="text" width="50%" height={24} />
          <Skeleton variant="text" width="65%" height={24} />
        </div>
      </div>
    );
  }

  return (
    <div className="room">
      <h1 className="room__title">{room?.name}</h1>

      <p className="room__address">
        {room?.office?.name}
        <span className="room__address-dot">•</span>
        {room?.office?.address}
      </p>

      <div className="room__divider" />

      <div className="room__features">
        <div className="room__feature">
          <GroupsOutlined className="room__icon" />
          <span>Вместимость: до {room?.capacity} человек</span>
        </div>

        {room?.features?.map((feature) => (
          <div className="room__feature" key={feature.code}>
            {feature.code === "display" && (
              <TvOutlined className="room__icon" />
            )}

            {feature.code === "whiteboard" && (
              <EditOutlined className="room__icon" />
            )}

            {feature.code === "video" && (
              <VideocamOutlined className="room__icon" />
            )}

            <span>{feature.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomInfo;
