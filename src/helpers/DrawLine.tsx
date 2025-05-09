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

const DrawLine: React.FC<DrawLineProps> = ({
  width = 2,
  color = "black",
  p1,
  p2,
  ...rest
}) => {
  return (
    <line
      x1={p1.x}
      y1={p1.y}
      x2={p2.x}
      y2={p2.y}
      stroke={color}
      strokeWidth={width}
      {...rest}
    />
  );
};

export default DrawLine;