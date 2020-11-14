import Head from "next/head";
import Pickeroo from "../src/Pickeroo/Pickeroo";
import { SharedHead } from "../src/SharedHead";
import { useState } from "react";

const divider = '•';

const PickerooPage = ({ defaultTitle, defaultNames }) => {
  const [data, setData] = useState({
    title: defaultTitle,
    names: defaultNames,
  });

  return (
    <>
      <SharedHead />
      <Head>
        <title>Pickeroo - High View Primary PTFA</title>
      </Head>
      <Pickeroo
        title={data.title}
        names={data.names}
        onChange={({ title, names }) => {
          setData({ title, names });

          var query = new URLSearchParams(window.location.search);
          query.set("title", title);
          query.set("names", names.join(divider));
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

  return { props: { defaultTitle, defaultNames } };
};

export default PickerooPage;
