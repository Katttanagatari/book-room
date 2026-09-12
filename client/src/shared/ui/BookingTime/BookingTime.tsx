import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "./BookingTime.css";

interface BookingTimeProps {
  value: string;
  onChange: (value: string) => void;
  disable: boolean;
}

function BookingTime({ value, onChange, disable }: BookingTimeProps) {
  /////
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numbers = event.target.value.replace(/\D/g, "").slice(0, 4);

    let formattedTime = numbers;

    if (numbers.length > 2) {
      formattedTime = `${numbers.slice(0, 2)}:${numbers.slice(2)}`;
    }

    onChange(formattedTime);
  };
  /////

  return (
    <div className="booking__time">
      <span className="booking__time-label">ВРЕМЯ НАЧАЛА</span>

      <div className="booking__time-control">
        <AccessTimeIcon
          sx={{
            width: "20px",
            marginRight: "5px",
            color: disable ? "var(--color-text-disable)" : "var(--color-text)",
          }}
        />
        <input
          disabled={disable}
          className="booking__time-input"
          type="text"
          inputMode="numeric"
          placeholder="--:--"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default BookingTime;
