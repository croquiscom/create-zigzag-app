import spaces from 'one-spaces';
import React, { useContext } from 'react';
import { useCallback } from 'react';
import { EventContext } from '../../context/EventContext';
import { PopupContext } from '../../context/PopupContext';
import { UserContext } from '../../context/UserContext';
import Auth from './Auth';
import Content from './Content';
import styles from './Popup.scss';

const Popup = () => {

  const { event, setCurrentEvent } = useContext(EventContext);
  const event_error = event?.event_error || '';

  const { user, setCurrentUser } = useContext(UserContext);
  const is_authorized_user = user?.is_authorized_user;

  const { main_ref, hide } = useContext(PopupContext);
  const scrollY = window.scrollY;

  main_ref.current.classList.add(styles.fixed);
  main_ref.current.style.top = `-${scrollY}px`;

  const closeDefaultPopup = useCallback((e) => {
    main_ref.current.classList.remove(styles.fixed);
    main_ref.current.style.top = null;
    window.scrollTo(0, scrollY);

    hide();
  }, []);


  const closePopup = async (e: any) => {
    if (e.target.dataset['auth']) {
      alert('authorized');
    } else {
      closeDefaultPopup(e);
    }
  };


  return(
    <div className={spaces(styles['popup-container'], styles.dimmed)} onClick={closeDefaultPopup}>
      {is_authorized_user ? <Content event_error={event_error} closePopup={closeDefaultPopup} /> :  <Auth closePopup={closePopup} /> }
    </div>
  );
};

export default Popup;
