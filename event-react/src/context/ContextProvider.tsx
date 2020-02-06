import React from 'react';
import { EventContext } from './EventContext';
import { UserContext } from './UserContext';
import { useEventInfo } from '../hooks/useEventInfo';
import { useUserInfo } from '../hooks/useUserInfo';
import { usePopup } from '../hooks/usePopup';

const ContextProvider = (props: any) => {
  const event = useEventInfo();
  const user = useUserInfo();

  return(
    <EventContext.Provider value={event}>
      <UserContext.Provider value={user}>
        {props.children}
      </UserContext.Provider>
    </EventContext.Provider>
  )
};

export default ContextProvider;