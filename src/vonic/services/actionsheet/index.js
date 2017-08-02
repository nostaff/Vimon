import Vue from 'vue'
import ActionSheet from './action-sheet.vue'

import {createElement} from '../utils'

class IonActionSheet {
    constructor() {
        this._vm = undefined
    }

    show(option) {
        createElement('ion-action-sheet')

        this._vm = new Vue(ActionSheet)
        this._vm.$mount('[ion-action-sheet]')

        setTimeout(() => {
            this._vm.show(option)
        })
    }

    hide(buttonIndex) {
        this._vm.hide(buttonIndex)
    }

    getState() {
        return this._vm ? this._vm.getState() : 0
    }
}

window.$actionSheet = new IonActionSheet()
