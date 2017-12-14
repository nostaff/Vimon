import Vue from 'vue'
import NavigationComponent from './navigation.vue'

import {isFunction, isTrueProperty, isDefined, createElement} from '../util/util'

export default {
  name: 'nav',
  inserted: function (el, binding) {
    let props = {
      hideBackButton: false,
      showBackButton: false
    }
    let options = binding.value
    if (isDefined(options.title)) {
      props.title = options.title.trim()
    }
    if (isDefined(options.hideNavbar)) {
      props.activated = !isTrueProperty(options.hideNavbar)
    }

    if (isDefined(options.hideBackButton)) {
      props.hideBackButton = isTrueProperty(options.hideBackButton)
    }
    if (isDefined(options.backButtonIcon)) {
      props.backButtonIcon = options.backButtonIcon.trim()
    }
    if (isDefined(options.backButtonText)) {
      props.backButtonText = options.backButtonText.trim()
    }
    if (isDefined(options.onBackButtonClick) && isFunction(options.onBackButtonClick)) {
      props.onBackButtonClick = options.onBackButtonClick
    }

    if (isDefined(options.showMoreButton)) {
      props.showMoreBUtton = isTrueProperty(options.showMoreButton)
    }
    if (isDefined(options.moreButtonIcon)) {
      props.moreButtonIcon = options.moreButtonIcon.trim()
    }
    if (isDefined(options.moreButtonText)) {
      props.moreButtonText = options.moreButtonText.trim()
    }
    if (isDefined(options.onMoreButtonClick) && isFunction(options.onMoreButtonClick)) {
      props.onMoreButtonClick = options.onMoreButtonClick
    }

    createElement('ion-navigation', el, true)

    const Navigation = Vue.extend(NavigationComponent)
    Vue.prototype.$navbar = new Navigation({ data: props }).$mount('[ion-navigation]')
  }
}
