import { useState, useCallback } from 'react';

export const usePopup = () => {
  const [popup, setPopup] = useState(null);
  const setCurrentPopup = useCallback((currentPopup): void => {

    // popup_type이 LOADING 이나 CLOSE 일 경우 => 컨텐츠가 정해져있다. (로딩내용, 셧다운내용)

    setPopup(currentPopup);
  }, []);

  return {
    popup,
    setCurrentPopup
  }
}