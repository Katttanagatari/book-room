import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import Btn from "../../shared/ui/Btn";
import "../../pages/room/RoomPage.css";

interface RoomScheduleErrorProps {
  onRetry: () => void;
}

function RoomScheduleError({ onRetry }: RoomScheduleErrorProps) {
  return (
    <div className="room__schedule-error">
      <div className="room__schedule-error-icon">
        <WarningAmberOutlinedIcon />
      </div>

      <h2 className="room__schedule-error-title">
        Не удалось загрузить расписание
      </h2>

      <p className="room__schedule-error-text">
        Произошла ошибка при загрузке расписания
        <br />
        переговорной
      </p>

      <Btn variant="contained" onClick={onRetry}>
        Попробовать снова
      </Btn>
    </div>
  );
}

export default RoomScheduleError;
