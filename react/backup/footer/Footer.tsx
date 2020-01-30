import React from 'react';

const styles = require('./Footer.scss');

export default () => {
  return (
    <footer className={styles.footer}>
      <address className={styles.address}>
        <span className={styles.info}>크로키닷컴(주) |</span>
        <span className={styles.info}>대표 서정훈 |</span>
        <span className={styles.info}>사업자등록번호 214-88-91525</span>
      </address>
    </footer>
  );
};
