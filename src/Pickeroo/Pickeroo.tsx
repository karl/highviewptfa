import React, { Component } from "react";
import md5 from "md5";
import queryString from "query-string";
import { BrowserHistory, createBrowserHistory } from "history";
import {
  divider,
  reducer,
  setTitle,
  setNames,
  shuffle,
  initialise,
} from "./data";
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

const Name = ({ name, isSelected }) => {
  const hash = md5(name);
  return (
    <div className={`${styles.Name} ${isSelected ? styles.Selected : ""}`}>
      <img src={`https://robohash.org/${hash}.png?set=set1`} alt="" />
      <div className={styles.NameText}>{name}</div>
    </div>
  );
};

class App extends Component<
  {},
  { title: string; names: string[]; selectedIndex: string; revolutions: number }
> {
  history: BrowserHistory;

  constructor(props) {
    super(props);
    this.state = reducer(undefined, {});
  }

  componentDidMount() {
    this.history = createBrowserHistory();
    const params = queryString.parse(window.location.search);
    const namesParam = Array.isArray(params.names)
      ? params.names[0]
      : params.names;
    const title = Array.isArray(params.title)
      ? params.title[0]
      : params.title;
    const names =
      namesParam !== undefined ? namesParam.split(divider) : [];

    this.setState((state) => reducer(state, initialise({ title, names })));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state === prevState) {
      return;
    }

    const { title, names } = this.state;
    const params = {
      title,
      names: names.join(divider),
    };
    this.history.push("?" + queryString.stringify(params));
  }

  dispatch(action) {
    this.setState((state) => reducer(state, action));
  }

  render() {
    const { title, names, selectedIndex, revolutions } = this.state;
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
                  <Name
                    key={i}
                    name={name}
                    isSelected={selectedIndex === name}
                  />
                ))}
              </Carousel>
            </div>
          </div>
          <button
            className={styles.Shuffle}
            disabled={names.length === 0}
            onClick={() => {
              this.dispatch(shuffle());
            }}
          >
            ↺
          </button>
        </div>
        <div className={styles.Editor}>
          <TitleInput
            value={title}
            onChange={(newTitle) => this.dispatch(setTitle(newTitle))}
          />
          <NameInput
            value={names}
            onChange={(newNames) => {
              this.dispatch(setNames(newNames));
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
  }
}

export default App;
