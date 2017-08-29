import assign from 'object-assign'
import Vue from 'vue'
import Tabbar from '../components/tabs/tabbar.vue'

import VueEvents from 'vue-events'
Vue.use(VueEvents)

import {createElement} from '../utils/utils'

let _vm = undefined;

Vue.directive('tabbar', {
    inserted: function (el, binding) {
        setTimeout(() => {
            let props = {}
            let data = binding.value

            if (data.color) props.color = data.color
            if (data.onItemClick) props.onItemClick = data.onItemClick

            createElement('ion-tabbar', el, true)

            _vm = new Vue(assign({}, Tabbar, {
                data: {
                    items: data.items,
                    selectedIndex: data.selectedIndex,
                    state: 1
                },
                propsData: props
            })).$mount('[ion-tabbar]')
        })
    }
})

function vmReady() {
    let cnt = 0;
    return new Promise((resolve, reject) => {
        let timer = setInterval(() => {
            if (cnt > 100) {
                reject('Tabbar _vm undefined.')
                return
            }
            cnt++
            if (_vm) {
                clearInterval(timer)
                resolve()
            }
        }, 10)
    })
}

Vue.directive('tabbar-item-index', {
    inserted: function (el, binding) {
        this.$events.$emit('selectedItem', binding.value)
        vmReady().then(() => {
            _vm.selectedItem(binding.value)
        })
    }
})

window.$tabbar = _vm
