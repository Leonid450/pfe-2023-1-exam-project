import React from 'react';
import styles from './Footer.module.sass';
import CONSTANTS from '../../constants';

const Footer = (props) => {
  const topFooterItems = (item) => (
    <div key={item.title}>
      <h4>{item.title}</h4>
      {item.items.map((i) => (
        <a key={i} href="https://google.com">
          {i}
        </a>
      ))}
    </div>
  );

  const topFooter = () => {
    return CONSTANTS.FooterItems.map((item) => topFooterItems(item));
  };

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerTop}>
        <div>{topFooter()}</div>
      </div>
    </div>
  );
};

export default Footer;
