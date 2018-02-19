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


  const hideStyle = {

  }

  function onValChange(ev) {
    props.onChange(Number(ev.target.value))
  }

  const {value, min, max, step, onChange, ...rest} = props;
  return <input value={value} step={step || '1'} onChange={onValChange} style={hideStyle} type="range" min={min} max={max} {...rest}/>
}

type KnobProps = {
  value: number,
  min: number,
  max: number,
  skin: Skin,
  onChange: (val: number) => void 
};


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
      this.setupDragging(d3.select(this.container))      
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
    const box = elem.node().getBoundingClientRect();
    const cx = box.width / 2;
    const cy = box.height / 2;
    console.log('cx', cx)
    console.log('cy', cy)
    console.log('box', box);

    let { value } = this.props;
    const initialAngle = this.scale(value);
    

    function started() {
      elem.classed("dragging", true);
      d3.event.on("drag", dragged).on("end", ended);
      console.log('d3.event', d3.event);
      //change will be relative to starting point for greater precision
      const startPos = { x: d3.event.x - cx, y: d3.event.y - cy };
      const startAngle = u.getAngleForPoint(startPos.x, startPos.y);
      let lastPos = startPos;
      let lastAngle = u.getAngleForPoint(lastPos.x, lastPos.y);

      function dragged() {
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

    const drag = d3.drag();
    //Change the container to the element itself so the
    //event.x and y are relative to the element , not its parent
    drag.container(function(){
      return elem.node();
    })
    elem.call(drag.on("start", started));
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

    const styles = {
      container: {
        width:'50px',
        height:'50px',
        overflow:'hidden',
        position: 'relative',
      },
      input: {
        width:'50%',
        position: 'absolute',
        top:'0',
        left:'50%'

      }
    }
    return (
      <React.Fragment>
      <div ref={this.saveParentRef.bind(this)} style={styles.container} {...rest}>
        <InternalInput style={styles.input} value={value} min={min} max={max} onChange={onFormControlChange} />
        
        <Samy width="100%" height="100%" svgXML={skin.svg} onSVGReady={this.saveRef.bind(this)} >
          
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
