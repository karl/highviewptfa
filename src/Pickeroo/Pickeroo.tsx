import React, { useEffect, useState } from "react";
import md5 from "md5";
import NameInput from "./NameInput";
import Carousel from "./Carousel";
import Snowflakes from 'magic-snowflakes';
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

const NUMBER_OF_CHRISTMAS_IMAGES = 8;

const hashStr = (str:string) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
      var charCode = str.charCodeAt(i);
      hash += charCode;
  }
  return hash;
}

const getCharacterImage = (theme: Theme, name: string) => {
  if (theme === Theme.Robots) {
    return `https://robohash.org/${md5(name)}.png?set=set1`;
  }

  if (theme === Theme.Christmas) {
    return `/static/christmas/${hashStr(md5(name)) % NUMBER_OF_CHRISTMAS_IMAGES}.png`;
  }

  return "";
};

const Name = ({ name, theme }: { name: string; theme: Theme }) => {
  return (
    <div className={styles.Name}>
      <img src={getCharacterImage(theme, name)} alt="" />
      <div className={styles.NameText}>{name}</div>
    </div>
  );
};

export enum Theme {
  Robots = "robots",
  Christmas = "christmas",
}

type AppProps = {
  title: string;
  names: string[];
  theme: Theme;
  onChange: ({
    title,
    names,
    theme,
  }: {
    title: string;
    names: string[];
    theme: Theme;
  }) => void;
};

const App = ({ title, names, theme, onChange }: AppProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [revolutions, setRevolutions] = useState(0);

  useEffect(() => {
    if (theme === Theme.Christmas) {
      const snowflakes = Snowflakes();
      return () => {
        snowflakes.destroy();
      };
    }
  }, [theme]);

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
                <Name key={i} name={name} theme={theme} />
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
            onChange({ title: newTitle, names: names, theme });
          }}
        />
        <NameInput
          value={names}
          onChange={(newNames) => {
            onChange({ title, names: newNames, theme });
            setSelectedIndex(null);
          }}
        />
        <select
          value={theme}
          onChange={(event) => {
            onChange({ title, names, theme: event.target.value as Theme });
          }}
        >
          <option value={Theme.Robots}>Robot theme</option>
          <option value={Theme.Christmas}>Christmas theme</option>
        </select>
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
