import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import Popup from "../../shared/ui/Popup/Popup";
import Btn from "../../shared/ui/Btn";
import "./BookingConflictModal.css";

interface BookingConflictModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  text?: string;
  buttonText?: string;
}

function BookingConflictModal({
  open,
  onClose,
  title = "Время уже занято",
  text = "Выбранный интервал был забронирован другим сотрудником. Расписание обновлено.",
  buttonText = "Выбрать другое время",
}: BookingConflictModalProps) {
  return (
    <Popup open={open} onClose={onClose}>
      <div className="booking-conflict">
        <div className="booking-conflict__icon-wrapper">
          <WarningAmberRoundedIcon sx={{ fontSize: 32, color: "#dc2626" }} />
        </div>

        <h2 className="booking-conflict__title">{title}</h2>

        <p className="booking-conflict__text">{text}</p>

        <Btn
          variant="contained"
          onClick={onClose}
          sx={{
            width: "100%",
            height: "44px",
            fontSize: "14px",
          }}
        >
          {buttonText}
        </Btn>
      </div>
    </Popup>
  );
}

export default BookingConflictModal;
