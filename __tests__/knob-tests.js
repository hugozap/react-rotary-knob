// __tests__/CheckboxWithLabel-test.js

import React from 'react';
import Enzyme,{shallow, mount} from 'enzyme';
import {Knob} from '../src/index';
import Adapter from './ReactSixteenAdapter';
import textskin from '../textskin';

Enzyme.configure({ adapter: new Adapter() });


class KnobDemo extends React.Component {
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
            value={this.state.value}
            onChange={this.changeValue.bind(this)}
            {...this.props}
          />
        </div>
      );
    }
  }
  

test('Knob value == 0 => rotation angle === 0 deg', () => {
    jest.useFakeTimers();
    // Render a checkbox with label in the document
    const knob = mount(<Knob min={0} max={100} />);
    jest.runAllTimers();
    const svg = knob.find('svg');
    const transformVal = svg.getDOMNode().querySelector('g#knob').attributes['transform'].value;
    expect(transformVal).toContain('rotate(0, 71, 71)')
  });


test('Knob with value == 50 has #knob rotated 180 deg', () => {
  jest.useFakeTimers();
  // Render a checkbox with label in the document
  const knob = mount(<Knob min={0} max={100} defaultValue={50} />);
  jest.runAllTimers();
  const svg = knob.find('svg');
  const transformVal = svg.getDOMNode().querySelector('g#knob').attributes['transform'].value;
  expect(transformVal).toContain('rotate(180, 71, 71)')
});

test('Skin with tspan element gets updated correctly', () => {
    expect.assertions(3)
    jest.useFakeTimers();
    // Render a checkbox with label in the document
    const knob = mount(<KnobDemo skin={textskin} min={0} max={100} defaultValue={50} />);
    jest.runAllTimers();
    const svg = knob.find('svg');
    const tspans = svg.getDOMNode().querySelectorAll('tspan');
    expect(tspans[0].textContent).toBe('50')
    expect(tspans[1].textContent).toBe('50')
    expect(tspans[2].textContent).toBe('50')
  });
  