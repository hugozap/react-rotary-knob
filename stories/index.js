import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Knob } from "../src/index";
import textskin from '../textskin'

const stories = storiesOf("Knob", module);

class KnobApp extends React.Component {
  state = {
    value: 50
  };

  changeValue(val) {
    this.setState({ value: val });
  }

  render() {
    return (
      <div style={{textAlign:'center'}}>
        
        <h2 style={{textAlign:'center'}}>{this.state.value.toFixed(2)} </h2>

        <Knob
          skin={textskin}
        
          style={{
            width: "80px",
            marginTop: "8rem",
            height: "80px",
            display: "inline-block"
          }}
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
  return <div>
     <KnobApp />
     <div>
       <pre>
         {`
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
        
        skin={textskin}
        
        style={{
          width: "80px",
          marginTop: "8rem",
          height: "80px",
          display: "inline-block"
        }}
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
}`}
       </pre>
    </div>
     </div>;
});

stories.add("Uncontrolled", () => {
  function onChange(val) {
    console.log("new value:" + val);
  }
  return (
    <div>
      <p>
        In uncontrolled mode, the component manages its own state (like html
        form input elements). To trigger 'uncontrolled' mode do not pass a value
        prop
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
        style={{
          width: "50px",
          height: "50px",
          marginLeft: "8rem",
          display: "inline-block"
        }}
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
        The minimum distance to unlock the rotation can be changed with the prop
        unlockDistance
      </p>

      <p> With unlockDistance=50 </p>
      <Knob
        style={{
          width: "50px",
          height: "50px",
          marginLeft: "8rem",
          display: "inline-block"
        }}
        min={0}
        max={100}
        unlockDistance={50}
      />
      <p> With unlockDistance=100 </p>

      <Knob
        style={{
          width: "50px",
          height: "50px",
          marginLeft: "8rem",
          display: "inline-block"
        }}
        min={0}
        max={100}
        unlockDistance={100}
      />
    </div>
  );
});

stories.add("Test scroll", () => {
  return (
    <div
      style={{
        overflow: "auto",
        position: "absolute",
        left: "200px",
        top: "200px",
        width: "200px",
        height: "200px",
        backgroundColor: "yellow"
      }}
    >
      <Knob
        style={{
          width: "50px",
          height: "50px",
          display: "inline-block",
          marginLeft: "30%"

        }}
        min={0}
        max={100}
        unlockDistance={100}
      />
    </div>
  );
});



stories.add("Step = 0.1", () => {
  return (
    <div>
      <p>
        Change `step` prop to change precision
        when using the keyboard. Here
        min = 0 , max = 1 and step = 0.1
        Try using the keyboard to change the value.
      </p>
      <Knob
        min={0}
        max={1}
        step={0.1}
      />
    </div>
  );
});


stories.add("ClampMax and ClampMin", () => {
  return (
    <div>
      <p>
        change clampMax and clampMin props to degree values to limit the range of the knob (e.g. clampMin = 20, clampMax = 340 will give a 40 degree gap between max and min)
      </p>
      <Knob
      
      skin={textskin}
        
        style={{
          width: "80px",
          marginTop: "8rem",
          height: "80px",
          display: "inline-block"
        }}
        min={0}
        max={1}
        clampMax={300}
        clampMin={60}
      />
    </div>
  );
});


stories.add("Rotate", () => {
  return (
    <div>
      <p>
        change rotateDegrees prop to degree value to rotate the knob
      </p>
      <Knob
      
      skin={textskin}
        
        style={{
          width: "80px",
          margin: "8rem",
          height: "80px",
          display: "inline-block"
        }}
        min={0}
        max={100}
        rotateDegrees={160}
      />
    </div>
  );
});


stories.add("Rotate + Clamping", () => {
  return (
    <div>
      <p>
        Knob rotated by 180 degrees, with clampMin = 30 and clampMax = 330
      </p>
      <Knob
      
      skin={textskin}
        
        style={{
          width: "80px",
          margin: "8rem",
          height: "80px",
          display: "inline-block"
        }}
        min={0}
        max={100}
        rotateDegrees={180}
        clampMin={20}
        clampMax={340}
      />
    </div>
  );
});



stories.add('Start value set, text skin', ()=>{
 

  return (
    <Knob style={{width:'300px', height:'300px'}} min={0} max={100} defaultValue={50} skin={textskin} />
  )
})

stories.add("Update attributes from skin", () => {
  return (
    <div>
      <p>
        The skin used updates the fill color of the SVG element
        The value can be a function that uses the current value and other props
        (See stories/testskin.js)
        <b> Here, the color will change when  value > 50 </b>
        <pre>
{`
updateAttributes: [
  {
    element:'#knob circle',
    attrs: [
      {
        name:'fill',
        value:(props,value)=> {
            return value >=50 ? 'red': 'black'
        }
      }
    ]
  }
]
`}
</pre>
      </p>
      <Knob
        style={{marginLeft:'4rem'}}
        skin={require('./testskin').default}
        min={0}
        max={100}
      />
    </div>
  );
});