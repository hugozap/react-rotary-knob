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
      <div>
        <h2>{this.state.value.toFixed(2)} </h2>
        
        <Knob
          style={{ width: "80px",marginTop:'8rem', marginLeft:'8rem', height: "80px", display: "inline-block" }}
          onChange={val => {
            this.changeValue(val);
          }}
          min={0}
          max={100}
          value={this.state.value}
        />
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
      </p>
      <pre>
          {`
  function onChange(val) {
    console.log('new value:'+val)
  }

  <Knob
  min={0}
  max={100}
  onChange={onChange}/>`}
      </pre>
  
    <Knob
      style={{ width: "50px", height: "50px", marginLeft:'8rem', display: "inline-block" }}
      min={0}
      max={100}
      onChange={onChange}
    />
    </div>
    
  );
});


stories.add("Change 'unlock' distance", () => {
 
  return (
    <div>
      <p>
      The minimum distance to unlock the rotation can be changed
      with the prop unlockDistance
      </p>
  
    <p> With unlockDistance=50 </p>
    <Knob
      style={{ width: "50px", height: "50px", marginLeft:'8rem', display: "inline-block" }}
      min={0}
      max={100}
      unlockDistance={50}
    />
    <p> With unlockDistance=100 </p>
    
    <Knob
      style={{ width: "50px", height: "50px", marginLeft:'8rem', display: "inline-block" }}
      min={0}
      max={100}
      unlockDistance={100}
    />
    </div>
    
  );
});
