import mxGraphModel from '../model/mxGraphModel'
import mxEventSource from '../util/mxEventSource'
import mxCell from '../model/mxCell'
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
import mxVisibleChange from '../model/mxVisibleChange'
import mxEventObject from '../util/mxEventObject'
import mxEvent from '../util/mxEvent'
import mxUndoableEdit from '../util/mxUndoableEdit'
import mxObjectIdentity from '../util/mxObjectIdentity'
import mxCellAttributeChange from '../model/mxCellAttributeChange'

//
// Atomic changes
//

/**
 * Class: mxRootChange
 *
 * Action to change the root in a model.
 *
 * Constructor: mxRootChange
 *
 * Constructs a change of the root in the
 * specified model.
 */
class mxRootChange {
  constructor(model, root) {
    this.model = model
    this.root = root
    this.previous = root
  }

  /**
   * Function: execute
   *
   * Carries out a change of the root using
   * <mxGraphModel.rootChanged>.
   */
  execute() {
    this.root = this.previous
    this.previous = this.model.rootChanged(this.previous)
  }
}

export default mxRootChange
