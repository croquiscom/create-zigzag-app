import { createContext } from 'react';

export enum POPUP_TYPE {
  CLOSE,
  MOBILE,
  NORMAL,
  LOADING
}

export interface PopupInfo {
  popup_type: POPUP_TYPE
  content ?: React.Component; //NORMAL, MOBILE
  is_shown: boolean;
  is_blocked_dimmed: boolean;
}

export interface Popup {
  popup: PopupInfo | null,
  setCurrentPopup: (currentPopup: PopupInfo) => void;
}

export const default_popup = {
  popup: null,
  setCurrentPopup: () => {}
}

export const PopupContext = createContext<Popup>(default_popup);