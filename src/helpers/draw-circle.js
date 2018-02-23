// @flow
import React, { Component } from "react";

  /**
   * Draws a circle with radius = r
   * position must be handled by parent
   */
  
  type DrawCircleProps = {
    overlayStyle: ?any,
    r: number,
    borderColor: ?string,
    fillColor: ?string,
    borderWidth: number,
    fillOpacity: number
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
      const padding = 10; //total padding
      const width = d + padding;
      const height = d + padding;
      const cx = this.props.r + (padding / 2)
      const cy = this.props.r + (padding / 2);
      return (
        <svg width={width} height={height} fill={'grey'} {...rest}>
          <circle
            stroke={this.props.borderColor}
            fill={this.props.fillColor}
            fillOpacity={this.props.fillOpacity}
            r={this.props.r}
            cx={cx}
            cy={cy}
          />
        </svg>
      );
    }
  }

  export default DrawCircle