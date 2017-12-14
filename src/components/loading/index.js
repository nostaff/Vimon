import Vue from 'vue'
import Loading from './loading.vue'

import {createElement, uuid} from '../../util/util'

class VmLoading {
  constructor () {
    this._vm = undefined
  }

  present (options) {
    console.log(options)
    let rnd = uuid()
    let marker = `ion-loading-${rnd}`
    let container = document.querySelector('.ion-app')
    createElement(marker, container)
    let selector = `[${marker}]`

    this._vm = new Vue(Loading).$mount(selector)
    this._vm.$el.setAttribute('ion-dialog', '')

    //
    //
    // let el = getInsertPosition(this._position).appendChild(
    //   document.createElement('div')
    // )
    // let PreviewImage = Vue.extend(this._component)
    // let _ins = new PreviewImage({propsData: options})
    // _ins.$mount(el)

    return this._vm.present(options)
  }

  dismiss (role) {
    if (this._vm) this._vm.dismiss(role)
  }
}

export default new VmLoading()
