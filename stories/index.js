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
    return <div style={{padding:'6rem'}}>
       <Knob style={{width:'100px', height:'100px'}} onChange={(val)=>{this.changeValue(val)}} min={0} max={100} value={this.state.value} /> 
    </div>
     
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

