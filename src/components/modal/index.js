import Vue from 'vue'
import Modal from './modal.vue'

import {isObject, isString, createElement} from '../../util/util'

class VmModal {
  constructor () {
    this._vm = undefined
  }

  present (options) {
    let components = (options && options.components) ? options.components : {}
    let template = (options && options.template) ? options.template : {}

    if (this._vm) {
      this._vm.$destroy()
      this._vm = undefined
    }

    let container = document.querySelector('.ion-app')
    container.querySelector('[ion-modal]') || createElement('ion-modal', container)

    let ModalComponent = Vue.extend(Modal)
    this._vm = new ModalComponent().$mount('[ion-modal]')

    let ContentComponent
    if (isString(template)) {
      ContentComponent = Vue.extend({
        template: '<div>' + template + '</div>',
        components: components
      })
    } else if (isObject(template)) {
      ContentComponent = Vue.extend(template)
    }

    // create an instance of Profile and mount it on an element
    new ContentComponent({
      $data: options.data // send to component, get by this.$options.$data
    }).$mount(this._vm.$el.querySelector('.modal-viewport'))

    return this._vm.present(options)
  }

  dismiss (role) {
    this._vm.dismiss(role)
  }
}

export default new VmModal()
