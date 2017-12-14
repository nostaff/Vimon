import Vue from 'vue'
import Alert from './alert.vue'
import Prompt from './prompt.vue'
import AlertRadio from './alert.radio.vue'
import AlertCheckbox from './alert.checkbox.vue'

import {createElement, uuid} from '../../util/util'

class VmDialog {
  constructor () {
    this._vm = undefined
  }

  present (type, options) {
    console.log(type)
    let rnd = uuid()
    let marker = `ion-${type}-${rnd}`
    let container = document.querySelector('.ion-app') || document.body
    createElement(marker, container)
    let selector = `[${marker}]`

    let component = Alert
    switch (type) {
      case 'alert':
        component = Alert
        break
      case 'prompt':
        component = Prompt
        break
      case 'radio':
        component = AlertRadio
        break
      case 'checkbox':
        component = AlertCheckbox
        break
    }

    this._vm = new Vue(component).$mount(selector)

    this._vm.$el.setAttribute('ion-dialog', '')
    return this._vm.present(options)
  }

  alert (options) {
    return this.present('alert', options)
  }

  confirm (options) {
    return this.present('alert', options)
  }

  prompt (options) {
    return this.present('prompt', options)
  }

  radio (options) {
    return this.present('radio', options)
  }

  checkbox (options) {
    return this.present('checkbox', options)
  }

  dismiss (buttonIndex) {
    this._vm && this._vm.dismiss(buttonIndex)
  }
}

export default new VmDialog()
