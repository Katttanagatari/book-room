import { MenuItem, Select } from "@mui/material";

import "./BookingDuration.css";

interface BookingDurationProps {
  value: number;
  onChange: (value: number) => void;
  disable: boolean;
}

function BookingDuration({ value, onChange, disable }: BookingDurationProps) {
  return (
    <div className="booking__duration">
      <span className="booking__duration-label">ДЛИТЕЛЬНОСТЬ</span>

      <Select
        value={value}
        disabled={disable}
        variant="standard"
        disableUnderline
        className="booking__duration-select"
        onChange={(e) => onChange(Number(e.target.value))}
        renderValue={(selected) => `${selected} мин`}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          boxSizing: "border-box",

          fontSize: "16px",

          "& .MuiSelect-select": {
            WebkitTextFillColor: disable
              ? "var(--color-text-disable)"
              : "#1f2435",
          },

          "& .MuiSelect-icon": {
            right: "8px",
            color: disable ? "var(--color-text-disable)" : "#1f2435",
          },
        }}
      >
        <MenuItem value={15}>15 мин</MenuItem>
        <MenuItem value={30}>30 мин</MenuItem>
        <MenuItem value={45}>45 мин</MenuItem>
        <MenuItem value={60}>1 час</MenuItem>
        <MenuItem value={75}>1 ч 15 мин</MenuItem>
        <MenuItem value={90}>1 ч 30 мин</MenuItem>
        <MenuItem value={105}>1 ч 45 мин</MenuItem>
        <MenuItem value={120}>2 часа</MenuItem>
      </Select>
    </div>
  );
}

export default BookingDuration;
