import mxMarker from '../shape/mxMarker'

function createOpenArrow(widthFactor) {
  widthFactor = (widthFactor != null) ? widthFactor : 2

  return function (canvas, shape, type, pe, unitX, unitY, size, source, sw, filled) {
    // The angle of the forward facing arrow sides against the x axis is
    // 26.565 degrees, 1/sin(26.565) = 2.236 / 2 = 1.118 ( / 2 allows for
    // only half the strokewidth is processed ).
    var endOffsetX = unitX * sw * 1.118
    var endOffsetY = unitY * sw * 1.118

    unitX = unitX * (size + sw)
    unitY = unitY * (size + sw)

    var pt = pe.clone()
    pt.x -= endOffsetX
    pt.y -= endOffsetY

    pe.x += -endOffsetX * 2
    pe.y += -endOffsetY * 2

    return function () {
      canvas.begin()
      canvas.moveTo(pt.x - unitX - unitY / widthFactor, pt.y - unitY + unitX / widthFactor)
      canvas.lineTo(pt.x, pt.y)
      canvas.lineTo(pt.x + unitY / widthFactor - unitX, pt.y - unitY - unitX / widthFactor)
      canvas.stroke()
    }
  }
}