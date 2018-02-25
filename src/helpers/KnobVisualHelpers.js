// @flow
import React, { Component } from "react";
import HelpersOverlay from "./HelpersOverlay";
import DrawCircle from "./DrawCircle";
import DrawLine from "./DrawLine";
import type { Point } from "../Types";
import utils from '../utils'

/** Precision visual helpers */

/**
 * Precision mode visual helpers
 */
type KnobVisualHelpersProps = {
  svgRef: any,
  radius: number,
  minimumDragDistance: number,
  mousePos: Point
};

type KnobVisualHelpersState = {
  centerX: number,
  centerY: number
};

class KnobVisualHelpers extends React.Component<
  KnobVisualHelpersProps,
  KnobVisualHelpersState
> {
  state = {
    centerX: 0,
    centerY: 0
  };

  componentDidMount() {
    this.recalculateContainerPosition(this.props);
  }

  componentWillReceiveProps(nextProps: KnobVisualHelpersProps) {
    this.recalculateContainerPosition(nextProps);
  }

  recalculateContainerPosition(props: KnobVisualHelpersProps) {
    //Calculate position
    const box = this.props.svgRef.getBoundingClientRect();
    const vbox = utils.transformBoundingClientRectToViewport(box);
    const halfWidth = box.width / 2;

    this.setState({
      ...this.state,
      centerX: vbox.left + halfWidth,
      centerY: vbox.top + halfWidth
    });
  }

  render() {
    const markCircleColor =
      this.props.minimumDragDistance <= this.props.radius ? "green" : "grey";
    const fillColor =
      this.props.minimumDragDistance <= this.props.radius
        ? "#88E22D"
        : "#D8D8D8";

    return (
      <HelpersOverlay>
        <svg
          style={{ position: "absolute", top: "0", left: "0" }}
          width="100%"
          height="100%"
        >
          <DrawCircle
            borderColor={markCircleColor}
            fillColor={fillColor}
            fillOpacity={0.3}
            paddingTopLeft={5}
            r={this.props.radius}
            cx={this.state.centerX}
            cy={this.state.centerY}
          />
          {/* Line to mouse position */}
          <DrawLine
            p1={{ x: this.state.centerX, y: this.state.centerY }}
            p2={{ x: this.props.mousePos.x, y: this.props.mousePos.y }}
          />
           {/* Line to current value */}
           <DrawLine
            p1={{ x: this.state.centerX, y: this.state.centerY }}
            p2={{ x: this.props.mousePos.x, y: this.props.mousePos.y }}
          />
        </svg>
      </HelpersOverlay>
    );
  }
}

export { KnobVisualHelpers };
