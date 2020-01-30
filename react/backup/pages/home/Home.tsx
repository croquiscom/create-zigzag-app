import React from 'react';

const styles = require('./Home.scss');

export default () => {
  return (
    <div className={styles.home}>
      <img
        width='32px'
        height='32px'
        alt='형래님...'
        src='https://ca.slack-edge.com/T02NKNV5B-UGVQKNG6A-f3aa69bd8849-72'
        className={styles.avatar}
      />
      <span className={styles.comment}>홈 화면입니다...</span>
    </div>
  );
};
