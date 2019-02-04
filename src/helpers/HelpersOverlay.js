
// @flow
import React, { Component } from "react";
import ReactDOM from 'react-dom';

type HelpersOverlayProps = {
  overlayStyle: ?any
}
/**
 * Draws the overlay and the children
 */
class HelpersOverlay extends React.Component<HelpersOverlayProps> {
    render() {
      const styles = {
        overlay: Object.assign(
          {
            width: "100%",
            height: "100vh",
            top:0,
            left: 0,
            zIndex: 2147483647,
            margin: "0",
            padding: "0",
            boxSizing: "border-box",
            position: "fixed"
          },
          this.props.overlayStyle
        )
      };

      const {overlayStyle, ...rest} = this.props
  
      return ReactDOM.createPortal(<div style={styles.overlay} {...rest}>
        {this.props.children}</div>, document.body);
    }
  }


  export default HelpersOverlay