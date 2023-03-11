import React, { Component } from "react";
import utils from "./utils";
import { SvgLoader, SvgProxy } from "react-svgmt";
import defaultSkin from "./knobdefaultskin";
import { KnobVisualHelpers } from "./helpers/KnobVisualHelpers";
import InternalInput from "./InternalInput";
import { select, event } from "d3-selection";
import { drag } from "d3-drag";
import { scaleLinear } from "d3-scale";
function printDebugValues(obj) {
  console.log("------------");
  Object.keys(obj).forEach((key) => {
    const value = typeof obj[key] === "object" ? JSON.stringify(obj[key]) : obj[key];
    console.log(`${key}: ${value}`);
  });
  console.log("------------");
}
class Knob extends Component {
  container;
  scale;
  scaleProps;
  inputRef;
  controlled;
  state = {
    svgRef: null,
    dragging: false,
    dragDistance: 0,
    mousePos: { x: 0, y: 0 },
    valueAngle: 0,
    uncontrolledValue: 0
  };
  static defaultProps = {
    min: 0,
    max: 100,
    clampMax: 360,
    clampMin: 0,
    rotateDegrees: 0,
    onChange: function() {
    },
    onStart: function() {
    },
    onEnd: function() {
    },
    skin: defaultSkin,
    format: (val) => {
      return val.toFixed(0);
    },
    preciseMode: true,
    unlockDistance: 100,
    defaultValue: 0,
    step: 1
  };
  // returns angles between 0 and 360 for values lower 0 or greater 360
  normalizeAngle(angle) {
    if (angle < 0) {
      return angle + 360;
    } else if (angle > 360) {
      return angle - 360;
    }
    return angle;
  }
  // converts a value to an angle for the knob respecting the additional rotateDegrees prop
  convertValueToAngle(value) {
    const angle = (this.getScale()(value) + this.props.rotateDegrees) % 360;
    return this.normalizeAngle(angle);
  }
  // converts an angle to a value for the knob respecting the additional rotateDegrees prop
  convertAngleToValue(angle) {
    const angle2 = angle - this.props.rotateDegrees;
    return this.getScale().invert(this.normalizeAngle(angle2));
  }
  getScale() {
    if (!this.scaleProps || !(this.scaleProps.min === this.props.min && this.scaleProps.max === this.props.max && this.scaleProps.clampMin === this.props.clampMin && this.scaleProps.clampMax === this.props.clampMax)) {
      if (this.props.rotateDegrees < 270 && this.props.rotateDegrees > 90) {
        this.scale = scaleLinear().domain([this.props.min, this.props.max]).range([this.props.clampMin, this.props.clampMax]);
      } else {
        this.scale = scaleLinear().domain([this.props.max, this.props.min]).range([this.props.clampMax, this.props.clampMin]);
      }
      this.scale.clamp(true);
      this.scaleProps = { min: this.props.min, max: this.props.max, clampMin: this.props.clampMin, clampMax: this.props.clampMax };
    }
    return this.scale;
  }
  componentDidMount() {
    if (this.props.value == null) {
      this.controlled = false;
      this.setState({
        ...this.state,
        uncontrolledValue: this.props.defaultValue
      });
    } else {
      this.controlled = true;
    }
    this.setupDragging(select(this.container));
  }
  saveRef(elem) {
    if (!this.state.svgRef) {
      this.setState({ ...this.state, svgRef: elem });
    }
  }
  saveParentRef(container) {
    this.container = container;
  }
  onAngleChanged(angle) {
    let domainValue = this.convertAngleToValue(angle);
    if (!this.controlled) {
      this.setState((st) => {
        return { uncontrolledValue: domainValue };
      });
    }
    this.props.onChange(domainValue);
  }
  /**
   * Returns the current value (depending on controlled/uncontrolled mode)
   */
  getValue() {
    return this.controlled === true ? this.props.value : this.state.uncontrolledValue;
  }
  setupDragging(elem) {
    if (elem == null) {
      return;
    }
    var self = this;
    let vbox = elem.node().getBoundingClientRect();
    const cx = vbox.width / 2;
    const cy = vbox.height / 2;
    function started() {
      let value = self.getValue();
      const initialAngle = self.convertValueToAngle(value);
      vbox = elem.node().getBoundingClientRect();
      elem.classed("dragging", true);
      self.props.onStart();
      event.on("drag", dragged).on("end", ended);
      let startPos = { x: event.x - cx, y: event.y - cy };
      let startAngle = utils.getAngleForPoint(startPos.x, startPos.y);
      let lastPos = startPos;
      let lastAngle = utils.getAngleForPoint(lastPos.x, lastPos.y);
      let monitoring = false;
      console.log("**DEBUG event**", d3.event.clientX, d3.event.clientY);
      self.setState({
        ...self.state,
        dragging: true,
        dragDistance: 0,
        mousePos: {
          x: d3.event.clientX,
          y: d3.event.clientY
        }
      });
      function dragged() {
        let currentPos = { x: event.x - cx, y: event.y - cy };
        const distanceFromCenter = Math.sqrt(
          Math.pow(currentPos.x, 2) + Math.pow(currentPos.y, 2)
        );
        if (self.props.preciseMode) {
          if (!monitoring && distanceFromCenter >= self.props.unlockDistance) {
            startPos = currentPos;
            startAngle = utils.getAngleForPoint(currentPos.x, currentPos.y);
            monitoring = true;
          }
        } else {
          monitoring = true;
        }
        let currentAngle = utils.getAngleForPoint(currentPos.x, currentPos.y);
        const deltaAngle = currentAngle - startAngle;
        lastPos = currentPos;
        let finalAngle = initialAngle + deltaAngle;
        if (finalAngle < 0) {
          finalAngle += 360;
        } else if (finalAngle > 360) {
          finalAngle -= 360;
        }
        if (monitoring) {
          self.onAngleChanged(finalAngle);
        }
        self.setState(() => {
          return {
            ...self.state,
            dragDistance: distanceFromCenter,
            mousePos: {
              x: event.sourceEvent.clientX,
              y: event.sourceEvent.clientY
            },
            valueAngle: monitoring ? finalAngle : initialAngle
          };
        });
      }
      function ended() {
        elem.classed("dragging", false);
        self.setState({ ...self.state, dragging: false });
        self.props.onEnd();
        self.inputRef.focus();
      }
    }
    const dragInstance = drag();
    dragInstance.container(function() {
      return elem.node();
    });
    elem.call(dragInstance.on("start", started));
  }
  onFormControlChange(newVal) {
    if (!this.controlled) {
      this.setState({ ...this.state, uncontrolledValue: newVal });
    }
    this.props.onChange(newVal);
  }
  render() {
    const {
      value,
      defaultValue,
      min,
      max,
      rotateDegrees,
      clampMax,
      clampMin,
      onChange,
      onStart,
      onEnd,
      skin,
      style,
      format,
      preciseMode,
      unlockDistance,
      ...rest
    } = this.props;
    const currentValue = this.getValue();
    const angle = this.convertValueToAngle(currentValue);
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
    const updateAttrs = skin.updateAttributes;
    const skinElemUpdates = updateAttrs && updateAttrs.map((elemUpdate, ix) => {
      let elemContent = null;
      if (elemUpdate.content) {
        elemContent = elemUpdate.content(this.props, currentValue);
      }
      let attributes = {};
      (elemUpdate.attrs || []).forEach((attr) => {
        attributes[attr.name] = attr.value(this.props, currentValue);
      });
      return /* @__PURE__ */ React.createElement(SvgProxy, { key: ix, selector: elemUpdate.element, ...attributes }, elemContent);
    });
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "div",
      {
        ref: this.saveParentRef.bind(this),
        style: styles.container,
        ...rest
      },
      /* @__PURE__ */ React.createElement(
        InternalInput,
        {
          inputRef: (input) => {
            this.inputRef = input;
          },
          style: styles.input,
          value: currentValue,
          min,
          max,
          step: this.props.step,
          onChange: this.onFormControlChange.bind(this)
        }
      ),
      /* @__PURE__ */ React.createElement(
        SvgLoader,
        {
          width: "100%",
          height: "100%",
          svgXML: skin.svg,
          onSVGReady: this.saveRef.bind(this)
        },
        /* @__PURE__ */ React.createElement(
          SvgProxy,
          {
            selector: "#knob",
            transform: `$ORIGINAL rotate(${angle}, ${skin.knobX}, ${skin.knobY})`
          }
        ),
        skinElemUpdates
      )
    ), this.state.dragging && this.props.preciseMode && /* @__PURE__ */ React.createElement(
      KnobVisualHelpers,
      {
        svgRef: this.state.svgRef,
        radius: this.state.dragDistance,
        mousePos: this.state.mousePos,
        minimumDragDistance: this.props.unlockDistance,
        valueAngle: this.state.valueAngle
      }
    ));
  }
}
export { Knob };
