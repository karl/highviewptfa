import React from "react";
import { Footer } from "./Footer";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <img className={styles.logo} src="/static/logo.png" alt="" />

          <h1 className={styles.title}>High View Primary PTFA</h1>

          <div className={styles.section}>
            <img
              className={styles.poster}
              src="/static/winter-mufti-day-2020-12-04.png"
              alt="Mufti Day Friday 4th December 2020. In exchange for a £1 donation. Due to COVID 19 payment must be made electronically. Thank you for you continued support. Email committe@highviewptfa.org.uk."
            />
            <h2>❄️ Winter Mufti Day ❄️</h2>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};
