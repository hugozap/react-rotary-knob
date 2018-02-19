# [WIP] React Rotary Knob


[Demo](https://hugozap.github.io/react-rotary-knob/storybook)

(Work in progress, please come back in a few days)

*This component is meant to be used in 'controlled mode'. It doesn't save the value internally so you must use your parent component state / redux store*


## Usage

```jsx
class App extends React.Component {

  state = {
    value: 50
  }

  changeValue(val) {
    this.setState({value:val})
  }

  render() {
    return <Knob onChange={(val)=>{this.changeValue(val)}} min={0} max={100} value={this.state.value} style={{width:'300px', height:'200px'}}/>
     
  }
}
```

Precise rotary knob for React

## Features

- Drag away from knob to increase precision.
- Skinnable with SVG
- Change label format


### Api

Props:

- format: callback for custom text formats
- skin: reference to the skin object
- value: value used
- onChange: callback for value change 