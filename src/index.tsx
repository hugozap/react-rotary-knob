/**
 * Show the rotation circle and marker
 * dispatches drag events
 */

import React, {
  Component,
  CSSProperties,
  ReactElement,
  RefObject,
} from "react";
import * as d3 from "d3";
import utils from "./utils";
import { SvgLoader, SvgProxy } from "react-svgmt";
import defaultSkin from "./knobdefaultskin";
import { KnobVisualHelpers } from "./helpers/KnobVisualHelpers";
import InternalInput from "./InternalInput";
import { D3DragEvent, drag } from "d3-drag";
import { scaleLinear } from "d3-scale";
import type {
  Point,
  AttributeSetValue,
  UpdateElement,
} from "./Types";
import { select } from "d3-selection";
/**
 * A skin consists of the svg code
 * and the knob element centerx and y (knobX, knobY)
 */
type Skin = {
  svg: string;
  knobX: number;
  knobY: number;
  updateAttributes: Array<UpdateElement>;
};

type KnobProps = {
  value?: number;
  defaultValue?: number | null;
  clampMin?: number | null;
  clampMax?: number | null;
  rotateDegrees?: number | null;
  min: number;
  max: number;
  skin: Skin;
  format: (val: number) => string;
  onChange: (val: number) => void;
  onStart: () => void;
  onEnd: () => void;
  style: React.CSSProperties;
  preciseMode: boolean;
  unlockDistance: number;
  step: number;
};

type KnobState = {
  //add optional prop1 string

  svgRef?: RefObject<any>;
  dragging: boolean;
  dragDistance: number;
  mousePos: Point;
  valueAngle: number;
  uncontrolledValue?: number | null;
};

function printDebugValues(obj: any) {
  console.log("------------");
  Object.keys(obj).forEach((key) => {
    const value =
      typeof obj[key] === "object" ? JSON.stringify(obj[key]) : obj[key];
    console.log(`${key}: ${value}`);
  });
  console.log("------------");
}
/**
 * Generic knob component
 */
