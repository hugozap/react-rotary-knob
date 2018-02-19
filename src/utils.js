// @flow

/** Note on viewbox/width
 * This methods only work when the pixels match the svg units.
 * when the viewbox is changed, or width is set they won't return
 * the correct results
 */
/**
 * Returns the global coordinates of a position given
 * for a specific coordinate system
 * @param {*} svgdoc
 * @param {*} elem
 * @param {*} x
 * @param {*} y
 */
function toGlobalCoordinates(svgdoc: any, elem: any, x: number, y: number) {
    var offset = svgdoc.getBoundingClientRect();
    var matrix = elem.getScreenCTM();
    return {
      x: matrix.a * x + matrix.c * y + matrix.e - offset.left,
      y: matrix.b * x + matrix.d * y + matrix.f - offset.top
    };
  }
  
  /**
   * Converts a global position to a local one
   * @param {*} svgdoc
   * @param {*} elem
   * @param {*} x
   * @param {*} y
   */
  function toLocalCoordinates(svgdoc: any, elem: any, x: number, y: number) {
    var offset = svgdoc.getBoundingClientRect();
    var matrix = elem.getScreenCTM().inverse();
    return {
      x: matrix.a * x + matrix.c * y + matrix.e - offset.left,
      y: matrix.b * x + matrix.d * y + matrix.f - offset.top
    };
  }
  
  function toRadians(angle: number) {
    return angle * Math.PI / 180;
  }
  
  function getQuadrant(x: number, y: number) {
    if (x >= 0 && y >= 0) return 1;
    if (x <= 0 && y >= 0) return 2;
    if (x <= 0 && y <= 0) return 3;
    if (x >= 0 && y <= 0) return 4;
    return 1;
  }
  
  /**
   * Returns the angle (degrees) given a point.
   * Assumes 0,0 as the center of the circle
   * @param {number} x
   * @param {number} y
   */
  function getAngleForPoint(x: number, y: number) {
    if (x == 0 && y == 0) return 0;
  
    const angle = Math.atan(x / y);
    const angleDeg = angle * 180 / Math.PI;
    //The final value depends on the quadrant
    const quadrant = getQuadrant(x, y);
    console.log('quadrant', quadrant)
    let realAngle = angleDeg;
  
       if( quadrant === 1 ) {
         realAngle = 90 - realAngle;
       }
       if (quadrant === 2) {
        realAngle = 90 - angleDeg;
      }
      if (quadrant === 3) {
        realAngle = 270 - angleDeg;
      }
      if (quadrant === 4) {
        realAngle = 270 - angleDeg;
      }
    return realAngle;
  }
  
  export {
    toGlobalCoordinates,
    toLocalCoordinates,
    toRadians,
    getQuadrant,
    getAngleForPoint
  };
  