import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Popup from "../../shared/ui/Popup/Popup";
import Btn from "../../shared/ui/Btn";
import BookingDate from "../../shared/ui/BookingDate";
import BookingTime from "../../shared/ui/BookingTime";
import BookingDuration from "../../shared/ui/BookingDuration";
import "./BookingModal.css";
import InputText from "../../shared/ui/InputText";

import { useState } from "react";
import { type Room } from "../../entities/room/api/rooms";
import createBooking from "../../entities/booking/api/createBooking";
import { addMinutes, format } from "date-fns";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  room?: Room;
  onSuccess?: () => void;
  onConflict?: (title?: string, text?: string) => void;
}

function BookingModal({
  open,
  onClose,
  room,
  onSuccess,
  onConflict,
}: BookingModalProps) {
  const today = format(new Date(), "yyyy-MM-dd");

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("15:00");
  const [duration, setDuration] = useState(60);
  const [comment, setComment] = useState("");

  const handleBook = async () => {
    if (!room) return;

    const start = new Date(`${date}T${time}:00`);
    const end = new Date(start.getTime() + duration * 60 * 1000);

    try {
      await createBooking({
        roomId: room.id,
        title,
        comment: comment || null,
        startsAt: start.toISOString(),
        endsAt: end.toISOString(),
      });

      onClose();
      onSuccess?.();
    } catch (e: any) {
      onClose();
      if (e.status === 409) {
        onConflict?.(
          "Время уже занято",
          "Выбранный интервал был забронирован другим сотрудником. Расписание обновлено.",
        );
      } else {
        onConflict?.(
          "Бронирование невозможно",
          e.message || "Бронирование можно создать только на будущее время.",
        );
      }
    }
  };

  const start = new Date(`${date}T${time}:00`);
  const isValid =
    !isNaN(start.getTime()) && Boolean(date) && time?.length === 5;
  const end = isValid ? addMinutes(start, duration) : null;
  const dateStr = isValid
    ? start.toLocaleDateString("ru-RU", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";
  const durationStr = duration < 60 ? `${duration} мин` : `${duration / 60} ч`;

  return (
    <Popup open={open} onClose={onClose}>
      <div className="booking-modal">
        <div className="booking-modal__header">
          <h2 className="booking-modal__title">Новое бронирование</h2>
          <p className="booking-modal__subtitle">
            Переговорная:{" "}
            <span className="booking-modal__room-name">{room?.name}</span> (
            {room?.office.name}, {room?.floor} этаж)
          </p>
        </div>

        <div className="booking-modal__divider" />

        <div className="booking-modal__form">
          <div className="booking-modal__field">
            <label className="booking-modal__label">Тема встречи *</label>

            <InputText
              value={title}
              onChange={setTitle}
              placeholder="Укажите тему встречи"
              required
            />
          </div>

          <div className="booking-modal__row">
            <div className="booking-modal__col">
              <BookingDate value={date} onChange={setDate} disable={false} />
            </div>

            <div className="booking-modal__col">
              <BookingTime value={time} onChange={setTime} disable={false} />
            </div>
          </div>

          <div className="booking-modal__field">
            <BookingDuration
              value={duration}
              onChange={setDuration}
              disable={false}
            />
          </div>

          <div className="booking-modal__field">
            <label className="booking-modal__label">Комментарий</label>

            <InputText
              value={comment}
              onChange={setComment}
              placeholder="Дополнительная информация для участников встречи..."
              multiline
            />
          </div>

          <div className="booking-modal__info-badge">
            <InfoOutlinedIcon sx={{ fontSize: 20, color: "#065f46" }} />
            <span style={{ textTransform: "capitalize" }}>
              {isValid && end
                ? `Бронирование на ${dateStr}, ${time} - ${format(end, "HH:mm")} (${durationStr})`
                : "Укажите корректные дату и время"}
            </span>
          </div>

          <div className="booking-modal__actions">
            <Btn onClick={onClose}>Отмена</Btn>

            <Btn variant="contained" onClick={handleBook}>
              Забронировать
            </Btn>
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default BookingModal;
