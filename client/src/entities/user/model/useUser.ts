import { useEffect, useState } from "react";
import getUser, { type User } from "../api/user";

function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUserData(): Promise<void> {
      try {
        const data = await getUser();
        const [firstName, lastName] = data.displayName.split(" ");
        setUser({
          ...data,
          displayName: `${firstName} ${lastName[0]}.`,
        });
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    loadUserData();
  }, []);

  return { user, isLoading };
}

export default useUser;
