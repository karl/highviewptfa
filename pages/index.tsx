import Head from "next/head";
import { Footer } from "../src/Footer";

const Home = () => (
  <>
    <div className="container">
      <Head>
        <title>High View Primary PTFA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <img className="logo" src="/logo.png" alt="" />

        <h1 className="title">High View Primary PTFA</h1>

        <p className="description">Site coming soon! 👷🏼‍♀️👷🏻‍♂️</p>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .logo {
          text-align: center;
          width: 100px;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          color: #005826;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background: #f4faf5;
          color: #1f2e22;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
    <Footer />
  </>
);

export default Home;
