import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import "./BookingDate.css";

import { useState, useRef } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ru } from "date-fns/locale";
import useDate from "../../hooks/useDate";

interface BookingDateProps {
  value: string;
  onChange: (value: string) => void;
  disable?: boolean;
}

function BookingDate({ value, onChange, disable }: BookingDateProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const { minDate, maxDate } = useDate();

  const dateValue = value ? new Date(`${value}T00:00:00`) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <div className="booking__date">
        <span className="booking__date-label">ДАТА</span>

        <div
          ref={anchorRef}
          className={`booking__date-control ${disable ? "booking__date-control--disabled" : ""}`}
          onClick={() => {
            if (!disable) setOpen(true);
          }}
        >
          <CalendarTodayOutlinedIcon
            sx={{
              width: 18,
              height: 18,
              marginRight: "8px",
              color: disable
                ? "var(--color-text-disable)"
                : "var(--color-text)",
            }}
          />

          <span className="booking__date-text">{value || "Выберите дату"}</span>

          <DatePicker
            value={dateValue}
            onChange={(date) => {
              if (!date) return;
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              onChange(`${year}-${month}-${day}`);
              setOpen(false);
            }}
            className={`booking__date-control ${
              disable ? "booking__date-control--disabled" : ""
            }`}
            minDate={minDate}
            maxDate={maxDate}
            open={open}
            onClose={() => setOpen(false)}
            slotProps={{
              popper: {
                anchorEl: anchorRef.current,
              },
              textField: {
                sx: { display: "none" },
              },
              day: {
                sx: {
                  cursor: "pointer",
                  "&.Mui-selected": {
                    backgroundColor: "var(--color-primary)",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default BookingDate;
