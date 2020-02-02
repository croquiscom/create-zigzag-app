import { IEventContext } from '../context/appContext';

export default function reducer(state: IEventContext, { type, payload }: any) {
  switch(type) {
    case 'UPDATE_USER_AUTH':
      return {
        ...state,
        is_authorized_user: payload
      }
    default:
      return state;  
  }
}
