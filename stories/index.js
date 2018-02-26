import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Knob } from "../src/index";

const stories = storiesOf("Knob", module);

class KnobApp extends React.Component {
  state = {
    value: 0
  };

  changeValue(val) {
    this.setState({ value: val });
  }

  render() {
    return (
      <div style={{ padding: "8rem" }}>
        <Knob
          style={{ width: "50px", height: "50px", display: "inline-block" }}
          onChange={val => {
            this.changeValue(val);
          }}
          min={0}
          max={100}
          value={this.state.value}
        />
        <h2 style={{ paddingTop: "200px" }}>{this.state.value.toFixed(2)} </h2>
      </div>
    );
  }
}

stories.add("Basic", () => {
  return <KnobApp />;
});

stories.add("Uncontrolled", () => {
  function onChange(val) {
    console.log('new value:'+val)
  }
  return (
    <div>
      <p>
      In uncontrolled mode, the component manages its own state
      (like html form input elements).

      To trigger 'uncontrolled' mode do not pass a value prop
      <pre>
          {`
  function onChange(val) {
    console.log('new value:'+val)
  }
  
  <Knob
  min={0}
  max={100}
  onChange={onChange}
/>`}
      </pre>
    </p>
    <Knob
      style={{ width: "50px", height: "50px", padding:'6rem', display: "inline-block" }}
      min={0}
      max={100}
      onChange={onChange}
    />
    </div>
    
  );
});
