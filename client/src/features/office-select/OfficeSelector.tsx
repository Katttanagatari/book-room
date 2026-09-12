import { MenuItem, Select } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import useOffice from "../../entities/office/model/useOffice";

interface OfficeSelectorProps {
  value: string;
  onChange: (officeId: string, initialTime: string) => void;
}

function OfficeSelector({ value, onChange }: OfficeSelectorProps) {
  const { offices, selectedOffice, timeInselectedOffice } = useOffice(value);

  const handleSelectOffice = (officeId: string) => {
    const office = offices.find((o) => o.id === officeId);
    let initialTime = "";
    if (office?.timezone) {
      initialTime = new Intl.DateTimeFormat("ru-RU", {
        timeZone: office.timezone,
        timeStyle: "short",
      }).format(new Date());
    }
    onChange(officeId, initialTime);
  };

  return (
    <div className="rooms__office-selector">
      <Select
        className="rooms__office-select"
        displayEmpty
        variant="standard"
        disableUnderline
        IconComponent={ExpandMoreIcon}
        sx={{
          fontSize: 24,
          fontWeight: 600,
          color: selectedOffice
            ? "var(--color-text)"
            : "var(--color-text-secondary)",

          "& .MuiSelect-icon": {
            color: "#000",
            right: "-5px",
          },
        }}
        value={value}
        onChange={(e) => handleSelectOffice(e.target.value)}
      >
        <MenuItem value="">Выберите офис</MenuItem>
        {offices.map((el) => (
          <MenuItem key={el.id} value={el.id}>
            {el.name}
          </MenuItem>
        ))}
      </Select>

      <div
        className={`rooms__office-info ${
          selectedOffice ? "rooms__office-info--selected" : ""
        }`}
      >
        <span>{selectedOffice?.address || "Адрес не выбран"}</span>

        <span className="rooms__office-info-dot" />

        <span className="rooms__office-time">
          <span>Местное время:</span>
          <span className="rooms__office-time-value">
            {timeInselectedOffice}
          </span>
        </span>
      </div>
    </div>
  );
}

export default OfficeSelector;
