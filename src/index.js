// @flow

/**
 * Show the rotation circle and marker
 * dispatches drag events
 */

import React, { Component } from "react";
import * as d3 from "d3";
import * as u from "./utils";
import uuid from 'uuid';
import {Samy, SvgProxy} from 'react-samy-svg';
import defaultSkin from './knobdefaultskin'

/**
 * A skin consists of the svg code
 * and the knob element centerx and y (knobX, knobY)
 */
type Skin = {
  svg: string,
  knobX: number,
  knobY: number
}
type KnobProps = {
  value: number,
  min: number,
  max: number,
  skin: Skin,
  onChange: (val: number) => void 
};

type KnobState = {
  svgRef: any
};

type InternalInputProps = {
  min:number,
  max:number,
  value: number,
  step: ?number,
  onChange:()=>void
}
const InternalInput = (props:InternalInputProps)=>{

  //using 'any' produces inconsistent behavior
  //when going to the max and back to the min the
  //values are not the same
  const step = props.step || '1'
  const hideStyle = {

  }

  function onChange(ev) {
    props.onChange(Number(ev.target.value))
  }
  return <input value={props.value} step={step} onChange={onChange} style={hideStyle} type="range" min={props.min} max={props.max}/>
}

/**
 * Generic knob component
 */
class Knob extends Component<KnobProps, KnobState> {
  state = {
    svgRef: null
  };
  
  static defaultProps = {
    onChange: function() {},
    skin: defaultSkin
  }
  componentDidMount() {
    

    setTimeout(()=>{
      this.setupDragging(d3.select(container))      
    },0)
  }

  componentWillReceiveProps(nextProps) {
    //should recalculate scale?
    const {pmin, pmax} = this.props;
    const {nmin, nmax} = nextProps;
    if(pmin != nmin || pmax != nmax) {
      this.scale = d3
      .scaleLinear()
      .domain([nmin, nmax])
      .range([0, 359]);
    }
  }



  saveRef(elem: any) {
    if (!this.state.svgRef) {
      this.setState({ ...this.state, svgRef: elem });
    }
  }


  saveParentRef(container) {
    this.container = container;
  }

  onAngleChanged(angle) {
    //Calculate domain value
    console.log(angle)
    let domainValue = this.scale.invert(angle);
    this.props.onChange(domainValue);
  };

  setupDragging(elem: d3.Selection<any>) {
    if ( elem == null) {
      return;
    }
    // Add dragging behavior to selector element
    var self = this;
    const cx = 100;
    const cy = 100;
    let { value } = this.props;
    const initialAngle = this.scale(value);
    

    function started() {
      elem.classed("dragging", true);
      d3.event.on("drag", dragged).on("end", ended);

      //change will be relative to starting point for greater precision
      const startPos = { x: d3.event.x - cx, y: d3.event.y - cy };
      const startAngle = u.getAngleForPoint(startPos.x, startPos.y);
      let lastPos = startPos;
      let lastAngle = u.getAngleForPoint(lastPos.x, lastPos.y);

      function dragged() {
        console.log('d3.event', d3.event)
        console.log('d3.touch', d3.touch(elem))
        let currentPos = { x: d3.event.x - cx, y: d3.event.y - cy };
        let currentAngle = u.getAngleForPoint(currentPos.x, currentPos.y);
        const deltaAngle = currentAngle - startAngle;
        lastPos = currentPos;
        const finalAngle = (initialAngle + deltaAngle) % 360;
        self.onAngleChanged(finalAngle);
      }

      function ended() {
        elem.classed("dragging", false);
      }
    }

    elem.call(d3.drag().on("start", started));
  }

  componentWillMount() {
    this.scale = d3
      .scaleLinear()
      .domain([this.props.min, this.props.max])
      .range([0, 359]);
  }


  render() {

    const { value, min, max, onChange, skin, ...rest } = this.props;
    console.log(`render ${value}`)
    const angle = this.scale(value);



    const onFormControlChange = newVal => {
      console.log('input control changed: ' +newVal);
      this.props.onChange(newVal);
    }
    return (
      <React.Fragment>
      <div ref={this.saveParentRef.bind(this)}>
      <Samy svgXML={skin.svg} onSVGReady={this.saveRef.bind(this)} {...rest}>
        
        <SvgProxy selector="#knob" transform={`$ORIGINAL rotate(${angle}, ${skin.knobX}, ${skin.knobY})`}/>
        <SvgProxy selector="tspan">{value.toFixed(2)}</SvgProxy>
      </Samy>
      </div>
      {this.state.svgRef && (
          <RotateView
            svg={this.state.svgRef}
            angle={angle}
            cx={100}
            cy={100}
          />
        )}
        <InternalInput value={value} min={min} max={max} onChange={onFormControlChange} />
        
      </React.Fragment>
    );
  }
}

type RotateViewProps = {
  angle: number,
  cx: number,
  cy: number,
  onAngleChange: (angle: number) => void,
  svg: any
};

class RotateView extends Component<RotateViewProps> {
  controlSelector: ?string;
  controlId: string;

  constructor() {
    super();
    this.controlSelector = null;
    this.controlId = "";
  }

  componentDidMount() {
    this.controlId = uuid.v4();
    this.controlSelector = ".rotate-controls-" + this.controlId;
    this.renderControls(this.props);
  }
  componentWillReceiveProps(nextProps: RotateViewProps) {
    this.renderControls(nextProps);
  }

  componentWillUnmount() {
    this.clearControls();
  }

  renderControls(props: RotateViewProps) {
    const { r, cx, cy, angle } = props;
    const svgRef = d3.select(props.svg || ".main-svg");
    let container = svgRef;
    let knob = svgRef.select('#knob')
  }

  clearControls() {
    const svgRef = d3.select(".main-svg");
    let container = svgRef.select(this.controlSelector);
    container.remove();
  }

  render() {
    return null;
  }
}

export { Knob };
