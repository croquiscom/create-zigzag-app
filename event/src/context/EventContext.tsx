import { createContext } from 'react';

export enum EVENT_STATUS {
  WAITING,
  OPEN,
  CLOSED
}

export interface EventInfo {
  event_terminated: boolean;
  event_detail: any;
  server_time: number;
  event_status: EVENT_STATUS;
}

export interface Event {
  event: EventInfo | null,
  setCurrentEvent: (currentEvent: EventInfo) => void;
}

export const default_event = {
  event: null,
  setCurrentEvent: () => {}
};

export const EventContext = createContext<Event>(default_event);