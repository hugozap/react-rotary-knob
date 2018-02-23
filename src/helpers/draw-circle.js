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

  export default DrawCircle