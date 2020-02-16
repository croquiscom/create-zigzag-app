import React, { useRef, useState } from 'react';
import { useCallback } from 'react';
// import { requestAuthenticationToken } from '../../../api';
// import { EventType } from '../../../api/types';
// import Utils from '../../../utils/Utils';
import styles from './Popup.scss';

const AuthMobile = (props: any) => {

  const { setMobileTel, mobile_tel, setIsAvailable } = props;
  const inputRef = useRef(null);

  const [error_code, setErrorCode] = useState('');
  const [is_sended, setIsSended] = useState(false);
  const [is_loading, setIsLoading] = useState(false);

  const onChange = (e: any) => { setMobileTel(e.target.value); };

  const sendToken = async (mobile_number: string) => {

    setIsLoading(true);

    // const { validated } = Utils.getValidatedPhoneNumber(mobile_number);
    // if (!validated) {
    //   setErrorCode('mobile_number_required');
    //   setIsLoading(false);
    //   (inputRef as any).current.classList.add(styles.warning);
    //   (inputRef as any).current.focus();
    //   return false;
    // }

    // const args = { input: { event_type: EventType.EVERY_TIME_202002, mobile_number }};
    // setIsSended(true);
    // try {
    //   const { data } = await requestAuthenticationToken(args);
    //   const { success } = data.requestAuthenticationTokenForEvent;
    //   if (!success) {
    //     setErrorCode('already_assigned');
    //   } else {
    //     setIsAvailable(true);
    //     setErrorCode('');
    //   }

    // } catch (e) {
    //   const { message } = e;
    //   setErrorCode(message);
    // } finally {
    //   setIsLoading(false);
    //   (inputRef as any).current.focus();
    // }
  };

  const renderErrorMessage = () => {
    switch (error_code) {
      case 'mobile_number_already_participated':
        return '이미 참여한 핸드폰 번호입니다.';
      case 'mobile_number_required':
        return '핸드폰 번호를 입력해주세요.';
      case 'mobile_number_is_not_valid':
        return '핸드폰 번호를 다시 입력해주세요.';
      case 'already_assigned':
        return '이미 인증된 핸드폰 번호입니다.';
      default:
        return '인증요청을 실패하였습니다.';
    }
  };

  const renderButtonMessage = () => {
    if (is_loading) { return '전송 중'; }
    return is_sended ? '재발송' : '인증받기';
  };

  const btnClassName = is_loading ? styles['is-loading'] : '';

  const onBlur = () => {
    window.scrollTo(0, 0);
    (inputRef as any).current.classList.remove(styles.warning);
    setErrorCode('');
  };

  return(
    <>
      <div className={styles['input-wrapper']}>
        <input ref={inputRef} type='tel' name='mobile_number' maxLength={11} onChange={onChange} onBlur={onBlur} />
        <button className={btnClassName} onClick={useCallback(() => { if (is_loading) { return false; } sendToken(mobile_tel); }, [mobile_tel])}>{renderButtonMessage()}</button>
      </div>
      {error_code && <div className={styles.message}>{renderErrorMessage()}</div>}
    </>
  );
};

export default AuthMobile;
