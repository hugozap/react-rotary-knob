import React, { Component, CSSProperties, RefObject } from "react";


interface InternalInputProps {
  min: number;
  max: number;
  value: number;
  step?: number;
  inputRef: RefObject<HTMLInputElement>;
  onChange: (val: number) => void;
  style?: CSSProperties;
}

//define component props


class InternalInput extends React.Component<InternalInputProps> {
  static defaultProps = {
    step: 1,
  };

  render() {
    const props = this.props;
    const hideStyle: CSSProperties = {};

    function onValChange(ev: React.ChangeEvent<HTMLInputElement>) {
      props.onChange(Number(ev.target.value));
    }

    const { value, min, max, step, onChange, inputRef, style, ...rest } = props;
    return (
      <input
        ref={inputRef}
        value={value}
        step={step}
        onChange={onValChange}
        style={{ ...hideStyle, ...style }}
        type="range"
        min={min}
        max={max}
        {...rest}
      />
    );
  }
}

export default InternalInput;
