import { useState, useCallback } from 'react';

export const useUserInfo = () => {
  const [user, setUser] = useState(null);
  const setCurrentUser = useCallback((currentUserInfo): void => {
    setUser(currentUserInfo);
  }, []);

  return {
    user,
    setCurrentUser
  }
}