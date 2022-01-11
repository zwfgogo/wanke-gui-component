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
import mxGeometryChange from '../model/mxGeometryChange'
import mxStyleChange from '../model/mxStyleChange'
import mxCollapseChange from '../model/mxCollapseChange'
import mxEventObject from '../util/mxEventObject'
import mxEvent from '../util/mxEvent'
import mxUndoableEdit from '../util/mxUndoableEdit'
import mxObjectIdentity from '../util/mxObjectIdentity'
import mxCellAttributeChange from '../model/mxCellAttributeChange'

/**
 * Class: mxVisibleChange
 *
 * Action to change a cell's visible state in a model.
 *
 * Constructor: mxVisibleChange
 *
 * Constructs a change of a visible state in the
 * specified model.
 */
class mxVisibleChange {
  constructor(model, cell, visible) {
    this.model = model
    this.cell = cell
    this.visible = visible
    this.previous = visible
  }

  /**
   * Function: execute
   *
   * Changes the visible state of <cell> to <previous> using
   * <mxGraphModel.visibleStateForCellChanged>.
   */
  execute() {
    if (this.cell != null) {
      this.visible = this.previous
      this.previous = this.model.visibleStateForCellChanged(
        this.cell, this.previous)
    }
  }
}

export default mxVisibleChange
