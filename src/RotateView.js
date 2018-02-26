// @flow

import React, { Component } from "react";
import uuid from "uuid";
import * as d3 from "d3";

type RotateViewProps = {
    angle: number,
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
  
  export default RotateView;