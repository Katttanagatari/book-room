import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Popup from "../../shared/ui/Popup/Popup";
import Btn from "../../shared/ui/Btn";
import "./BookingCancel.css";

interface CancelBookingModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  room?: string;
  floor?: string;
  date?: string;
}

function BookingCancel({
  open,
  onClose,
  onConfirm,
  title = "Daily Sync: Разработка & Продукт",
  room = "Эверест",
  floor = "4 этаж",
  date = "Четверг, 24 октября, 15:00 - 16:00",
}: CancelBookingModalProps) {
  return (
    <Popup open={open} onClose={onClose}>
      <div className="cancel-modal">
        <h2 className="cancel-modal__title">Отменить бронирование?</h2>
        <p className="cancel-modal__subtitle">
          Это действие нельзя будет отменить. Освободившееся время станет
          доступно другим сотрудникам.
        </p>

        <div className="cancel-modal__card">
          <h3 className="cancel-modal__card-title">{title}</h3>

          <div className="cancel-modal__card-row">
            <MeetingRoomOutlinedIcon className="cancel-modal__icon" />
            <span>
              Комната '{room}', {floor}
            </span>
          </div>

          <div className="cancel-modal__card-row">
            <CalendarTodayOutlinedIcon className="cancel-modal__icon" />
            <span>{date}</span>
          </div>
        </div>

        <div className="cancel-modal__actions">
          <Btn
            variant="outlined"
            onClick={onClose}
            sx={{
              flex: 1,
              height: 44,
              color: "#334155",
              borderColor: "#e2e8f0",
              "&:hover": {
                borderColor: "#cbd5e1",
                backgroundColor: "#f8fafc",
              },
            }}
          >
            Нет, оставить
          </Btn>

          <Btn
            variant="cancel"
            onClick={onConfirm}
            sx={{
              flex: 1,
              height: 44,
              color: "#334155",
              "&:hover": {
                backgroundColor: "#dc2626",
              },
            }}
          >
            Да, отменить
          </Btn>
        </div>
      </div>
    </Popup>
  );
}

export default BookingCancel;
