import Head from "next/head";
import Pickeroo from "../src/Pickeroo/Pickeroo";
import { SharedHead } from "../src/SharedHead";

const PickerooPage = () => {
  return (
    <>
      <SharedHead />
      <Head>
        <title>Pickeroo - High View Primary PTFA</title>
      </Head>
      <Pickeroo />
    </>
  );
};

export default PickerooPage;