class Knob extends Component<KnobProps, KnobState> {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.scaleProps = {
      min: props.min,
      max: props.max,
      clampMin: props.clampMin,
      clampMax: props.clampMax,
    };
    this.scale = scaleLinear().domain([props.min, props.max]).range([0, 360]);
    this.controlled = props.value !== undefined;
  }

  container: any;
  scale: any;
  scaleProps: { min: number; max: number; clampMin: number; clampMax: number };
  inputRef: any;
  controlled: boolean;

  state: KnobState = {
    svgRef: undefined,
    dragging: false,
    dragDistance: 0,
    mousePos: { x: 0, y: 0 },
    valueAngle: 0,
    uncontrolledValue: 0,
  };

  static defaultProps: Partial<KnobProps> = {
    min: 0,
    max: 100,
    clampMax: 360,
    clampMin: 0,
    rotateDegrees: 0,
    onChange: function () {},
    onStart: function () {},
    onEnd: function () {},
    skin: defaultSkin,
    format: (val: number) => {
      return val.toFixed(0);
    },
    preciseMode: true,
    unlockDistance: 100,
    defaultValue: 0,
    step: 1,
  };

  // returns angles between 0 and 360 for values lower 0 or greater 360
  normalizeAngle(angle: number): number {
    if (angle < 0) {
      //E.g -1 turns 359
      return angle + 360;
    } else if (angle > 360) {
      return angle - 360;
    }
    return angle;
  }

  // converts a value to an angle for the knob respecting the additional rotateDegrees prop
  convertValueToAngle(value: number): number {
    const angle = (this.getScale()(value) + this.props.rotateDegrees!) % 360;
    return this.normalizeAngle(angle);
  }

  // converts an angle to a value for the knob respecting the additional rotateDegrees prop
  convertAngleToValue(angle: number): number {
    const angle2 = angle - this.props.rotateDegrees!;
    return this.getScale().invert(this.normalizeAngle(angle2));
  }

  getScale() {
    // Memoize scale so it's not recalculated everytime
    if (
      !this.scaleProps ||
      !(
        this.scaleProps.min === this.props.min &&
        this.scaleProps.max === this.props.max &&
        this.scaleProps.clampMin === this.props.clampMin &&
        this.scaleProps.clampMax === this.props.clampMax
      )
    ) {
      if (this.props.rotateDegrees! < 270 && this.props.rotateDegrees! > 90) {
        this.scale = scaleLinear()
          .domain([this.props.min, this.props.max])
          .range([this.props.clampMin!, this.props.clampMax!]);
      } else {
        this.scale = scaleLinear()
          .domain([this.props.max, this.props.min])
          .range([this.props.clampMax!, this.props.clampMin!]);
      }
      this.scale.clamp(true);
      this.scaleProps = {
        min: this.props.min,
        max: this.props.max,
        clampMin: this.props.clampMin!,
        clampMax: this.props.clampMax!,
      };
    }
    return this.scale;
  }
  componentDidMount(): void {
    if (this.props.value == null) {
      /**
       * If the component is not controlled
       * then the state variable uncontrolledValue
       * will be used to store the current value
       */

      this.controlled = false;
      this.setState({
        ...this.state,
        uncontrolledValue: this.props.defaultValue,
      });
    } else {
      this.controlled = true;
    }
    this.setupDragging(select(this.container));
  }

  saveRef(elem: SVGSVGElement): void {
    if (!this.state.svgRef) {
      this.setState({ ...this.state, svgRef: { current: elem } });
    }
  }

  saveParentRef(container: HTMLDivElement): void {
    this.container = container;
  }

  onAngleChanged(angle: number): void {
    //Calculate domain value
    let domainValue = this.convertAngleToValue(angle);
    if (!this.controlled) {
      /**
       * If the mode is 'uncontrolled' we need to update our local state
       */
      this.setState((st) => {
        return { uncontrolledValue: domainValue };
      });
    }
    this.props.onChange(domainValue);
  }

  /**
   * Returns the current value (depending on controlled/uncontrolled mode)
   */
  getValue(): number {
    return this.controlled === true
      ? this.props.value!
      : this.state.uncontrolledValue!;
  }
  setupDragging(elem: d3.Selection<any, any, any, any>): void {
    if (elem == null) {
      return;
    }
    // Add dragging behavior to selector element
    var self = this;
    let vbox = elem.node().getBoundingClientRect();
    const cx = vbox.width / 2;
    const cy = vbox.height / 2;

    function started(event: D3DragEvent<any, any, any>) {
      let value = self.getValue();
      const initialAngle = self.convertValueToAngle(value);
      vbox = elem.node().getBoundingClientRect();
      elem.classed("dragging", true);
      self.props.onStart();
      event.on("drag", dragged).on("end", ended);
      //startPos = position relative to the box center
      //Note: the d3 event container is the same element, so coordinates
      //are relative to it.
      let startPos = { x: event.x - cx, y: event.y - cy };
      let startAngle = utils.getAngleForPoint(startPos.x, startPos.y);
      let lastPos = startPos;
      let lastAngle = utils.getAngleForPoint(lastPos.x, lastPos.y);

      //in precise mode, we won't monitor angle change unless the distance > unlockDistance
      let monitoring = false;
      self.setState({
        ...self.state,
        dragging: true,
        dragDistance: 0,
        mousePos: {
          x: event.sourceEvent.clientX,
          y: event.sourceEvent.clientY,
        }
      });

      function dragged(event) {
        let currentPos = { x: event.x - cx, y: event.y - cy };
        const distanceFromCenter = Math.sqrt(
          Math.pow(currentPos.x, 2) + Math.pow(currentPos.y, 2)
        );

        if (self.props.preciseMode) {
          if (!monitoring && distanceFromCenter >= self.props.unlockDistance!) {
            //Start monitoring!
            //Reset startPos y startAngle
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
          //E.g -1 turns 359
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
            valueAngle: monitoring ? finalAngle : initialAngle,
          };
        });
      }

      function ended() {
        elem.classed("dragging", false);
        self.setState({ ...self.state, dragging: false });
        self.props.onEnd();
        //focus input so it can be moved with arrows
        if (self.inputRef.current) {
          self.inputRef.current.focus();
        }
      }
    }

    const dragInstance = drag();
    //Change the container to the element itself so the
    //event.x and y are relative to the element , not its parent
    dragInstance.container(function () {
      return elem.node();
    });
    elem.call(dragInstance.on("start", started));
  }

  onFormControlChange(newVal: number) {
    if (!this.controlled) {
      /**
       * If the mode is 'uncontrolled' we need to update our local state
       */
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

    const currentValue: number = this.getValue();
    const angle = this.convertValueToAngle(currentValue);

    const styles = {
      container: Object.assign(
        {},
        {
          width: "50px",
          height: "50px",
          overflow: "hidden",
          position: "relative",
        },
        style
      ),
      input: {
        width: "50%",
        position: "absolute",
        top: "0",
        left: "-100%",
      } as CSSProperties,
    };

    //Get custom updates defined by the skin
    //Transform the updateAttributes array into a SvgProxy array
    const updateAttrs: UpdateElement[] | undefined = skin.updateAttributes;
    const skinElemUpdates: JSX.Element[] | undefined =
      updateAttrs &&
      updateAttrs.map((elemUpdate: UpdateElement, ix: number) => {
        let elemContent: string | null = null;
        if (elemUpdate.content) {
          elemContent = elemUpdate.content(this.props, currentValue);
        }
        let attributes: { [key: string]: any } = {};
        //Call value function
        //TODO: support string values
        (elemUpdate.attrs || []).forEach((attr: AttributeSetValue) => {
          attributes[attr.name] = attr.value(this.props, currentValue);
        });

        return (
          <SvgProxy key={ix} selector={elemUpdate.element} {...attributes}>
            {elemContent}
          </SvgProxy>
        );
      });

    return (
      <React.Fragment>
        <div
          ref={this.saveParentRef.bind(this)}
          style={styles.container}
          {...rest}
        >
          <InternalInput
            inputRef={this.inputRef}
            style={styles.input}
            value={currentValue}
            min={min}
            max={max}
            step={this.props.step}
            onChange={this.onFormControlChange.bind(this)}
          />

          <SvgLoader
            style={{ width: "100%", height: "100%" }}
            svgXML={skin.svg}
            onSVGReady={this.saveRef.bind(this)}
          >
            <SvgProxy
              selector="#knob"
              transform={`$ORIGINAL rotate(${angle}, ${skin.knobX}, ${skin.knobY})`}
            />
            {skinElemUpdates}
          </SvgLoader>
        </div>

        {this.state.dragging && this.props.preciseMode && (
          <KnobVisualHelpers
            svgRef={this.state.svgRef!}
            radius={this.state.dragDistance}
            mousePos={this.state.mousePos}
            minimumDragDistance={this.props.unlockDistance}
            valueAngle={this.state.valueAngle}
          />
        )}
      </React.Fragment>
    );
  }
}

export { Knob };
