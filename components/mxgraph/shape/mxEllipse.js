import mxShape from '../shape/mxShape'
import mxUtils from '../util/mxUtils'

/**
 * Copyright (c) 2006-2015, JGraph Ltd
 * Copyright (c) 2006-2015, Gaudenz Alder
 */
/**
 * Class: mxEllipse
 *
 * Extends <mxShape> to implement an ellipse shape.
 * This shape is registered under <mxConstants.SHAPE_ELLIPSE>
 * in <mxCellRenderer>.
 *
 * Constructor: mxEllipse
 *
 * Constructs a new ellipse shape.
 *
 * Parameters:
 *
 * bounds - <mxRectangle> that defines the bounds. This is stored in
 * <mxShape.bounds>.
 * fill - String that defines the fill color. This is stored in <fill>.
 * stroke - String that defines the stroke color. This is stored in <stroke>.
 * strokewidth - Optional integer that defines the stroke width. Default is
 * 1. This is stored in <strokewidth>.
 */
class mxEllipse extends mxShape {
  constructor(bounds, fill, stroke, strokewidth) {
    super()
    this.bounds = bounds
    this.fill = fill
    this.stroke = stroke
    this.strokewidth = (strokewidth != null) ? strokewidth : 1
  }

  /**
   * Function: paintVertexShape
   *
   * Paints the ellipse shape.
   */
  paintVertexShape(c, x, y, w, h) {
    c.ellipse(x, y, w, h)
    c.fillAndStroke()
  }
}

export default mxEllipse
