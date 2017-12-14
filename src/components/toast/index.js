import Vue from 'vue'
import Toast from './toast.vue'

import {createElement, uuid} from '../../util/util'

class VmToast {
  constructor () {
    this._vm = undefined
  }

  present (options) {
    if (this._vm) {
      this._vm.$destroy()
      this._vm = undefined
    }

    let rnd = uuid()
    let marker = `ion-toast-${rnd}`
    let container = document.querySelector('.ion-app') || document.body
    createElement(marker, container)
    let selector = `[${marker}]`

    let Component = Vue.extend(Toast)
    this._vm = new Component().$mount(selector)

    return this._vm.present(options)
  }

  dismiss (role) {
    this._vm && this._vm.dismiss(role)
  }
}

export default new VmToast()
