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
import mxGeometryChange from '../model/mxGeometryChange'
import mxStyleChange from '../model/mxStyleChange'
import mxCollapseChange from '../model/mxCollapseChange'
import mxVisibleChange from '../model/mxVisibleChange'
import mxEventObject from '../util/mxEventObject'
import mxEvent from '../util/mxEvent'
import mxUndoableEdit from '../util/mxUndoableEdit'
import mxObjectIdentity from '../util/mxObjectIdentity'
import mxCellAttributeChange from '../model/mxCellAttributeChange'

/**
 * Class: mxValueChange
 *
 * Action to change a user object in a model.
 *
 * Constructor: mxValueChange
 *
 * Constructs a change of a user object in the
 * specified model.
 */
class mxValueChange {
  constructor(model, cell, value) {
    this.model = model
    this.cell = cell
    this.value = value
    this.previous = value
  }

  /**
   * Function: execute
   *
   * Changes the value of <cell> to <previous> using
   * <mxGraphModel.valueForCellChanged>.
   */
  execute() {
    if (this.cell != null) {
      this.value = this.previous
      this.previous = this.model.valueForCellChanged(
        this.cell, this.previous)
    }
  }
}

export default mxValueChange
