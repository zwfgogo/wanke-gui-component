import mxMarker from '../shape/mxMarker'
import mxConstants from '../util/mxConstants'

function diamond(canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) {
  // The angle of the forward facing arrow sides against the x axis is
  // 45 degrees, 1/sin(45) = 1.4142 / 2 = 0.7071 ( / 2 allows for
  // only half the strokewidth is processed ). Or 0.9862 for thin diamond.
  // Note these values and the tk variable below are dependent, update
  // both together (saves trig hard coding it).
  var swFactor = (type == mxConstants.ARROW_DIAMOND) ? 0.7071 : 0.9862
  var endOffsetX = unitX * sw * swFactor
  var endOffsetY = unitY * sw * swFactor

  unitX = unitX * (size + sw)
  unitY = unitY * (size + sw)

  var pt = pe.clone()
  pt.x -= endOffsetX
  pt.y -= endOffsetY

  pe.x += -unitX - endOffsetX
  pe.y += -unitY - endOffsetY

  // thickness factor for diamond
  var tk = ((type == mxConstants.ARROW_DIAMOND) ? 2 : 3.4)

  return function () {
    canvas.begin()
    canvas.moveTo(pt.x, pt.y)
    canvas.lineTo(pt.x - unitX / 2 - unitY / tk, pt.y + unitX / tk - unitY / 2)
    canvas.lineTo(pt.x - unitX, pt.y - unitY)
    canvas.lineTo(pt.x - unitX / 2 + unitY / tk, pt.y - unitY / 2 - unitX / tk)
    canvas.close()

    if (filled) {
      canvas.fillAndStroke()
    } else {
      canvas.stroke()
    }
  }
}