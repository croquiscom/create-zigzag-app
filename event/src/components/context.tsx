import { createContext } from 'react';

enum EVENT_STATUS {
  WAITING,
  OPEN,
  CLOSED
}

enum EVENT_TYPE {
  SIMPLE,
  TIME_DEAL,
  LIMIT_DEAL
}

const Context = createContext({
  event_status: EVENT_STATUS.WAITING,
  event_type: EVENT_TYPE.SIMPLE,
  is_participated_user: false,
  is_authorized_user: false,
  event_info: null,
  user_info: null
});

export default Context;
