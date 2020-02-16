import React from 'react';
import { useEventInfo } from '../hooks/useEventInfo';
import { usePopup } from '../hooks/usePopup';
import { useUserInfo } from '../hooks/useUserInfo';
import { EventContext } from './EventContext';
import { PopupContext } from './PopupContext';
import { UserContext } from './UserContext';

const ContextProvider = (props: any) => {
  const event = useEventInfo();
  const user = useUserInfo();
  const popup = usePopup();

  return(
    <PopupContext.Provider value={popup}>
      <EventContext.Provider value={event}>
        <UserContext.Provider value={user}>
          {props.children}
        </UserContext.Provider>
      </EventContext.Provider>
    </PopupContext.Provider>
  );
};

export default ContextProvider;
