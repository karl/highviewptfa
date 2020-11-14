import React, { useState } from "react";
import md5 from "md5";
import NameInput from "./NameInput";
import Carousel from "./Carousel";

import styles from "./Pickeroo.module.css";

const TitleInput = ({ value, onChange }) => {
  return (
    <input
      className={styles.TitleInput}
      placeholder="Title (optional)"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

const Name = ({ name }) => {
  const hash = md5(name);
  return (
    <div className={styles.Name}>
      <img src={`https://robohash.org/${hash}.png?set=set1`} alt="" />
      <div className={styles.NameText}>{name}</div>
    </div>
  );
};

type AppProps = {
  title: string;
  names: string[];
  onChange: ({ title, names }: { title: string; names: string[] }) => void;
};

const App = ({ title, names, onChange }: AppProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [revolutions, setRevolutions] = useState(0);

  return (
    <div className={styles.App}>
      <div className={styles.Picker}>
        <img className={styles.Logo} src="/static/logo.png" alt="" />
        <div className={styles.Title}>{title}</div>
        <div className={styles.Names}>
          {names.length === 0 && (
            <div className={styles.NoNames}>
              No names
              <div className={styles.Hint}>Scroll down and enter names</div>
            </div>
          )}

          <div style={{ opacity: selectedIndex === null ? 0.1 : 1 }}>
            <Carousel selectedIndex={selectedIndex} revolutions={revolutions}>
              {names.map((name, i) => (
                <Name key={i} name={name} />
              ))}
            </Carousel>
          </div>
        </div>
        <button
          className={styles.Shuffle}
          disabled={names.length === 0}
          onClick={() => {
            const index = Math.floor(Math.random() * names.length);
            setSelectedIndex(index);
            setRevolutions(revolutions + 1);
          }}
        >
          ↺
        </button>
      </div>
      <div className={styles.Editor}>
        <TitleInput
          value={title}
          onChange={(newTitle) => {
            onChange({ title: newTitle, names: names });
          }}
        />
        <NameInput
          value={names}
          onChange={(newNames) => {
            onChange({ title, names: newNames });
            setSelectedIndex(null);
          }}
        />
        <div className={styles.Hint}>{names.length} names.</div>
        <div className={styles.Hint}>
          After entering your names, save this page to your browser bookmarks
          for quick access to this list.
        </div>
      </div>
    </div>
  );
};

export default App;
