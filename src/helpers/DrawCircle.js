// @flow
import React, { Component } from "react";

  /**
   * Draws a circle with radius = r
   * position must be handled by parent
   */
  
  type DrawCircleProps = {
    r: number,
    borderColor: ?string,
    fillColor: ?string,
    borderWidth: number,
    fillOpacity: number,
    cx: number,
    cy: number,
  };
  
  class DrawCircle extends React.Component<DrawCircleProps> {
    static defaultProps = {
      borderColor: "black",
      fillColor: "transparent",
      borderWidth: 2,
      fillOpacity: 1
    };
    render() {
      const {
        r,
        borderColor,
        fillColor,
        borderWidth,
        ...rest
      } = this.props;
      const d = this.props.r * 2

      return (
          <circle
            stroke={this.props.borderColor}
            fill={this.props.fillColor}
            fillOpacity={this.props.fillOpacity}
            r={this.props.r}
            cx={this.props.cx}
            cy={this.props.cy}
            {...rest}
          />
      );
    }
  }

  export default DrawCircle