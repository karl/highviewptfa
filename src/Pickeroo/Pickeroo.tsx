import React, { useEffect, useState } from "react";
import md5 from "md5";
import NameInput from "./NameInput";
import Carousel from "./Carousel";
import Snowflakes from "magic-snowflakes";
import styles from "./Pickeroo.module.css";
import { LightRope } from "./LightRope";
import classnames from "classnames";

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

const NUMBER_OF_CHRISTMAS_IMAGES = 22;

const hashStr = (str: string) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i);
    hash += charCode;
  }
  return hash;
};

const getCharacterImage = (theme: Theme, name: string) => {
  if (theme === Theme.Robots) {
    return `https://robohash.org/${md5(name)}.png?set=set1`;
  }

  if (theme === Theme.Christmas) {
    return `/static/christmas/characters/${
      hashStr(md5(name)) % NUMBER_OF_CHRISTMAS_IMAGES
    }.png`;
  }

  return "";
};

const Name = ({ name, theme }: { name: string; theme: Theme }) => {
  const [main, detail] = name.split(' - ');
  return (
    <div className={styles.Name}>
      <img src={getCharacterImage(theme, name)} alt="" />
      <div className={styles.NameText}>{main}</div>
      <div className={styles.NameDetail}>{detail}</div>
    </div>
  );
};

export enum Theme {
  Robots = "robots",
  Christmas = "christmas",
}

export enum Mode {
  Classroom = "classroom",
  Raffle = "raffle",
}

type AppProps = {
  title: string;
  names: string[];
  theme: Theme;
  mode: Mode;
  hideInputs: boolean;
  onChange: (update: {
    title?: string;
    names?: string[];
    theme?: Theme;
    mode?: Mode;
  }) => void;
};

const App = ({ title, names, theme, mode, hideInputs, onChange }: AppProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [revolutions, setRevolutions] = useState(0);

  const [remainingNames, setRemainingNames] = useState(names);
  const [displayNames, setDisplayNames] = useState(names.slice(0, 50));
  const [previousPicks, setPreviousPicks] = useState<string[]>([]);

  useEffect(() => {
    setSelectedIndex(null);
    setRemainingNames(names);
    setDisplayNames(names.slice(0, 50));
    setPreviousPicks([]);
  }, [names]);


  useEffect(() => {
    if (theme === Theme.Christmas) {
      const snowflakes = Snowflakes();
      return () => {
        snowflakes.destroy();
      };
    }
  }, [theme]);

  return (
    <div className={classnames(styles.App, styles[`theme-${theme}`])}>
      {theme === Theme.Christmas && <LightRope />}
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
          {names.length > 0 && remainingNames.length === 0 && (
            <div className={styles.NoNames}>
              No names
              <div className={styles.Hint}>Everyone has been picked!</div>
              <div className={styles.Hint}>Refresh the page to add all the names back.</div>
            </div>
          )}
          {names.length > 0 && remainingNames.length > 0 && (
            <div style={{ opacity: selectedIndex === null ? 0.1 : 1 }}>
              <Carousel selectedIndex={Math.min(24, selectedIndex)} revolutions={revolutions}>
                {displayNames.map((name, i) => (
                  <Name key={i} name={name} theme={theme} />
                ))}
              </Carousel>
            </div>
          )}
        </div>
        <button
          className={styles.Shuffle}
          disabled={remainingNames.length === 0}
          onClick={() => {
            if (selectedIndex !== null) {
              const name = remainingNames[selectedIndex];
              setPreviousPicks([name, ...previousPicks]);
            }

            const newRemainingNames = [...remainingNames];
            if (mode === Mode.Raffle && selectedIndex !== null) {
              newRemainingNames.splice(selectedIndex, 1)
              setRemainingNames(newRemainingNames);
            }

            const index = Math.floor(Math.random() * newRemainingNames.length);
            setSelectedIndex(index);
            setRevolutions(revolutions + 1);

            const start = Math.max(0, index - 24);
            const end = start + 50;
            setDisplayNames(newRemainingNames.slice(start, end));
          }}
        >
          ↺
        </button>
      </div>
      {previousPicks.length > 0 && (
      <div className={styles.PreviousPicks}>
        <h2>Previous picks</h2>
        <ul>
          {previousPicks.map((name, index) => (
            <li key={previousPicks.length - index}>{name}</li>
          ))}
        </ul>
      </div>
      )}
      {!hideInputs &&
      (<div className={styles.Editor}>
        <TitleInput
          value={title}
          onChange={(newTitle) => {
            onChange({ title: newTitle });
          }}
        />
        <NameInput
          value={names}
          onChange={(newNames) => {
            onChange({ names: newNames });
            setSelectedIndex(null);
          }}
        />
        <div className={styles.Hint}>{names.length} names.</div>
        <div className={styles.Hint}>
          After entering your names, save this page to your browser bookmarks
          for quick access to this list.
        </div>
        <hr />
        <select
          className={styles.Setting}
          value={theme}
          onChange={(event) => {
            onChange({ theme: event.target.value as Theme });
          }}
        >
          <option value={Theme.Robots}>Robot theme</option>
          <option value={Theme.Christmas}>Christmas theme</option>
        </select>
        <select
          className={styles.Setting}
          value={mode}
          onChange={(event) => {
            onChange({ mode: event.target.value as Mode });
          }}
        >
          <option value={Mode.Classroom}>
            Classroom mode (names are returned after each pick)
          </option>
          <option value={Mode.Raffle}>
            Raffle mode (names are removed when picked. Refresh the page to add
            all names back)
          </option>
        </select>
      </div>)}
    </div>
  );
};

export default App;
