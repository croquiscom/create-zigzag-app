import spaces from 'one-spaces';
import React from 'react';
import { useCallback } from 'react';
import linkImg from './images/ic-arrow-link@2x.png';
import DeafultImg from './images/img-popup-default@2x.png';
import FireCrackerImg from './images/img-popup-win-main@2x.png';
import RewardImg from './images/img-popup-win-point@2x.png';
import styles from './Popup.scss';

interface Content {
  is_participated_user?: boolean;
  event_error?: string;
}

const renderErrorMessage = (event_error?: string, closePopup ?: () => void) => {

  const defaultPopupClick = useCallback((e) => { e.stopPropagation(); }, []);
  const goToInquirement = useCallback((e) => {
    e.stopPropergation();
    window.location.href = 'zigzag:///my_page';
  }, []);

  switch (event_error) {
    case 'already_participated':
      return(
      <div className={spaces(styles['popup-content'])} onClick={defaultPopupClick}>
        <span className={styles['default-img']}><img src={DeafultImg} /></span>
        <span className={styles['default-message']}>이미 응모하셨어요.</span>
        <button className={styles['point-btn']} onClick={closePopup}>확인</button>
      </div>
      );
    case 'exceeded_the_participants_limit':
      return(
        <div className={spaces(styles['popup-content'])} onClick={defaultPopupClick}>
          <span className={styles['default-img']}><img src={DeafultImg} /></span>
          <span className={styles['default-message']}>오늘 이벤트는 마감되었습니다.<br/>내일 다시 참여해 주세요.</span>
          <button className={styles['point-btn']} onClick={closePopup}>확인</button>
        </div>
      );

    case 'event_ends_on_weekend':
      return(
        <div className={spaces(styles['popup-content'])} onClick={defaultPopupClick}>
          <span className={styles['default-img']}><img src={DeafultImg} /></span>
          <span className={styles['default-message']}>오늘은 이벤트를<br/>응모하실 수 없습니다.</span>
          <button className={styles['point-btn']} onClick={closePopup}>확인</button>
        </div>
      );

    default:
      return(
        <div className={spaces(styles['popup-content'])} onClick={defaultPopupClick}>
          <span className={styles['default-img']}><img src={DeafultImg} /></span>
          <span className={styles['default-message']}>정상 응모가 되지 않았습니다.<br/>오류가 지속되면<br/>문의하기를 이용해주세요.</span>
          <span className={styles['default-link']} onClick={goToInquirement}>마이페이지 > 앱 문의<img src={linkImg} /></span>
          <button className={styles['point-btn']} onClick={closePopup}>확인</button>
        </div>
      );
  }
};

const renderRewordMessage = () => {

  const goToZpoint = useCallback(() => { window.location.href = 'zigzag:///zpay_points'; }, []);
  const defaultPopupClick = useCallback((e) => { e.stopPropagation(); }, []);

  return(
    <div className={spaces(styles['popup-content'], styles['reward-popup'])} onClick={defaultPopupClick}>
      <span className={styles.firecracker}><img src={FireCrackerImg} /></span>
      <strong className={styles.title}>당첨 축하드려요!</strong>
      <span className={styles.reward}><img src={RewardImg} /></span>
      <span className={styles.duration}>유효기간 14일</span>
      <button className={styles['point-btn']} onClick={goToZpoint}>포인트 확인하기</button>
    </div>
  );
};

const Content = ({ event_error, closePopup }: any) => {
  return(
    <>{event_error ? renderErrorMessage(event_error, closePopup) : renderRewordMessage()}</>
  );
};

export default Content;
