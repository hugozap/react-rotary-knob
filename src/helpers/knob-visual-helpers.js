// @flow
import React, { Component } from "react";
import HelpersOverlay from "./helpers-overlay";
import DrawCircle from "./draw-circle";

/** Precision visual helpers */

/**
 * Precision mode visual helpers
 */
type KnobVisualHelpersProps = {
  svgRef: any,
  radius: number,
  minimumDragDistance: number
};

type KnobVisualHelpersState = {
  cx: number,
  cy: number
};

class KnobVisualHelpers extends React.Component<
  KnobVisualHelpersProps,
  KnobVisualHelpersState
> {
  state = {
    cx: 0,
    cy: 0
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
    const halfWidth = box.width / 2;
    //Get knob svg top and left relative to viewport
    var t;
    const scrollX = (((t = document.documentElement) ||
      (t = document.body.parentNode)) &&
    typeof t.scrollLeft == "number"
      ? t
      : document.body
    ).scrollLeft;

    const scrollY = (((t = document.documentElement) ||
      (t = document.body.parentNode)) &&
    typeof t.scrollTop == "number"
      ? t
      : document.body
    ).scrollTop;

    //This assumes width == height
    //Add some padding so the svg circle edge doesnt get clipped
    const paddingTopLeft = 5;
    const top =
      box.top - scrollY - this.props.radius + halfWidth - paddingTopLeft;
    const left =
      box.left - scrollX - this.props.radius + halfWidth - paddingTopLeft;
    console.log("helper container pos:" + left + "," + top);
    this.setState({ ...this.state, cx: left, cy: top });
  }

  render() {
    const markCircleColor =
      this.props.minimumDragDistance <= this.props.radius ? "green" : "grey";
    const fillColor =   this.props.minimumDragDistance <= this.props.radius ? "#88E22D" : "#D8D8D8";
   

    const styles = {
      circle: {
        position: "absolute",
        top: this.state.cx,
        left: this.state.cy
      }
    };
    return (
      <HelpersOverlay>
        <DrawCircle
          borderColor={markCircleColor}
          fillColor={fillColor}
          fillOpacity={0.3}
          paddingTopLeft={5}
          style={styles.circle}
          r={this.props.radius}
        />
      </HelpersOverlay>
    );
  }
}

export { KnobVisualHelpers };
