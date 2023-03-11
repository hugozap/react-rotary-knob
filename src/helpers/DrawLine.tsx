import React from "react";
import { Point } from "../Types";

/**
 * Draws a line from p1 to p2
 */

interface DrawLineProps {
  width?: number;
  color?: string;
  p1: Point;
  p2: Point;
  markerEnd?: string;
}

class DrawLine extends React.Component<DrawLineProps> {
  static defaultProps = {
    width: 2,
    color: "black",
  };
  render() {
    const { width, color, ...rest } = this.props;
    return (
      <line
        x1={this.props.p1.x}
        y1={this.props.p1.y}
        x2={this.props.p2.x}
        y2={this.props.p2.y}
        stroke={color}
        strokeWidth={this.props.width}
        {...rest}
      />
    );
  }
}

export default DrawLine;
