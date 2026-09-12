import { Skeleton } from "@mui/material";
import "../../pages/room/RoomPage.css";
import RoomScheduleError from "./RoomScheduleError";
import Btn from "../../shared/ui/Btn";
import BookingModal from "../book-room";
import BookingConflictModal from "../book-room/BookingConflictModal";
import BookingDate from "../../shared/ui/BookingDate";
import Toast from "../../shared/ui/Toast/Toast";

import {
  useRoomSchedule,
  formatHeaderDate,
  formatTime,
  HOURS,
} from "../../entities/booking/model/useRoomSchedule";
import { type Room } from "../../entities/room/api/rooms";
import { useState } from "react";

interface RoomScheduleProps {
  room: Room;
}

function RoomSchedule({ room }: RoomScheduleProps) {
  const {
    selectedDate,
    setSelectedDate,
    bookings,
    isLoading,
    scheduleError,
    loadBookings,
  } = useRoomSchedule(room.id);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [conflictState, setConflictState] = useState<{
    open: boolean;
    title: string;
    text: string;
  }>({
    open: false,
    title: "Время уже занято",
    text: "Выбранный интервал был забронирован другим сотрудником. Расписание обновлено.",
  });
  const [showToast, setShowToast] = useState(false);

  if (scheduleError) {
    return (
      <div className="room__schedule">
        <RoomScheduleError onRetry={loadBookings} />
      </div>
    );
  }

  return (
    <div className="room__schedule">
      {isLoading ? (
        <>
          <div className="room__schedule-header">
            <div>
              <Skeleton variant="text" width={180} height={32} />
              <Skeleton variant="text" width={140} height={24} />
            </div>

            <Skeleton variant="rounded" width={130} height={40} />
          </div>

          <div className="room__schedule-timeline">
            {HOURS.map((hour) => (
              <div key={hour} className="room__schedule-row">
                <div className="room__schedule-time">{hour}</div>

                <div className="room__schedule-slot">
                  <div className="room__schedule-line" />
                  <Skeleton variant="rounded" width="100%" height={20} />
                </div>
              </div>
            ))}
          </div>

          <div className="room__schedule-footer">
            <Skeleton variant="rounded" width={190} height={40} />
          </div>
        </>
      ) : (
        <>
          <div className="room__schedule-header">
            <div>
              <h2 className="room__schedule-title">Расписание на день</h2>

              <div className="room__schedule-subtitle">
                {formatHeaderDate(selectedDate)}
              </div>
            </div>

            <BookingDate
              value={selectedDate}
              onChange={setSelectedDate}
              disable={isLoading}
            />
          </div>

          <div className="room__schedule-timeline">
            {HOURS.map((hour) => {
              const hourBookings = bookings.filter((b) => {
                const start = formatTime(b.startsAt);
                return start.startsWith(hour.slice(0, 2));
              });

              return (
                <div key={hour} className="room__schedule-row">
                  <div className="room__schedule-time">{hour}</div>

                  <div className="room__schedule-slot">
                    <div className="room__schedule-line" />

                    {hourBookings.map((b) => (
                      <div key={b.id} className="room__schedule-booking-card">
                        <strong>{b.title || "Занято"}</strong>

                        <span className="room__schedule-booking-time">
                          {formatTime(b.startsAt)} – {formatTime(b.endsAt)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="room__schedule-footer">
            <Btn variant="contained" onClick={() => setIsBookingOpen(true)}>
              Забронировать комнату
            </Btn>
          </div>

          <BookingModal
            open={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            room={room}
            onSuccess={() => {
              loadBookings();
              setShowToast(true);
            }}
            onConflict={(title, text) => {
              loadBookings();
              setConflictState({
                open: true,
                title: title || "Время уже занято",
                text:
                  text ||
                  "Выбранный интервал был забронирован другим сотрудником. Расписание обновлено.",
              });
            }}
          />

          <BookingConflictModal
            open={conflictState.open}
            title={conflictState.title}
            text={conflictState.text}
            onClose={() => {
              setConflictState((prev) => ({ ...prev, open: false }));
              setIsBookingOpen(true);
            }}
          />

          <Toast
            open={showToast}
            onClose={() => setShowToast(false)}
            type="success"
            title="Бронирование создано"
            subtitle={`Комната ${room.name}, ${formatHeaderDate(selectedDate)}`}
          />
        </>
      )}
    </div>
  );
}

export default RoomSchedule;
