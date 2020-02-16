import React, { useState } from 'react';
import AuthMobile from './AuthMobile';
import AuthToken from './AuthToken';
import CloseImg from './images/ic-24-close@2x.png';
import styles from './Popup.scss';
import { useCallback } from 'react';

const Auth = (props: any) => {

  const { closePopup } = props;
  const [is_available, setIsAvailable] = useState(false);
  const [mobile_tel, setMobileTel] = useState('');
  const [token, setToken] = useState('');

  return(
    <div className={styles['auth-wrapper']} onClick={useCallback((e) => e.stopPropagation(), [])}>
      <span className={styles['auth-close']} data-auth={true} onClick={useCallback(() => { closePopup(); }, [])}><img src={CloseImg} /></span>
      <div className={styles['auth-title']}>휴대폰 번호인증</div>
      <div className={styles['auth-subtitle']}>번호 인증 후 이벤트에 참여해주세요</div>
      {<AuthMobile setIsAvailable={setIsAvailable} setMobileTel={setMobileTel} mobile_tel={mobile_tel} />}
      {is_available && <AuthToken mobile_tel={mobile_tel} token={token} setToken={setToken} close={close} />}
    </div>
  );
};

export default Auth;
