<template>
  <i class="ion-icon" role="img" :class="[modeClass, colorClass]"></i>
</template>
<script>
import { isTrueProperty } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'
import 'ionicons/dist/css/ionicons.css'

export default {
  name: 'vm-icon',
  mixins: [ModeMixins],
  inject: {
    itemComponent: {
      from: 'itemComponent',
      default: null
    }
  },
  data () {
    return {
      css: '',
      iconName: '',
      isActived: isTrueProperty(this.isActive),
      hidden: false
    }
  },
  props: {
    name: String,
    ios: String,
    md: String,
    isActive: [String, Boolean],
    mode: {
      type: String,
      default () {
        return (this.$config && this.$config.get('iconMode')) || 'ios'
      }
    }
  },
  watch: {
    name (val) {
      this.update()
    },
    isActive (val) {
      this.isActived = isTrueProperty(val)
      this.update()
    },
    ios () {
      this.update()
    },
    md () {
      this.update()
    }
  },
  mounted () {
    if (this.itemComponent) {
      this.setElementClass('item-icon', true)
    }
    this.update()
  },
  destroyed () {
    if (this.css) {
      this.setElementClass(this.css, false)
    }
  },
  methods: {
    getIconName (val) {
      if (!(/^md-|^ios-|^logo-|^icon-/.test(val))) {
        // this does not have one of the defaults
        // so lets auto add in the mode prefix for them
        return this.mode + '-' + val
      } else {
        return val
      }
    },
    update () {
      let hidden = (this.hidden = this.name === null)
      if (hidden) {
        return
      }

      if (this.isActive && this.activeName) {
        this.iconName = this.getIconName(this.activeName)
      } else {
        this.iconName = this.getIconName(this.name)
      }

      let iconName
      if (this.ios && this.mode === 'ios') {
        iconName = this.ios
      } else if (this.md && this.mode === 'md') {
        iconName = this.md
      } else {
        iconName = this.iconName
      }

      let iconMode = iconName.split('-', 2)[0]
      if (
        iconMode === 'ios' &&
        !this.isActive &&
        iconName.indexOf('logo-') < 0 &&
        iconName.indexOf('-outline') < 0
      ) {
        iconName += '-outline'
      }

      // ios-star-outline -> ion-ios-star-outline
      // ios-star -> ion-ios-star-outline
      // icon-star -> icon-star
      let css
      if (iconMode === 'icon') {
        css = iconName
      } else {
        css = 'ion-' + iconName
      }

      if (this.css === css) {
        return
      }
      if (this.css) {
        this.setElementClass(this.css, false)
      }
      this.css = css
      this.setElementClass(css, true)

      let label = iconName
        .replace('ios-', '')
        .replace('md-', '')
        .replace('-', ' ')
      this.setElementAttribute('aria-label', label)
    }
  }
}
</script>

<style lang="scss">
@import "icon";
@import "icon.ios";
@import "icon.md";
</style>
