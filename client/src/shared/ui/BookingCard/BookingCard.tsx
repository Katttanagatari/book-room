import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import Btn from "../Btn";
import "./BookingCard.css";

interface BookingCardProps {
  month: string;
  day: string;
  title: string;
  room: string;
  floor: string;
  time: string;
  isPast?: boolean;
  onCancel?: () => void;
}

function BookingCard({
  month,
  day,
  title,
  room,
  floor,
  time,
  isPast = false,
  onCancel,
}: BookingCardProps) {
  return (
    <div className="booking-card">
      <div className="booking-card__date">
        <span className="booking-card__month">{month}</span>
        <span className="booking-card__day">{day}</span>
      </div>

      <div className="booking-card__content">
        <h3 className="booking-card__title">{title}</h3>

        <div className="booking-card__info">
          <span className="booking-card__room">
            <BusinessCenterOutlinedIcon className="booking-card__icon" />
            {room}
          </span>

          <span className="booking-card__floor">{floor}</span>

          <span className="booking-card__time">{time}</span>
        </div>
      </div>

      {!isPast && (
        <Btn variant="cancel" onClick={onCancel}>
          Отменить
        </Btn>
      )}
    </div>
  );
}

export default BookingCard;
