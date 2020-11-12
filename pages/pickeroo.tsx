import Head from "next/head";
import { useState } from "react";
import Pickeroo from "../src/Pickeroo/Pickeroo";

const PickerooPage = () => {
  const [title, setTitle] = useState<string>("");

  return (
    <>
      <div className="container">
        <Head>
          <title>Pickeroo - High View Primary PTFA</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Pickeroo />

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
    </>
  );
};

export default PickerooPage;
