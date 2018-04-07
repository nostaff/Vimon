/* eslint-disable no-undef,no-unused-expressions */

import { mount } from '@vue/test-utils'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'
import Badge from '../../src/components/badge'

let options = {
  propsData: {
    color: 'primary',
    mode: 'ios'
  },
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Badge', function () {
  // 清除DOM痕迹
  it('@base: renders the correct markup', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      }
    })

    let wrapper = mount(Badge, opts)
    const result = '<sup class="ion-badge badge-md badge-md-primary"><span>Test</span></sup>'
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: renders the correct text', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Test</span>'
      }
    })
    let wrapper = mount(Badge, opts)
    expect(wrapper.text()).toEqual('Test')
  })

  it('@base: component must have a name', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Name</span>'
      }
    })
    let wrapper = mount(Badge, opts)
    expect(wrapper.name()).toEqual('vm-badge')
  })

  it('@base: have the right className', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>HasClass</span>'
      }
    })
    let wrapper = mount(Badge, opts)
    expect(wrapper.classes()).toContain('ion-badge')
  })

  // it('@base: matches snapshot', () => {
  //   let wrapper = mount(Badge, opts)
  //   expect(wrapper.element).toMatchSnapshot()
  // })

  it('@props: color', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        color: 'danger',
        mode: 'md'
      },
      slots: {
        default: '<span>color</span>'
      }
    })
    let wrapper = mount(Badge, opts)
    expect(wrapper.classes()).toContain('badge-md-danger')
  })

  it('@props: mode', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      },
      slots: {
        default: '<span>mode</span>'
      }
    })
    let wrapper = mount(Badge, opts)
    expect(wrapper.classes()).toContain('badge-md')
  })

  it('@props: mode(default)', function () {
    let wrapper = mount(Badge)
    expect(wrapper.classes()).toContain('badge-ios')
  })
})
