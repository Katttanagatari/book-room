import { MenuItem, Select } from "@mui/material";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import type { Office } from "../../../entities/office/api/offices";
import "./BookingOffice.css";

interface BookingOfficeProps {
  value: string;
  onChange: (officeId: string) => void;
  offices: Office[];
  disable?: boolean;
}

function BookingOffice({
  value,
  onChange,
  offices,
  disable = false,
}: BookingOfficeProps) {
  return (
    <div className="booking__office">
      <span className="booking__office-label">ОФИС</span>

      <div
        className={`booking__office-control ${disable ? "booking__office-control--disabled" : ""}`}
      >
        <BusinessOutlinedIcon
          sx={{
            width: "20px",
            marginRight: "6px",
            color: disable ? "var(--color-text-disable)" : "#475569",
          }}
        />

        <Select
          disabled={disable}
          value={value}
          displayEmpty
          variant="standard"
          disableUnderline
          className="booking__office-select"
          onChange={(e) => onChange(e.target.value)}
          renderValue={(selected) => {
            if (!selected) return "Все офисы";
            const office = offices.find((o) => o.id === selected);
            return office?.name || "Все офисы";
          }}
          sx={{
            width: "100%",
            fontSize: "15px",
            color: disable ? "var(--color-text-disable)" : "#1f2435",
            "& .MuiSelect-select": {
              padding: 0,
              display: "flex",
              alignItems: "center",
            },
            "& .MuiSelect-icon": {
              right: 0,
              color: disable ? "var(--color-text-disable)" : "#1f2435",
            },
          }}
          MenuProps={{
            sx: {
              "& .MuiPaper-root": {
                width: "200px",
              },
            },
          }}
        >
          <MenuItem value="">Все офисы</MenuItem>
          {offices.map((el) => (
            <MenuItem key={el.id} value={el.id}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default BookingOffice;
