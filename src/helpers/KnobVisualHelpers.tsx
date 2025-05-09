import React, { RefObject, useMemo } from "react";
import HelpersOverlay from "./HelpersOverlay";
import DrawCircle from "./DrawCircle";
import DrawLine from "./DrawLine";
import type { Point } from "../Types";
import utils from "../utils";

/** Precision visual helpers */

/**
 * Precision mode visual helpers
 */
type KnobVisualHelpersProps = {
  svgRef: RefObject<any>;
  radius: number;
  minimumDragDistance: number;
  valueAngle: number;
  mousePos: Point;
};

export const KnobVisualHelpers: React.FC<KnobVisualHelpersProps> = ({
  svgRef,
  radius,
  minimumDragDistance,
  valueAngle,
  mousePos
}) => {
  // Calculate positions based on props
  const { centerX, centerY, valueMarkerX, valueMarkerY } = useMemo(() => {
    const vbox = svgRef.current.getBoundingClientRect();
    const halfWidth = vbox.width / 2;

    // Calculate current angle segment end point
    // Note: Not sure why we need to subtract 90 here
    const valueMarkerX = radius * Math.cos(utils.toRadians(valueAngle - 90));
    const valueMarkerY = radius * Math.sin(utils.toRadians(valueAngle - 90));

    return {
      centerX: vbox.left + halfWidth,
      centerY: vbox.top + halfWidth,
      valueMarkerX,
      valueMarkerY,
    };
  }, [svgRef, radius, valueAngle]);

  const markCircleColor: string = minimumDragDistance <= radius ? "green" : "grey";
  const fillColor: string = minimumDragDistance <= radius ? "#88E22D" : "#D8D8D8";
  const minDistanceCueVisible: boolean = minimumDragDistance >= radius;

  return (
    <HelpersOverlay>
      <svg
        style={{ position: "absolute", top: "0", left: "0" }}
        width="100%"
        height="100%"
      >
        <defs>
          <marker
            id="Triangle"
            viewBox="0 0 10 10"
            refX="1"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>

        {/* Current drag distance */}
        <DrawCircle
          borderColor={markCircleColor}
          fillColor={fillColor}
          fillOpacity={0.02}
          r={radius}
          cx={centerX}
          cy={centerY}
        />
        {/* Minimum drag distance marker */}
        {minDistanceCueVisible && (
          <DrawCircle
            borderColor={markCircleColor}
            fillColor={fillColor}
            fillOpacity={0}
            r={minimumDragDistance}
            cx={centerX}
            cy={centerY}
            strokeDasharray="5, 5"
          />
        )}

        {/* Line to mouse position */}
        <DrawLine
          p1={{ x: centerX, y: centerY }}
          p2={{
            x: valueMarkerX + centerX,
            y: valueMarkerY + centerY,
          }}
          markerEnd="url(#Triangle)"
        />
      </svg>
    </HelpersOverlay>
  );
};