/**
 * Show the rotation circle and marker
 * dispatches drag events
 */

import React, {
  CSSProperties,
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
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

/**
 * Generic knob component
 */
const Knob = (props: KnobProps) => {
  const {
    value,
    defaultValue = 0,
    min = 0,
    max = 100,
    clampMin = 0,
    clampMax = 360,
    rotateDegrees = 0,
    onChange = () => {},
    onStart = () => {},
    onEnd = () => {},
    skin = defaultSkin,
    format = (val: number) => val.toFixed(0),
    preciseMode = true,
    unlockDistance = 100,
    step = 1,
    style,
    ...rest
  } = props;

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [svgRef, setSvgRef] = useState<React.RefObject<SVGSVGElement> | undefined>(undefined);

  // State
  const [state, setState] = useState({
    dragging: false,
    dragDistance: 0,
    mousePos: { x: 0, y: 0 },
    valueAngle: 0,
    uncontrolledValue: defaultValue,
  });

  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined;
  
  // Scale setup with memoization
  const scaleConfig = useMemo(() => {
    return {
      min,
      max,
      clampMin,
      clampMax
    };
  }, [min, max, clampMin, clampMax]);

  const scale = useMemo(() => {
    let scaleObj;
    if (rotateDegrees < 270 && rotateDegrees > 90) {
      scaleObj = scaleLinear()
        .domain([min, max])
        .range([clampMin, clampMax]);
    } else {
      scaleObj = scaleLinear()
        .domain([max, min])
        .range([clampMax, clampMin]);
    }
    scaleObj.clamp(true);
    return scaleObj;
  }, [scaleConfig, rotateDegrees]);

  // Helper functions
  const normalizeAngle = useCallback((angle: number): number => {
    if (angle < 0) {
      return angle + 360;
    } else if (angle > 360) {
      return angle - 360;
    }
    return angle;
  }, []);

  const convertValueToAngle = useCallback((value: number): number => {
    const angle = (scale(value) + rotateDegrees) % 360;
    return normalizeAngle(angle);
  }, [scale, rotateDegrees, normalizeAngle]);

  const convertAngleToValue = useCallback((angle: number): number => {
    const angle2 = angle - rotateDegrees;
    return scale.invert(normalizeAngle(angle2));
  }, [scale, rotateDegrees, normalizeAngle]);

  // Get current value based on controlled/uncontrolled mode
  const getValue = useCallback((): number => {
    return isControlled ? value! : state.uncontrolledValue!;
  }, [isControlled, value, state.uncontrolledValue]);

  // Value change handler
  const onAngleChanged = useCallback((angle: number): void => {
    const domainValue = convertAngleToValue(angle);
    if (!isControlled) {
      setState(prevState => ({
        ...prevState,
        uncontrolledValue: domainValue
      }));
    }
    onChange(domainValue);
  }, [isControlled, convertAngleToValue, onChange]);

  const onFormControlChange = useCallback((newVal: number) => {
    if (!isControlled) {
      setState(prevState => ({
        ...prevState,
        uncontrolledValue: newVal
      }));
    }
    onChange(newVal);
  }, [isControlled, onChange]);

  // Setup dragging behavior
  const setupDragging = useCallback((elem: d3.Selection<any, any, any, any>) => {
    if (elem == null) {
      return;
    }

    let vbox = elem.node().getBoundingClientRect();
    const cx = vbox.width / 2;
    const cy = vbox.height / 2;

    function started(event: D3DragEvent<any, any, any>) {
      let currentValue = getValue();
      const initialAngle = convertValueToAngle(currentValue);
      vbox = elem.node().getBoundingClientRect();
      elem.classed("dragging", true);
      onStart();
      event.on("drag", dragged).on("end", ended);
      
      let startPos = { x: event.x - cx, y: event.y - cy };
      let startAngle = utils.getAngleForPoint(startPos.x, startPos.y);
      let lastPos = startPos;
      
      let monitoring = false;
      setState(prevState => ({
        ...prevState,
        dragging: true,
        dragDistance: 0,
        mousePos: {
          x: event.sourceEvent.clientX,
          y: event.sourceEvent.clientY,
        }
      }));

      function dragged(event: any) {
        let currentPos = { x: event.x - cx, y: event.y - cy };
        const distanceFromCenter = Math.sqrt(
          Math.pow(currentPos.x, 2) + Math.pow(currentPos.y, 2)
        );

        if (preciseMode) {
          if (!monitoring && distanceFromCenter >= unlockDistance) {
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
        finalAngle = normalizeAngle(finalAngle);
        
        if (monitoring) {
          onAngleChanged(finalAngle);
        }
        
        setState(prevState => ({
          ...prevState,
          dragDistance: distanceFromCenter,
          valueAngle: monitoring ? finalAngle : initialAngle,
        }));
      }

      function ended() {
        elem.classed("dragging", false);
        setState(prevState => ({ ...prevState, dragging: false }));
        onEnd();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    }

    const dragInstance = drag();
    dragInstance.container(function () {
      return elem.node();
    });
    elem.call(dragInstance.on("start", started));
  }, [getValue, convertValueToAngle, onStart, onEnd, preciseMode, unlockDistance, normalizeAngle, onAngleChanged]);

  // Initialize drag behavior on mount
  useEffect(() => {
    if (containerRef.current) {
      setupDragging(select(containerRef.current));
    }
  }, [setupDragging]);

  // Handle SVG ref
  const saveRef = useCallback((elem: SVGSVGElement) => {
    if (!svgRef) {
      setSvgRef({ current: elem });
    }
  }, [svgRef]);

  // Render the component
  const currentValue = getValue();
  const angle = convertValueToAngle(currentValue);

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

  // Get custom updates defined by the skin
  const updateAttrs: UpdateElement[] | undefined = skin.updateAttributes;
  const skinElemUpdates: JSX.Element[] | undefined =
    updateAttrs &&
    updateAttrs.map((elemUpdate: UpdateElement, ix: number) => {
      let elemContent: string | null = null;
      if (elemUpdate.content) {
        elemContent = elemUpdate.content(props, currentValue);
      }
      let attributes: { [key: string]: any } = {};
      (elemUpdate.attrs || []).forEach((attr: AttributeSetValue) => {
        attributes[attr.name] = attr.value(props, currentValue);
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
        ref={containerRef}
        style={styles.container}
        {...rest}
      >
        <InternalInput
          inputRef={inputRef}
          style={styles.input}
          value={currentValue}
          min={min}
          max={max}
          step={step}
          onChange={onFormControlChange}
        />

        <SvgLoader
          style={{ width: "100%", height: "100%" }}
          svgXML={skin.svg}
          onSVGReady={saveRef}
        >
          <SvgProxy
            selector="#knob"
            transform={`$ORIGINAL rotate(${angle}, ${skin.knobX}, ${skin.knobY})`}
          />
          {skinElemUpdates}
        </SvgLoader>
      </div>

      {state.dragging && preciseMode && (
        <KnobVisualHelpers
          svgRef={svgRef!}
          radius={state.dragDistance}
          mousePos={state.mousePos}
          minimumDragDistance={unlockDistance}
          valueAngle={state.valueAngle}
        />
      )}
    </React.Fragment>
  );
};

export { Knob };