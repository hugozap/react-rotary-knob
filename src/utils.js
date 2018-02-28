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
    let angleDeg = angle * 180 / Math.PI;
    //The final value depends on the quadrant
    const quadrant = getQuadrant(x, y);

       if( quadrant === 1 ) {
         angleDeg = 90 - angleDeg;
       }
       if (quadrant === 2) {
        angleDeg = 90 - angleDeg;
      }
      if (quadrant === 3) {
        angleDeg = 270 - angleDeg;
      }
      if (quadrant === 4) {
        angleDeg = 270 - angleDeg;
      }
    return angleDeg;
  }


  /**
   * Transforms the top/left variables of the rectangle
   * returned by getBoundingClientRect to document based coordinates
   * without the scroll.
   * UPDATE
   * @param {Rect} box 
   */
  function transformBoundingClientRectToDocument(box) {
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
      const ttop = box.top - scrollY;
      const tleft = box.left - scrollX;
      //info needed to draw line from center to mousepos
  
      return {top: ttop, left: tleft, width:box.width, height: box.height}
    
  }
  
  export default{
    toGlobalCoordinates,
    toLocalCoordinates,
    toRadians,
    getQuadrant,
    getAngleForPoint,
    transformBoundingClientRectToDocument
  };
  