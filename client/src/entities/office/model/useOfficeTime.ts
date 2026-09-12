import { useState, useEffect } from "react";

function useOfficeTime(timezone?: string) {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!timezone) {
      setTime("--");
      return;
    }
    const updateTime = () => {
      const formatted = new Intl.DateTimeFormat("ru-RU", {
        timeZone: timezone,
        timeStyle: "short",
      }).format(new Date());
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, [timezone]);

  return time;
}

export default useOfficeTime;
