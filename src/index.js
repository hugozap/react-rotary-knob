// @flow

/**
 * Show the rotation circle and marker
 * dispatches drag events
 */

import React, { Component } from "react";
import * as d3 from "d3";
import * as u from "./utils";
import uuid from "uuid";
import { Samy, SvgProxy } from "react-samy-svg";
import defaultSkin from "./knobdefaultskin";

/**
 * A skin consists of the svg code
 * and the knob element centerx and y (knobX, knobY)
 */
type Skin = {
  svg: string,
  knobX: number,
  knobY: number
};


type InternalInputProps = {
  min: number,
  max: number,
  value: number,
  step: ?number,
  inputRef: (elem: any) => void,
  onChange: () => void
};

class InternalInput extends React.Component<InternalInputProps> {
  render() {
    const props = this.props;
    const hideStyle = {};

    function onValChange(ev) {
      props.onChange(Number(ev.target.value));
    }

    const { value, min, max, step, onChange, inputRef, ...rest } = props;
    return (
      <input
        ref={inputRef}
        value={value}
        step={step || "1"}
        onChange={onValChange}
        style={hideStyle}
        type="range"
        min={min}
        max={max}
        {...rest}
      />
    );
  }
}



/** Precision visual helpers */

/**
 * Draws the overlay and the children
 */
class HelpersOverlay extends React.Component {
  render() {
    const styles = {
      overlay: Object.assign(
        {
          width: "100%",
          height: "100vh",
          top:0,
          left: 0,
          zIndex: 2147483647,
          margin: "0",
          padding: "0",
          boxSizing: "border-box",
          position: "fixed"
        },
        this.props.overlayStyle
      )
    };

    return <div style={styles.overlay}>{this.props.children}</div>;
  }
}

/**
 * Draws a circle with radius = r
 * position must be handled by parent
 */

type DrawCircleProps = {
  overlayStyle: ?any,
  r: number,
  borderColor: ?string,
  fillColor: ?string,
  borderWidth: number
};

class DrawCircle extends React.Component<DrawCircleProps> {
  static defaultProps = {
    borderColor: "black",
    fillColor: "transparent",
    borderWidth: 1
  };
  render() {
    const {
      r,
      overlayStyle,
      borderColor,
      fillColor,
      borderWidth,
      ...rest
    } = this.props;
    const d = this.props.r * 2
  
    return (
      <svg width={d+this.props.borderWidth*2} height={d + this.props.borderWidth * 2} {...rest}>
        <circle
          stroke={this.props.borderColor}
          fill={this.props.fillColor}
          r={this.props.r}
          cx={this.props.r}
          cy={this.props.r}
        />
      </svg>
    );
  }
}

/** 
 * Precision mode visual helpers
*/
type KnobVisualHelpersProps = {
  svgRef: any,
  radius: number
}

type KnobVisualHelpersState = {
  cx: number,
  cy: number
}

class KnobVisualHelpers extends React.Component<KnobVisualHelpersProps, KnobVisualHelpersState> {

  state = {
    cx: 0,
    cy: 0
  }

  componentDidMount() {

    //Calculate position
    const box = this.props.svgRef.getBoundingClientRect();
    var t;
    const scrollX = (((t = document.documentElement) || (t = document.body.parentNode))
    && typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft

    const scrollY = (((t = document.documentElement) || (t = document.body.parentNode))
    && typeof t.scrollTop == 'number' ? t : document.body).scrollTop

    const top = box.top - scrollY;
    const left = box.left - scrollX;
    this.setState({...this.state, cx: left, cy: top})
    
  }

  render() {

    const styles = {
      circle: {
        position: 'absolute',
        top: this.state.cx,
        left: this.state.cy
      }
    }
    return (
      <HelpersOverlay>
        <DrawCircle style={styles.circle} r={this.props.radius} />
      </HelpersOverlay>
    );
  }
}


type KnobProps = {
  value: number,
  min: number,
  max: number,
  skin: Skin,
  format: ?(val: number) => string,
  onChange: (val: number) => void,
  style: any
};

type KnobState = {
  svgRef: any,
  dragging: boolean,
  dragDistance: number
};


/**
 * Generic knob component
 */
class Knob extends Component<KnobProps, KnobState> {
  state = {
    svgRef: null,
    dragging: false,
    dragDistance: 0,
  };

