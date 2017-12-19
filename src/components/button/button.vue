<template>
  <button class="disable-hover ion-button" :class="[modeClass, itemClass]" @click="clickHandler($event)">
    <slot name="backup"></slot>
    <span class="button-inner">
      <slot></slot>
    </span>
    <div class="button-effect"></div>
  </button>
</template>
<script>
import { isTrueProperty } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'

export default {
  name: 'vm-button',
  mixins: [ModeMixins],
  inject: {
    itemComponent: {
      from: 'itemComponent',
      default: null
    }
  },
  props: {
    role: {
      type: String,
      default: 'button'
    },
    menuClose: String,

    outline: Boolean,
    clear: Boolean,
    solid: Boolean,

    // shape
    round: Boolean,

    // display
    block: Boolean,
    full: Boolean,
    menuToggle: Boolean,

    // size
    small: Boolean,
    default: Boolean,
    large: Boolean
  },
  data () {
    return {
      itemClass: '',

      roleName: this.role,

      size: null, // large/small/default
      style: 'default', // outline/clear/solid
      shape: null, // round/fab
      display: null, // block/full
      decorator: null, // strong
      menutoggle: null, // menutoggle

      isItemCover: false
    }
  },
  created () {
    let parentName = this.$parent.$options.name

    // 如果是在组件 buttons 下则修改前缀为 bar-button-
    if (parentName === 'vm-buttons' || parentName === 'vm-toolbar') {
      this.roleName = 'bar-button'
    }

    if (this.role === 'radio' || this.role === 'checkbox' || this.role === 'select') {
      this.roleName = 'item-cover'
    }

    this.getProps()
  },
  mounted () {
    this.assignCss(true)

    this.addClassInItem()
  },
  methods: {
    /**
      * @private
      * @param {Object} $event - $event
      */
    clickHandler ($event) {
      this.$emit('click', $event)
    },
    getProps () {
      isTrueProperty(this.small) && (this.size = 'small')
      isTrueProperty(this.default) && (this.size = 'default')
      isTrueProperty(this.large) && (this.size = 'large')

      isTrueProperty(this.outline) && (this.style = 'outline')
      isTrueProperty(this.clear) && (this.style = 'clear')
      isTrueProperty(this.solid) && (this.style = 'solid')

      isTrueProperty(this.round) && (this.shape = 'round')

      isTrueProperty(this.full) && (this.display = 'full')
      isTrueProperty(this.block) && (this.display = 'block')

      isTrueProperty(this.menuToggle) && (this.menutoggle = 'menutoggle')

      isTrueProperty(this.strong) && (this.decorator = 'strong')
    },

    assignCss (assignCssClass) {
      let role = this.roleName
      if (role) {
        this.setElementClass(role, assignCssClass) // button
        this.setElementClass(`${role}-${this.mode}`, assignCssClass) // button

        this.setClass(this.style, assignCssClass) // button-clear
        this.setClass(this.shape, assignCssClass) // button-round
        this.setClass(this.display, assignCssClass) // button-full
        this.setClass(this.size, assignCssClass) // button-small
        this.setClass(this.decorator, assignCssClass) // button-strong
        this.setClass(this.menutoggle, assignCssClass) // button-menutoggle

        this.updateColor(this.color, assignCssClass) // button-secondary, bar-button-secondary
      }
    },

    setClass (type, assignCssClass) {
      if (type) {
        type = type.toLocaleLowerCase()
        this.setElementClass(`${this.roleName}-${type}`, assignCssClass)
        this.setElementClass(
          `${this.roleName}-${type}-${this.mode}`,
          assignCssClass
        )
      }
    },

    updateColor (color, isAdd) {
      if (color) {
        // The class should begin with the button role
        // button, bar-button
        let className = this.roleName

        // If the role is not a bar-button, don't apply the solid style
        let style = this.style
        style =
          this.roleName !== 'bar-button' && style === 'solid'
            ? 'default'
            : style

        className +=
          style !== null && style !== '' && style !== 'default'
            ? '-' + style.toLowerCase()
            : ''

        if (color !== null && color !== '') {
          this.setElementClass(`${className}-${this.mode}-${color}`, isAdd)
        }
      }
    },

    addClassInItem () {
      if (this.itemComponent && this.roleName === 'button') {
        // button in items should add class of 'item-button'
        this.setElementClass('item-button', true)
      }
    }
  }
}
</script>

<style lang="scss">
@import "button";
@import "button-icon";
@import "button.ios";
@import "button.md";
</style>
