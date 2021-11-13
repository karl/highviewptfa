import React from "react";
import { Footer } from "./Footer";
import styles from "./Home.module.css";
import Image from "next/image";

export const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <Image
            className={styles.logo}
            src="/static/logo.png"
            alt=""
            width={100}
            height={78.5}
          />

          <h1 className={styles.title}>High View Primary PTFA</h1>

          <div className={styles.section}>
            <h2>Why we fundraise?</h2>

            <Image
              width={424}
              height={600}
              layout={"intrinsic"}
              src="/static/why-we-fundraise.jpg"
              alt="An image of some of the ways your PTFA donations have helped High View Primary School."
            />
          </div>

          <div className={styles.section}>
            <h2>What is the PTFA?</h2>

            <p>What is the PTFA and what do they do?</p>
            <p>
              High View PTFA (Parents, Teachers and Friends Association), is an
              open, friendly and active group of parents and carers, with
              additional support from school staff and Governors.
            </p>
            <p>
              The aim of the PTFA is to raise money to purchase resources for
              the school which will benefit the children and will help to
              enhance their learning and every pound we raise is of direct
              benefit to the pupils of the school.
            </p>
            <p>
              Over the last 2 years, following a variety of events, we were able
              to purchase the following for the school:
            </p>
            <ul>
              <li>Audio Equipment and speakers for school performances</li>
              <li>Clever touch boards for the classrooms</li>
              <li>Defibrillator</li>
              <li>18 Glockenspiels</li>
              <li>Greenhouse</li>
              <li>Year 5 &6 Netball and Football Kits</li>
              <li>Upgrade of PC’s & Software</li>
              <li>Crackers for the children’s Christmas Lunch</li>
            </ul>
            <p>
              Now your child has started at High View Primary, you are
              automatically a member of the PTFA and with this we would ask you
              to please support us by offering your time to help with a variety
              of different events, especially our Summer and Christmas Fairs.
            </p>
            <p>
              If you are passionate about making a difference, enthusiastic and
              willing to get stuck in, why not consider joining the Committee
              where you can feel part of the school community, develop
              friendships and who knows, you may even discover a talent for
              event planning and fundraising!
            </p>
            <p>
              So, whether you’re a stay at home parent, retired grandparent or
              work full or part time, any support you can offer will be greatly
              appreciated! New and fresh ideas are always welcomed, so why not
              pop along to one of our meetings which are usually held at the
              school once or twice a term, with coffee, tea and biscuits
              provided.
            </p>
            <p>
              We would love to hear from you and even if you may not want to be
              on the committee, but feel you can support us in other ways with
              events, please contact a member of the PTFA committee.
            </p>
            <p>
              To contact the PTFA please email{" "}
              <a href="mailto:committee@highviewptfa.org.uk">
                committee@highviewptfa.org.uk
              </a>
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};
