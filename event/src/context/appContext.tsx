import { createContext } from 'react';


export enum EVENT_STATUS {
  WAITING,
  OPEN,
  CLOSED
}

export enum EVENT_TYPE {
  SIMPLE,
  TIME_DEAL,
  LIMIT_DEAL
}

export interface IEventContext{
  event_status: EVENT_STATUS;
  event_type: EVENT_TYPE;
  is_participated_user: boolean;
  is_authorized_user: boolean;
  event_info: any;
  user_info: any;
}

export const initialContextState = {
  event_status: EVENT_STATUS.OPEN,
  event_type: EVENT_TYPE.SIMPLE,
  is_participated_user: false,
  is_authorized_user: false,
  event_info: null,
  user_info: null
};

export const Context = createContext<IEventContext>(initialContextState);
