// @flow

/**
 * Show the rotation circle and marker
 * dispatches drag events
 */

import React, { Component } from "react";
import * as d3 from "d3";
import * as u from "./utils";
import uuid from 'uuid'

type KnobProps = {
  value: number,
  min: number,
  max: number,
  onChange: (val: number) => void 
};

type KnobState = {
  svgRef: any
};

/**
 * Generic knob component
 */
class Knob extends Component<KnobProps, KnobState> {
  state = {
    svgRef: null
  };
  
  static defaultProps = {
    onChange: function() {}
  }
  componentDidMount() {}

  saveRef(elem: any) {
    if (!this.state.svgRef) {
      this.setState({ ...this.state, svgRef: elem });
    }
  }

  render() {
    const { value, min, max, onChange, ...rest } = this.props;
    const scale = d3
      .scaleLinear()
      .domain([min, max])
      .range([0, 360]);
    const angle = scale(value);

    const onAngleChange = angle => {
      //Calculate domain value
      let domainValue = scale.invert(angle);
      this.props.onChange(domainValue);
    };
    return (
      <svg ref={this.saveRef.bind(this)} {...rest}>
        {this.state.svgRef && (
          <RotateView
            svg={this.state.svgRef}
            r={40}
            angle={angle}
            cx={50}
            cy={50}
            onAngleChange={onAngleChange}
          />
        )}
      </svg>
    );
  }
}

type RotateViewProps = {
  r: number,
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
    let container = svgRef.select(this.controlSelector);
    if (container.node() == null) {
      container = svgRef
        .append("g")
        .classed("rotate-controls-" + this.controlId, true);
    }
    //container.selectAll("*").remove();
    //outer circle
    let outer = container.select(".rotate-circle");
    if (!outer.node()) {
      outer = container.append("circle").classed("rotate-circle", true);
    }

    outer
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("fill", "#D7D4D4")
      .attr("stroke", "black")
      .attr("stroke-width", "2")
      .attr("r", r);

    //angle drag handle
    const hx = r * Math.cos(u.toRadians(angle));
    const hy = r * Math.sin(u.toRadians(angle));

    let handle = container.select(".handle");
    if (!handle.node()) {
      handle = container.append("circle").classed("handle", true);
    }

    handle
      .attr("cx", hx + cx)
      .attr("cy", hy + cy)
      .attr("r", 8)
      .attr("fill", "green");

    this.setupDragging(container);
  }

  setupDragging(elem: d3.Selection<any>) {
    if (elem == null) {
      return;
    }
    // Add dragging behavior to selector element
    var self = this;
    let { cx, cy } = this.props;

    function started() {
      elem.classed("dragging", true);
      d3.event.on("drag", dragged).on("end", ended);

      //change will be relative to starting point for greater precision
      const startPos = { x: d3.event.x - cx, y: d3.event.y - cy };
      const initialAngleProp = self.props.angle;
      const startAngle = u.getAngleForPoint(startPos.x, startPos.y);
      let lastPos = startPos;
      let lastAngle = u.getAngleForPoint(lastPos.x, lastPos.y);

      function dragged() {
        let currentPos = { x: d3.event.x - cx, y: d3.event.y - cy };
        let currentAngle = u.getAngleForPoint(currentPos.x, currentPos.y);
        const deltaAngle = currentAngle - startAngle;
        lastPos = currentPos;
        const finalAngle = (initialAngleProp + deltaAngle) % 360;
        self.props.onAngleChange(finalAngle);
      }

      function ended() {
        elem.classed("dragging", false);
      }
    }

    elem.call(d3.drag().on("start", started));
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
