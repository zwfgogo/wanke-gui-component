import {
  mxResources, mxCellRenderer, mxConstants, mxImageShape,
  mxRectangleShape, mxEllipse, mxRhombus, mxCylinder, mxConnector, mxActor,
  mxTriangle, mxHexagon, mxCloud, mxLine, mxArrow, mxArrowConnector, mxDoubleEllipse,
  mxSwimlane, mxLabel, mxStyleRegistry, mxEdgeStyle, mxPerimeter
} from './index'

export default function init() {
  mxResources.add('/resources/graph')
  mxResources.add('/resources/editor')

  mxCellRenderer.registerShape(mxConstants.SHAPE_RECTANGLE, mxRectangleShape)
  mxCellRenderer.registerShape(mxConstants.SHAPE_ELLIPSE, mxEllipse)
  mxCellRenderer.registerShape(mxConstants.SHAPE_RHOMBUS, mxRhombus)
  mxCellRenderer.registerShape(mxConstants.SHAPE_CYLINDER, mxCylinder)
  mxCellRenderer.registerShape(mxConstants.SHAPE_CONNECTOR, mxConnector)
  mxCellRenderer.registerShape(mxConstants.SHAPE_ACTOR, mxActor)
  mxCellRenderer.registerShape(mxConstants.SHAPE_TRIANGLE, mxTriangle)
  mxCellRenderer.registerShape(mxConstants.SHAPE_HEXAGON, mxHexagon)
  mxCellRenderer.registerShape(mxConstants.SHAPE_CLOUD, mxCloud)
  mxCellRenderer.registerShape(mxConstants.SHAPE_LINE, mxLine)
  mxCellRenderer.registerShape(mxConstants.SHAPE_ARROW, mxArrow)
  mxCellRenderer.registerShape(mxConstants.SHAPE_ARROW_CONNECTOR, mxArrowConnector)
  mxCellRenderer.registerShape(mxConstants.SHAPE_DOUBLE_ELLIPSE, mxDoubleEllipse)
  mxCellRenderer.registerShape(mxConstants.SHAPE_SWIMLANE, mxSwimlane)
  mxCellRenderer.registerShape(mxConstants.SHAPE_IMAGE, mxImageShape)
  mxCellRenderer.registerShape(mxConstants.SHAPE_LABEL, mxLabel)

  mxStyleRegistry.putValue(mxConstants.EDGESTYLE_ELBOW, mxEdgeStyle.ElbowConnector)
  mxStyleRegistry.putValue(mxConstants.EDGESTYLE_ENTITY_RELATION, mxEdgeStyle.EntityRelation)
  mxStyleRegistry.putValue(mxConstants.EDGESTYLE_LOOP, mxEdgeStyle.Loop)
  mxStyleRegistry.putValue(mxConstants.EDGESTYLE_SIDETOSIDE, mxEdgeStyle.SideToSide)
  mxStyleRegistry.putValue(mxConstants.EDGESTYLE_TOPTOBOTTOM, mxEdgeStyle.TopToBottom)
  mxStyleRegistry.putValue(mxConstants.EDGESTYLE_ORTHOGONAL, mxEdgeStyle.OrthConnector)
  mxStyleRegistry.putValue(mxConstants.EDGESTYLE_SEGMENT, mxEdgeStyle.SegmentConnector)

  mxStyleRegistry.putValue(mxConstants.PERIMETER_ELLIPSE, mxPerimeter.EllipsePerimeter)
  mxStyleRegistry.putValue(mxConstants.PERIMETER_RECTANGLE, mxPerimeter.RectanglePerimeter)
  mxStyleRegistry.putValue(mxConstants.PERIMETER_RHOMBUS, mxPerimeter.RhombusPerimeter)
  mxStyleRegistry.putValue(mxConstants.PERIMETER_TRIANGLE, mxPerimeter.TrianglePerimeter)
  mxStyleRegistry.putValue(mxConstants.PERIMETER_HEXAGON, mxPerimeter.HexagonPerimeter)
}
