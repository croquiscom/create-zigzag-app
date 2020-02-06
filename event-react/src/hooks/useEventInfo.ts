import { useState, useCallback } from 'react';

export const useEventInfo = () => {
  const [event, setEvent] = useState(null);
  const setCurrentEvent = useCallback((currentEventInfo): void => {
    setEvent(currentEventInfo);
  }, []);

  return {
    event,
    setCurrentEvent
  }
}