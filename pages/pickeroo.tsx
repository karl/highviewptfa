import Head from "next/head";
import Pickeroo, { Theme } from "../src/Pickeroo/Pickeroo";
import { SharedHead } from "../src/SharedHead";
import { useState } from "react";

const divider = "•";

const PickerooPage = ({ defaultTitle, defaultNames, defaultTheme }) => {
  const [data, setData] = useState({
    title: defaultTitle,
    names: defaultNames,
    theme: defaultTheme,
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
        onChange={({ title, names, theme }) => {
          setData({ title, names, theme });

          var query = new URLSearchParams(window.location.search);
          query.set("title", title);
          query.set("names", names.join(divider));
          query.set("theme", theme);
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
  const defaultTitle = query.title ?? "";
  const defaultNames = query.names?.split(divider) ?? [];
  const defaultTheme = query.theme ?? Theme.Robots;

  return {
    props: {
      defaultTitle,
      defaultNames,
      defaultTheme,
    },
  };
};

export default PickerooPage;
