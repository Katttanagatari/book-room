import apiFetch from "../../../shared/api/api";

export interface Office {
  id: string;
  name: string;
  address: string;
  timezone: string;
}

interface Offices {
  items: Office[];
}

function getOffices(): Promise<Offices> {
  return apiFetch("/offices");
}

export default getOffices;
