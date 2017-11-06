/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import vimo from '../../../src/dist'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'

let App = vimo.App
let wrapper = null
let opts = {
  slots: {
    default: '<span>Name</span>'
  }
}

describe('App', function () {
  // 清除DOM痕迹
  afterEach(() => {
    if (wrapper) {
      wrapper.vm.$el.remove()
      wrapper = null
    }
  })

  it('@config: renders the correct markup', function () {
    wrapper = mount(App, opts)
    const result = `<article version="${window.VM.version}" class="ion-app ios platform-ios enable-hover"><section class="app-root"><span>Name</span></section> <aside id="modalPortal"></aside> <aside id="sheetPortal"></aside> <aside id="alertPortal"></aside> <aside id="loadingPortal"></aside> <aside id="toastPortal"></aside> <aside class="click-block click-block-enabled"></aside> </article>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@config: component must have a name', function () {
    wrapper = mount(App, opts)
    expect(wrapper.name()).to.equal('App')
  })

  it('@config: renders the correct text', function () {
    wrapper = mount(App, opts)
    expect(wrapper.text().trim()).to.equal('Name')
  })

  it('@props: mode', function () {
    let wrapper = mount(App, deepAssign(cloneDeep(opts), {
      propsData: {
        mode: 'md'
      }
    }))
    expect(wrapper.hasClass('platform-md')).to.be.ok
    expect(wrapper.hasClass('md')).to.be.ok
  })

  it('setEnabled(false)', (cb) => {
    wrapper = mount(App)

    wrapper.vm.setEnabled(false, 400)
    expect(wrapper.vm.isEnabled).to.not.be.ok
    setTimeout(() => {
      expect(wrapper.vm.isEnabled).to.be.ok
      cb()
    }, 500)
  })

  it('setEnabled(true)', (cb) => {
    wrapper = mount(App)

    wrapper.vm.setEnabled(true)
    setTimeout(() => {
      expect(wrapper.vm.isEnabled).to.be.ok
      cb()
    }, 100)
  })

  it('setDisableScroll(false)', function () {
    wrapper = mount(App)

    wrapper.vm.setDisableScroll(false)
    expect(wrapper.vm.isScrollDisabled).to.not.be.ok
  })

  it('setDisableScroll(true)', (cb) => {
    wrapper = mount(App)

    wrapper.vm.setDisableScroll(true, 90)
    expect(wrapper.vm.isScrollDisabled).to.be.ok
    setTimeout(() => {
      expect(wrapper.vm.isScrollDisabled).to.not.be.ok
      cb()
    }, 100)
  })

  it('setClass()', function () {
    wrapper = mount(App)

    wrapper.vm.setClass('test123', true)
    expect(wrapper.hasClass('test123')).to.be.ok
  })

  it('setDocTitle()', (cb) => {
    wrapper = mount(App)

    wrapper.vm.setDocTitle('title123')
    setTimeout(() => {
      expect(document.title).to.equal('title123')
      cb()
    }, 100)
  })

  it('setDocTitle():in-some-platform', (cb) => {
    wrapper = mount(App)
    wrapper.vm.$platform.platforms = function () {
      return ['mobile', 'ios', 'alipay']
    }
    wrapper.vm.setDocTitle('title123')
    setTimeout(() => {
      expect(document.title).to.equal('title123')
      cb()
    }, 100)
  })

  it('setDocTitle():platformHandled', (cb) => {
    wrapper = mount(App)
    let opts = 'test123'
    let options = ''
    window.VM.platform.setNavbarTitle = function (_opts) {
      console.log('setDocTitle() 使用测试版本')
      options = _opts
      expect(JSON.stringify(options)).to.equal(JSON.stringify({title: opts}))
      window.VM.platform.setNavbarTitle = undefined
      cb()
      return true
    }

    wrapper.vm.setDocTitle(opts)
  })

  it('$on(onScrollStart)', (cb) => {
    wrapper = mount(App)
    wrapper.vm.$events.$emit('onScrollStart')
    setTimeout(() => {
      expect(wrapper.vm.isScrolling).to.be.ok
      cb()
    }, 0)
  })

  it('$on(onScroll)', (cb) => {
    wrapper = mount(App)
    wrapper.vm.$events.$emit('onScroll')
    setTimeout(() => {
      expect(wrapper.vm.isScrolling).to.be.ok
      cb()
    }, 0)
  })

  it('$on(onScrollEnd)', (cb) => {
    wrapper = mount(App)
    wrapper.vm.$events.$emit('onScrollEnd')
    setTimeout(() => {
      expect(wrapper.vm.isScrolling).to.not.be.ok
      cb()
    }, 0)
  })
})
