import apiFetch from "../../../shared/api/api";

export interface User {
  id: string;
  login: string;
  displayName: string;
  email: string;
  avatarUrl: string | null;
  initials: string;
}

function getUser(): Promise<User> {
  return apiFetch<User>("/me");
}

export default getUser;
