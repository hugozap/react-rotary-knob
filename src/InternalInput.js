// @flow
import React, { Component } from "react";

type InternalInputProps = {
    min: number,
    max: number,
    value: number,
    step: ?number,
    inputRef: (elem: any) => void,
    onChange: (val: number) => void
  };
  
  class InternalInput extends React.Component<InternalInputProps> {

    static defaultProps = {
      step: 1
    }
    render() {
      const props = this.props;
      const hideStyle = {};
  
      function onValChange(ev) {
        props.onChange(Number(ev.target.value));
      }
  
      const { value, min, max, step, onChange, inputRef, ...rest } = props;
      return (
        <input
          ref={inputRef}
          value={value}
          step={step}
          onChange={onValChange}
          style={hideStyle}
          type="range"
          min={min}
          max={max}
          {...rest}
        />
      );
    }
  }

  export default InternalInput
  