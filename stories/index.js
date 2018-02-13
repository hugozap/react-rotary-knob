import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Knob} from '../src/index';

const stories = storiesOf('Knob', module)

class KnobApp extends React.Component {

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

stories.add('Basic', () => {
  let value = 50;
  function onChange(val) {
    value = val
  }

  return (
    <KnobApp />
  )
})

