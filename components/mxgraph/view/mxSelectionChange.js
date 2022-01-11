import mxGraphSelectionModel from '../view/mxGraphSelectionModel'
import mxEventSource from '../util/mxEventSource'
import mxClient from '../mxClient'
import mxUtils from '../util/mxUtils'
import mxUndoableEdit from '../util/mxUndoableEdit'
import mxEventObject from '../util/mxEventObject'
import mxEvent from '../util/mxEvent'
import mxLog from '../util/mxLog'
import mxResources from '../util/mxResources'

/**
 * Class: mxSelectionChange
 *
 * Action to change the current root in a view.
 *
 * Constructor: mxCurrentRootChange
 *
 * Constructs a change of the current root in the given view.
 */
class mxSelectionChange {
  constructor(selectionModel, added, removed) {
    this.selectionModel = selectionModel
    this.added = (added != null) ? added.slice() : null
    this.removed = (removed != null) ? removed.slice() : null
  }

  /**
   * Function: execute
   *
   * Changes the current root of the view.
   */
  execute() {
    var t0 = mxLog.enter('mxSelectionChange.execute')
    window.status = mxResources.get(
      this.selectionModel.updatingSelectionResource) ||
      this.selectionModel.updatingSelectionResource

    if (this.removed != null) {
      for (var i = 0; i < this.removed.length; i++) {
        this.selectionModel.cellRemoved(this.removed[i])
      }
    }

    if (this.added != null) {
      for (var i = 0; i < this.added.length; i++) {
        this.selectionModel.cellAdded(this.added[i])
      }
    }

    var tmp = this.added
    this.added = this.removed
    this.removed = tmp

    window.status = mxResources.get(this.selectionModel.doneResource) ||
      this.selectionModel.doneResource
    mxLog.leave('mxSelectionChange.execute', t0)

    this.selectionModel.fireEvent(new mxEventObject(mxEvent.CHANGE,
      'added', this.added, 'removed', this.removed))
  }
}

export default mxSelectionChange
