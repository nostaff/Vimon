/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import Fab from '../fab.vue'

let wrapper = null
let options = {
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Fab', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(Fab, options)
    const result = `<div class="ion-fab"><span>Test</span></div>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(Fab, options)
    expect(wrapper.name()).toEqual('ion-fab')
  })

  it('@base: have the right className', function () {
    wrapper = mount(Fab, options)
    expect(wrapper.hasClass('ion-fab')).toBeTruthy()
  })
})
