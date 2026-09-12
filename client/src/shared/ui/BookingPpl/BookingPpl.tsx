import { Select, MenuItem } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import "./BookingPpl.css";

interface BookingPplProps {
  value: number;
  onChange: (value: number) => void;
  disable: boolean;
}

function BookingPpl({ value, onChange, disable }: BookingPplProps) {
  return (
    <div className="booking__capacity">
      <span className="booking__capacity-label">ВМЕСТИМОСТЬ</span>

      <div className="booking__capacity-control">
        <PeopleAltOutlinedIcon
          sx={{
            width: "20px",
            marginRight: "5px",
            color: disable ? "var(--color-text-disable)" : "#475569",
          }}
        />

        <Select
          disabled={disable}
          renderValue={(selected) => `Мин. ${selected} чел.`}
          value={value}
          variant="standard"
          disableUnderline
          className="booking__capacity-select"
          onChange={(event) => onChange(Number(event.target.value))}
          sx={{
            "& .MuiSelect-select": {
              WebkitTextFillColor: disable
                ? "var(--color-text-disable)"
                : "#1f2435",
            },

            "& .MuiSelect-icon": {
              right: 0,
              color: disable ? "var(--color-text-disable)" : "#1f2435",
            },
          }}
          MenuProps={{
            sx: {
              "& .MuiPaper-root": {
                width: "120px",
                marginLeft: "-10px",
              },
            },
          }}
        >
          <MenuItem value={2}>2 чел.</MenuItem>
          <MenuItem value={4}>4 чел.</MenuItem>
          <MenuItem value={6}>6 чел.</MenuItem>
          <MenuItem value={8}>8 чел.</MenuItem>
          <MenuItem value={10}>10 чел.</MenuItem>
          <MenuItem value={12}>12 чел.</MenuItem>
        </Select>
      </div>
    </div>
  );
}

export default BookingPpl;
