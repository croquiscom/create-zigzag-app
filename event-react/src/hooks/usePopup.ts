import { useState } from 'react';

export const usePopup = () => {
  const [is_visible, setIsVisible] = useState(false);
  const [main_ref, setMainRef] = useState(null);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);
  const updateMainRef = (ref: any) => setMainRef(ref);

  return {
    show,
    hide,
    is_visible,
    main_ref,
    updateMainRef,
  };
};
