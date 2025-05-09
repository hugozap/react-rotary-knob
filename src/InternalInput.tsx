import React, { CSSProperties, RefObject } from "react";

interface InternalInputProps {
  min: number;
  max: number;
  value: number;
  step?: number;
  inputRef: RefObject<HTMLInputElement>;
  onChange: (val: number) => void;
  style?: CSSProperties;
}

const InternalInput: React.FC<InternalInputProps> = ({
  value,
  min,
  max,
  step = 1,
  onChange,
  inputRef,
  style,
  ...rest
}) => {
  const hideStyle: CSSProperties = {};

  const onValChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(ev.target.value));
  };

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
};

export default InternalInput;