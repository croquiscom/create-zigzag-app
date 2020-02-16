import { createContext } from 'react';

export const default_popup = {
  main_ref: null,
  is_visible: false,
  show: () => {},
  hide: () => {},
  updateMainRef: () => {},
};

export interface Popup {
  main_ref: any;
  is_visible: boolean;
  show: () => void;
  hide: () => void;
  updateMainRef: (ref: any) => void;
}

export const PopupContext = createContext<Popup>(default_popup);
