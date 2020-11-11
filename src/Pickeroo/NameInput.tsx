import React from "react";

import styles from "./NameInput.module.css";

class NameInput extends React.Component<
  { value: string[]; onChange: (names: string[]) => void },
  { text: string }
> {
  constructor(props) {
    super(props);
    const { value } = this.props;

    this.state = {
      text: value.join("\n"),
    };
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    const { text } = this.state;

    if (value.join("\n") !== this.parseText(text).join("\n")) {
      this.setState({
        text: value.join("\n"),
      });
    }
  }

  parseText(text) {
    let names = [];
    text.split("\n").forEach((name) => {
      const trimmed = name.trim();
      if (trimmed === "") {
        return;
      }
      names.push(trimmed);
    });
    return names;
  }

  render() {
    const { onChange } = this.props;
    const { text } = this.state;
    return (
      <textarea
        className={styles.NameInput}
        placeholder="Enter names, one on each line"
        value={text}
        onChange={(event) => {
          const text = event.target.value;
          const names = this.parseText(text);
          this.setState({ text });
          onChange(names);
        }}
      />
    );
  }
}

export default NameInput;
