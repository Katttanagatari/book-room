import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, parseISO, isAfter } from "date-fns";
import { ru } from "date-fns/locale";

import { Skeleton } from "@mui/material";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

import BookingsFilters from "../../features/booking-filters";
import BookingCard from "../../shared/ui/BookingCard/BookingCard";
import BookingCancel from "../../features/booking-cancel";
import Btn from "../../shared/ui/Btn";
import getBookingList, {
  type UserBooking,
} from "../../entities/booking/api/getBookingList";
import cancelBooking from "../../entities/booking/api/cancelBooking";
import "./BookingPages.css";

function BookingsPage() {
  const navigate = useNavigate();
  const [officeId, setOfficeId] = useState("");
  const [date, setDate] = useState("");
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [selectedBooking, setSelectedBooking] = useState<UserBooking | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchBookings = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await getBookingList();
      setBookings(res.items);
    } catch (err) {
      console.error("Ошибка загрузки:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;

    try {
      await cancelBooking(selectedBooking.id);
      setBookings((prev) => prev.filter((b) => b.id !== selectedBooking.id));
      setSelectedBooking(null);
    } catch (e) {
      console.log(e);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (
      officeId &&
      b.room?.officeId !== officeId &&
      b.office?.id !== officeId
    ) {
      return false;
    }
    if (date) {
      const bookingDate = format(parseISO(b.startsAt), "yyyy-MM-dd");
      if (bookingDate !== date) {
        return false;
      }
    }
    return true;
  });

  const now = new Date();
  const upcomingBookings = filteredBookings.filter((b) =>
    isAfter(parseISO(b.endsAt), now),
  );
  const pastBookings = filteredBookings.filter(
    (b) => !isAfter(parseISO(b.endsAt), now),
  );

  const currentList = tab === "upcoming" ? upcomingBookings : pastBookings;

  return (
    <main className="bookings">
      <div className="bookings__header">
        {isLoading ? (
          <Skeleton variant="text" width={240} height={40} />
        ) : (
          <h1 className="bookings__title">Мои бронирования</h1>
        )}

        {isLoading ? (
          <div className="bookings__filters">
            <Skeleton
              variant="rounded"
              width={140}
              height={40}
              sx={{ borderRadius: "8px" }}
            />
            <Skeleton
              variant="rounded"
              width={140}
              height={40}
              sx={{ borderRadius: "8px" }}
            />
          </div>
        ) : (
          <BookingsFilters
            officeId={officeId}
            onOfficeChange={setOfficeId}
            date={date}
            onDateChange={setDate}
          />
        )}
      </div>

      <nav className="bookings__navigation">
        <button
          className={`bookings__link ${
            tab === "upcoming" ? "bookings__link--active" : ""
          }`}
          onClick={() => setTab("upcoming")}
        >
          {isLoading ? (
            <Skeleton width={110} height={20} />
          ) : (
            `Предстоящие (${upcomingBookings.length})`
          )}
        </button>

        <button
          className={`bookings__link ${
            tab === "past" ? "bookings__link--active" : ""
          }`}
          onClick={() => setTab("past")}
        >
          {isLoading ? (
            <Skeleton width={100} height={20} />
          ) : (
            `Прошедшие (${pastBookings.length})`
          )}
        </button>
      </nav>

      <div className="bookings__list">
        {isLoading &&
          [1, 2, 3].map((i) => (
            <div key={i} className="booking-card">
              <Skeleton
                variant="rounded"
                width={60}
                height={78}
                sx={{ borderRadius: "10px" }}
              />

              <div style={{ flex: 1 }}>
                <Skeleton
                  variant="text"
                  width="45%"
                  height={24}
                  sx={{ mb: 1 }}
                />
                <div style={{ display: "flex", gap: "14px" }}>
                  <Skeleton variant="text" width={110} height={18} />
                  <Skeleton variant="text" width={65} height={18} />
                  <Skeleton variant="text" width={90} height={18} />
                </div>
              </div>

              <Skeleton
                variant="rounded"
                width={95}
                height={36}
                sx={{ borderRadius: "8px" }}
              />
            </div>
          ))}

        {isError && !isLoading && (
          <div className="bookings__empty">
            <div className="bookings__empty-icon bookings__empty-icon--error">
              <ErrorOutlineOutlinedIcon />
            </div>
            <h2 className="bookings__empty-title">
              Не удалось загрузить бронирования
            </h2>
            <p className="bookings__empty-text">
              Произошла ошибка при загрузке данных. Попробуйте повторить попытку
            </p>
            <Btn variant="contained" onClick={fetchBookings}>
              Повторить попытку
            </Btn>
          </div>
        )}

        {!isError && !isLoading && currentList.length === 0 && (
          <div className="bookings__empty">
            <div className="bookings__empty-icon">
              <SearchOffOutlinedIcon />
            </div>

            {officeId || date ? (
              <>
                <h2 className="bookings__empty-title">
                  Бронирования не найдены
                </h2>
                <p className="bookings__empty-text">
                  Попробуйте изменить параметры фильтрации или сбросить фильтры
                </p>
                <Btn
                  variant="contained"
                  onClick={() => {
                    setOfficeId("");
                    setDate("");
                  }}
                >
                  Сбросить фильтры
                </Btn>
              </>
            ) : (
              <>
                <h2 className="bookings__empty-title">
                  {tab === "upcoming"
                    ? "Нет предстоящих бронирований"
                    : "Нет прошедших бронирований"}
                </h2>
                <p className="bookings__empty-text">
                  Выберите переговорную комнату и забронируйте удобное время
                </p>
                <Btn variant="contained" onClick={() => navigate("/rooms")}>
                  Забронировать переговорную
                </Btn>
              </>
            )}
          </div>
        )}

        {!isError &&
          !isLoading &&
          currentList.map((item) => {
            const startDate = parseISO(item.startsAt);
            const endDate = parseISO(item.endsAt);

            return (
              <BookingCard
                key={item.id}
                month={format(startDate, "LLLL", { locale: ru }).toUpperCase()}
                day={format(startDate, "d")}
                title={item.title}
                room={item.room?.name || ""}
                floor={`${item.room?.floor || 1} этаж`}
                time={`${format(startDate, "HH:mm")}–${format(endDate, "HH:mm")}`}
                isPast={tab === "past"}
                onCancel={() => setSelectedBooking(item)}
              />
            );
          })}
      </div>

      {selectedBooking && (
        <BookingCancel
          open={Boolean(selectedBooking)}
          onClose={() => setSelectedBooking(null)}
          onConfirm={handleConfirmCancel}
          title={selectedBooking.title}
          room={selectedBooking.room?.name || ""}
          floor={`${selectedBooking.room?.floor || 1} этаж`}
          date={`${format(parseISO(selectedBooking.startsAt), "EEEE, d MMMM, HH:mm", { locale: ru })} - ${format(parseISO(selectedBooking.endsAt), "HH:mm")}`}
        />
      )}
    </main>
  );
}

export default BookingsPage;
