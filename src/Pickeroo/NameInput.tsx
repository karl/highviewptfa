import React from "react";

import styles from "./NameInput.module.css";

type NameInputProps = {
  value: string[];
  onChange: (names: string[]) => void;
};

type NameInputState = {
  text: string;
};

class NameInput extends React.Component<NameInputProps, NameInputState> {
  constructor(props: NameInputProps) {
    super(props);
    const { value } = this.props;

    this.state = {
      text: value.join("\n"),
    };
  }

  componentDidUpdate(prevProps: NameInputProps) {
    const { value } = this.props;
    const { text } = this.state;

    if (value.join("\n") !== this.parseText(text).join("\n")) {
      this.setState({
        text: value.join("\n"),
      });
    }
  }

  parseText(text: string) {
    let names: string[] = [];
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
