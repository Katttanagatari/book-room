import getOffices, { type Office } from "../api/offices";
import { useState, useEffect } from "react";
import useOfficeTime from "./useOfficeTime";

function formatAddress(address: string): string {
  if (!address) return "";
  return address.includes(", ")
    ? address.split(", ").slice(1).join(", ")
    : address;
}

function useOffice(selected: string) {
  const [offices, setOffices] = useState<Office[]>([]);

  useEffect(() => {
    async function loadOffices(): Promise<void> {
      try {
        const data = await getOffices();
        const formattedOffices = data.items.map((office) => ({
          ...office,
          address: formatAddress(office.address),
        }));
        setOffices(formattedOffices);
      } catch (e) {
        console.log(e);
      }
    }

    loadOffices();
  }, []);

  const selectedOffice = offices.find((el) => el.id === selected);
  const timeInselectedOffice = useOfficeTime(selectedOffice?.timezone);

  return { offices, selectedOffice, timeInselectedOffice };
}

export default useOffice;
