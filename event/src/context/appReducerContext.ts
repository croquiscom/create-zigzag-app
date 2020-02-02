import { createContext, Dispatch } from 'react';
import { IEventContext, initialContextState } from './appContext';

interface initialContextState {
  state: IEventContext;
  dispatch: Dispatch<any>;
};

const Context = createContext<initialContextState>({ state: initialContextState, dispatch: () => {}});

export default Context;
