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
import mxVisibleChange from '../model/mxVisibleChange'
import mxEventObject from '../util/mxEventObject'
import mxEvent from '../util/mxEvent'
import mxUndoableEdit from '../util/mxUndoableEdit'
import mxObjectIdentity from '../util/mxObjectIdentity'
import mxCellAttributeChange from '../model/mxCellAttributeChange'

/**
 * Class: mxCollapseChange
 *
 * Action to change a cell's collapsed state in a model.
 *
 * Constructor: mxCollapseChange
 *
 * Constructs a change of a collapsed state in the
 * specified model.
 */
class mxCollapseChange {
  constructor(model, cell, collapsed) {
    this.model = model
    this.cell = cell
    this.collapsed = collapsed
    this.previous = collapsed
  }

  /**
   * Function: execute
   *
   * Changes the collapsed state of <cell> to <previous> using
   * <mxGraphModel.collapsedStateForCellChanged>.
   */
  execute() {
    if (this.cell != null) {
      this.collapsed = this.previous
      this.previous = this.model.collapsedStateForCellChanged(
        this.cell, this.previous)
    }
  }
}

export default mxCollapseChange
