import React from "react";
import { createPortal } from 'react-dom';

interface HelpersOverlayProps {
  overlayStyle?: React.CSSProperties | null;
  children: React.ReactNode;
}

/**
 * Draws the overlay and the children
 */
const HelpersOverlay: React.FC<HelpersOverlayProps> = ({
  overlayStyle,
  children,
  ...rest
}) => {
  const styles: { overlay: React.CSSProperties } = {
    overlay: Object.assign(
      {
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: 2147483647,
        margin: "0",
        padding: "0",
        boxSizing: "border-box",
        position: "fixed"
      },
      overlayStyle || {}
    )
  };

  return createPortal(
    <div style={styles.overlay} {...rest}>
      {children}
    </div>, 
    document.body
  );
};

export default HelpersOverlay;