import Vue from 'vue'
import ActionSheet from './action-sheet.vue'

import {createElement} from '../../util/util'

class VmActionSheet {
  constructor () {
    this._vm = undefined
  }

  present (option) {
    createElement('ion-dialog')

    this._vm = new Vue(ActionSheet)
    this._vm.$mount('[ion-dialog]')

    return this._vm.present(option)
  }

  dismiss (buttonIndex) {
    this._vm && this._vm.dismiss(buttonIndex)
  }
}

export default new VmActionSheet()
