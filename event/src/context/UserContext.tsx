import { createContext } from 'react';

export interface UserInfo {
  email: string;
  mobile_tel: string;
  is_authorized_user: boolean;
  is_participated_user: boolean;
}

export const default_user = {
  user: null,
  setCurrentUser: () => {}
};

export interface User {
  user: UserInfo | null,
  setCurrentUser: (currentUser: UserInfo) => void;
}

export const UserContext = createContext<User>(default_user);