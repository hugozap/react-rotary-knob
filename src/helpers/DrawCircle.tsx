import React from "react";

interface DrawCircleProps {
  r: number;
  borderColor?: string;
  fillColor?: string;
  borderWidth?: number;
  fillOpacity?: number;
  cx: number;
  cy: number;
  strokeDasharray?: string;
}

const DrawCircle: React.FC<DrawCircleProps> = ({
  r,
  borderColor = "black",
  fillColor = "transparent",
  borderWidth = 2,
  fillOpacity = 1,
  cx,
  cy,
  ...rest
}) => {
  return (
    <circle
      stroke={borderColor}
      fill={fillColor}
      fillOpacity={fillOpacity}
      r={r}
      cx={cx}
      cy={cy}
      {...rest}
    />
  );
};

export default DrawCircle;