  static defaultProps = {
    onChange: function() {},
    skin: defaultSkin,
    format: (val: number) => {
      return val.toFixed(0);
    }
  };
  componentDidMount() {
    this.setupDragging(d3.select(this.container));
  }

  componentWillReceiveProps(nextProps) {
    //should recalculate scale?
    const { pmin, pmax } = this.props;
    const { nmin, nmax } = nextProps;
    if (pmin != nmin || pmax != nmax) {
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
    console.log(angle);
    let domainValue = this.scale.invert(angle);
    this.props.onChange(domainValue);
  }

  setupDragging(elem: d3.Selection<any>) {
    if (elem == null) {
      return;
    }
    // Add dragging behavior to selector element
    var self = this;
    const box = elem.node().getBoundingClientRect();
    const cx = box.width / 2;
    const cy = box.height / 2;
    console.log("cx", cx);
    console.log("cy", cy);
    console.log("box", box);

    let { value } = this.props;
    const initialAngle = this.scale(value);

    function started() {
      elem.classed("dragging", true);
      d3.event.on("drag", dragged).on("end", ended);
      self.setState({...self.state, dragging: true})
      //change will be relative to starting point for greater precision
      const startPos = { x: d3.event.x - cx, y: d3.event.y - cy };
      const startAngle = u.getAngleForPoint(startPos.x, startPos.y);
      let lastPos = startPos;
      let lastAngle = u.getAngleForPoint(lastPos.x, lastPos.y);

      
      function dragged() {
        let currentPos = { x: d3.event.x - cx, y: d3.event.y - cy };
        self.setState({...self.state, dragDistance: Math.pow(currentPos.x, 2) + Math.pow(currentPos.y, 2)})
        let currentAngle = u.getAngleForPoint(currentPos.x, currentPos.y);
        const deltaAngle = currentAngle - startAngle;
        lastPos = currentPos;
        const finalAngle = (initialAngle + deltaAngle) % 360;
        self.onAngleChanged(finalAngle);
      }

      function ended() {
        elem.classed("dragging", false);
        self.setState({...self.state, dragging: false})
        
        //focus input so it can be moved with arrows
        self.inputRef.focus();
      }
    }

    const drag = d3.drag();
    //Change the container to the element itself so the
    //event.x and y are relative to the element , not its parent
    drag.container(function() {
      return elem.node();
    });
    elem.call(drag.on("start", started));
  }

  componentWillMount() {
    this.scale = d3
      .scaleLinear()
      .domain([this.props.min, this.props.max])
      .range([0, 359]);
  }

  render() {
    const {
      value,
      min,
      max,
      onChange,
      skin,
      style,
      format,
      ...rest
    } = this.props;
    const angle = this.scale(value);
    const onFormControlChange = newVal => {
      console.log("input control changed: " + newVal);
      this.props.onChange(newVal);
    };

    const styles = {
      container: Object.assign(
        {},
        {
          width: "50px",
          height: "50px",
          overflow: "hidden",
          position: "relative"
        },
        style
      ),
      input: {
        width: "50%",
        position: "absolute",
        top: "0",
        left: "-100%"
      }
    };
    return (
      <React.Fragment>
        <div
          ref={this.saveParentRef.bind(this)}
          style={styles.container}
          {...rest}
        >
          <InternalInput
            inputRef={input => {
              this.inputRef = input;
            }}
            style={styles.input}
            value={value}
            min={min}
            max={max}
            onChange={onFormControlChange}
          />

          <Samy
            width="100%"
            height="100%"
            svgXML={skin.svg}
            onSVGReady={this.saveRef.bind(this)}
          >
            <SvgProxy
              selector="#knob"
              transform={`$ORIGINAL rotate(${angle}, ${skin.knobX}, ${
                skin.knobY
              })`}
            />
            <SvgProxy selector="tspan">{this.props.format(value)}</SvgProxy>
          </Samy>
        </div>
        {this.state.svgRef && (
          <RotateView svg={this.state.svgRef} angle={angle} />
        )}

        {this.state.dragging && <KnobVisualHelpers svgRef={this.state.svgRef} radius={this.state.dragDistance} />}
      </React.Fragment>
    );
  }
}

type RotateViewProps = {
  angle: number,
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
    let knob = svgRef.select("#knob");
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
