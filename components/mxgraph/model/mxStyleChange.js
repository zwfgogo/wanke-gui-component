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
import mxCollapseChange from '../model/mxCollapseChange'
import mxVisibleChange from '../model/mxVisibleChange'
import mxEventObject from '../util/mxEventObject'
import mxEvent from '../util/mxEvent'
import mxUndoableEdit from '../util/mxUndoableEdit'
import mxObjectIdentity from '../util/mxObjectIdentity'
import mxCellAttributeChange from '../model/mxCellAttributeChange'

/**
 * Class: mxStyleChange
 *
 * Action to change a cell's style in a model.
 *
 * Constructor: mxStyleChange
 *
 * Constructs a change of a style in the
 * specified model.
 */
class mxStyleChange {
  constructor(model, cell, style) {
    this.model = model
    this.cell = cell
    this.style = style
    this.previous = style
  }

  /**
   * Function: execute
   *
   * Changes the style of <cell> to <previous> using
   * <mxGraphModel.styleForCellChanged>.
   */
  execute() {
    if (this.cell != null) {
      this.style = this.previous
      this.previous = this.model.styleForCellChanged(
        this.cell, this.previous)
    }
  }
}

export default mxStyleChange
