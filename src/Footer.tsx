import React from "react";
import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.section}>
        <div className={styles.item}>
          Contact us via email:{" "}
          <a href="mailto:committee@highviewptfa.org.uk">
            committee@highviewptfa.org.uk
          </a>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.item}>
          <img className={styles.logo} src="/static/gmail-logo.png" alt="" />{" "}
          <a href="http://mail.highviewptfa.org.uk">Committee member email</a>
        </div>
        <div className={styles.item}>
          <img className={styles.logo} src="/static/google-drive-logo.png" alt="" />{" "}
          <a href="http://drive.highviewptfa.org.uk">Committee member drive</a>
        </div>
      </div>
    </footer>
  );
};
