// @flow

import React, { Component } from "react";
import uuid from "uuid";
import {select} from 'd3-selection';

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
      const { angle } = props;
      const svgRef = select(props.svg || ".main-svg");
      let container = svgRef;
      let knob = svgRef.select("#knob");
    }
  
    clearControls() {
      const svgRef = select(".main-svg");
      let container = svgRef.select(this.controlSelector);
      container.remove();
    }
  
    render() {
      return null;
    }
  }
  
  export default RotateView;