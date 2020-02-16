import React, { useContext, useState } from 'react';
import { useCallback } from 'react';
// import { authorizeMobileToken } from '../../api';
// import { UserContext } from '../../../context/UserContext';
import styles from './Popup.scss';

const AuthToken = (props: any) => {

  const { mobile_tel, token, setToken, close } = props;
  const [error_code, setErrorCode] = useState('');
  const [is_loading, setIsLoading] = useState(false);

  const onChange = (e: any) => {
    setToken(e.target.value);
    setIsLoading(false);
  };

  const sendToken = async (user_token: string) => {
    if (!is_loading) { setIsLoading(true); }

    const args = { input: { mobile_number: mobile_tel, token: user_token }};
    try {
      // const { data } = await authorizeMobileToken(args);
      // const { authorizeMobileTokenForEvent } = data;
      // if (authorizeMobileTokenForEvent) {
      //   close(true);
      // }

    } catch (e) {
      const { message } = e;
      setErrorCode(message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderErrorMessage = () => {
    switch (error_code) {
      case 'token_is_not_valid':
        return '유효하지 않은 인증번호입니다.';
      case 'not_found_user_account':
        return '해당 번호로 계정을 찾을 수 없습니다.';
      default:
        return '인증을 실패하였습니다.';
    }
  };

  const btnClassName = is_loading ? styles['is-loading'] : '';

  const onBlur = () => {
    setErrorCode('');
    window.scrollTo(0, 0);
  };

  return(
    <>
      <div className={styles['input-wrapper']}>
        <input type='tel' name='mobile_tel' maxLength={11} onChange={onChange} onBlur={onBlur} />
        <button className={btnClassName} onClick={useCallback(() => { if (is_loading) { return false; } sendToken(token); }, [token])}>인증완료</button>
      </div>
      {error_code && <div className={styles.message}>{renderErrorMessage()}</div>}
    </>
  );
};

export default AuthToken;
