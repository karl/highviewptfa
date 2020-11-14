import React from "react";
import { Footer } from "./Footer";
import styles from "./Home.module.css";
import Image from "next/image";

export const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <Image className={styles.logo} src="/static/logo.png" alt="" width={100} height={78.5} />

          <h1 className={styles.title}>High View Primary PTFA</h1>

          <div className={styles.section}>
            <Image
              width={463.64}
              height={600}
              layout={"intrinsic"}
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
