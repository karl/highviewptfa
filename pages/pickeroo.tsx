import Head from "next/head";
import Pickeroo, { Theme, Mode } from "../src/Pickeroo/Pickeroo";
import { SharedHead } from "../src/SharedHead";
import { useState } from "react";
import { google } from 'googleapis';
import shuffle from 'knuth-shuffle-seeded';
import { truncateSync } from "fs";

const divider = "•";

const PickerooPage = ({
  defaultTitle,
  defaultNames,
  defaultTheme,
  defaultMode,
  isFromSheet = false,
}) => {
  const [data, setData] = useState({
    title: defaultTitle,
    names: defaultNames,
    theme: defaultTheme,
    mode: defaultMode,
  });

  return (
    <>
      <SharedHead />
      <Head>
        <title>Pickeroo - High View Primary PTFA</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mountains+of+Christmas:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Pickeroo
        title={data.title}
        names={data.names}
        theme={data.theme}
        mode={data.mode}
        hideInputs={isFromSheet}
        onChange={(update) => {
          const newData = { ...data, ...update };
          setData(newData);

          var query = new URLSearchParams(window.location.search);
          query.set("title", newData.title);
          query.set("names", newData.names.join(divider));
          query.set("theme", newData.theme);
          query.set("mode", newData.mode);
          history.replaceState(
            null,
            "",
            window.location.pathname + "?" + query.toString()
          );
        }}
      />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { query } = context;

  const sheetId = query.sheetId ?? null;
  if (sheetId) {
    return await getFromSheet(sheetId);
  }

  const defaultTitle = query.title ?? "";
  const defaultNames = query.names?.split(divider) ?? [];
  const defaultTheme = query.theme ?? Theme.Robots;
  const defaultMode = query.mode ?? Mode.Classroom;

  return {
    props: {
      defaultTitle,
      defaultNames,
      defaultTheme,
      defaultMode,
    },
  };
};

export default PickerooPage;

const getFromSheet = async (spreadsheetId: string) => {
  const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_SHEETS_API_KEY });

  const nameDetails = await sheets.spreadsheets.values.get({ spreadsheetId, range: 'Pickeroo!A2:C' });
  const names = nameDetails.data.values.reduce((names, [name, yearAndClass, quantity]) => {
    return [...names, ...Array(parseInt(quantity)).fill(`${name} - ${yearAndClass}`)];
  });
  const shuffledNames = shuffle(names, 0);

  const pickerDetails = await sheets.spreadsheets.values.get({ spreadsheetId, range: 'Pickeroo!E2:G2' });
  const [defaultTitle, defaultTheme, defaultMode] = pickerDetails.data.values[0];

  return {
    props: {
      defaultTitle,
      defaultNames: shuffledNames,
      defaultTheme,
      defaultMode,
      isFromSheet: true,
    },
  };
}
