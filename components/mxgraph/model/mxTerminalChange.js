import mxGraphModel from '../model/mxGraphModel'
import mxEventSource from '../util/mxEventSource'
import mxCell from '../model/mxCell'
import mxRootChange from '../model/mxRootChange'
import mxChildChange from '../model/mxChildChange'
import mxUtils from '../util/mxUtils'
import mxPoint from '../util/mxPoint'
import mxCellPath from '../model/mxCellPath'
import mxDictionary from '../util/mxDictionary'
import mxValueChange from '../model/mxValueChange'
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
 * Class: mxTerminalChange
 *
 * Action to change a terminal in a model.
 *
 * Constructor: mxTerminalChange
 *
 * Constructs a change of a terminal in the
 * specified model.
 */
class mxTerminalChange {
  constructor(model, cell, terminal, source) {
    this.model = model
    this.cell = cell
    this.terminal = terminal
    this.previous = terminal
    this.source = source
  }

  /**
   * Function: execute
   *
   * Changes the terminal of <cell> to <previous> using
   * <mxGraphModel.terminalForCellChanged>.
   */
  execute() {
    if (this.cell != null) {
      this.terminal = this.previous
      this.previous = this.model.terminalForCellChanged(
        this.cell, this.previous, this.source)
    }
  }
}

export default mxTerminalChange
