import mxGraphModel from '../model/mxGraphModel'
import mxEventSource from '../util/mxEventSource'
import mxCell from '../model/mxCell'
import mxRootChange from '../model/mxRootChange'
import mxChildChange from '../model/mxChildChange'
import mxUtils from '../util/mxUtils'
import mxPoint from '../util/mxPoint'
import mxCellPath from '../model/mxCellPath'
import mxTerminalChange from '../model/mxTerminalChange'
import mxDictionary from '../util/mxDictionary'
import mxValueChange from '../model/mxValueChange'
import mxStyleChange from '../model/mxStyleChange'
import mxCollapseChange from '../model/mxCollapseChange'
import mxVisibleChange from '../model/mxVisibleChange'
import mxEventObject from '../util/mxEventObject'
import mxEvent from '../util/mxEvent'
import mxUndoableEdit from '../util/mxUndoableEdit'
import mxObjectIdentity from '../util/mxObjectIdentity'
import mxCellAttributeChange from '../model/mxCellAttributeChange'

/**
 * Class: mxGeometryChange
 *
 * Action to change a cell's geometry in a model.
 *
 * Constructor: mxGeometryChange
 *
 * Constructs a change of a geometry in the
 * specified model.
 */
class mxGeometryChange {
  constructor(model, cell, geometry) {
    this.model = model
    this.cell = cell
    this.geometry = geometry
    this.previous = geometry
  }

  /**
   * Function: execute
   *
   * Changes the geometry of <cell> ro <previous> using
   * <mxGraphModel.geometryForCellChanged>.
   */
  execute() {
    if (this.cell != null) {
      this.geometry = this.previous
      this.previous = this.model.geometryForCellChanged(
        this.cell, this.previous)
    }
  }
}

export default mxGeometryChange
