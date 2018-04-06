<template>
  <button class="ion-button" :class="[modeClass, itemClass]" 
    @click="clickHandler"
    @touchstart="touchStart"
    @mousedown="mouseDown"
  >
    <span class="button-inner">
      <slot></slot>
    </span>
  </button>
</template>
<script type="text/javascript">
import { isTrueProperty } from '../../util/util'
import { addRippleEffect } from '../../util/dom'
import ModeMixins from '../../themes/theme.mixins'

export default {
  name: 'vm-button',
  mixins: [ModeMixins],
  inject: {
    itemComponent: {
      from: 'itemComponent',
      default: null
    },
    toolbarComponent: {
      from: 'toolbarComponent',
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
    menutoggle: Boolean,

    // size
    small: Boolean,
    default: Boolean,
    large: Boolean
  },
  data () {
    return {
      itemClass: '',

      roleName: this.role,
      lastClick: -10000,

      size: null, // large/small/default
      style: 'default', // outline/clear/solid
      shape: null, // round/fab
      display: null, // block/full
      decorator: null, // strong
      menuToggle: null // menutoggle
    }
  },
  created () {
    // 如果是在组件 buttons 下则修改前缀为 bar-button-
    if (this.toolbarComponent) {
      this.roleName = 'bar-button'
    }

    if (this.role === 'radio' || this.role === 'checkbox' || this.role === 'select') {
      this.roleName = 'item-cover'
    }

    this.getProps()
  },
  mounted () {
    this.assignCss(true)
    this.addIconBtnPosition()
    this.addClassInItem()
  },
  methods: {
    clickHandler (ev) {
      this.$emit('click', ev)
    },
    touchStart (ev) {
      if (this.mode !== 'md') return

      this.lastClick = Date.now()
      const touches = ev.touches[0]
      addRippleEffect(this.$el, touches.clientX, touches.clientY)
    },
    mouseDown (ev) {
      if (this.mode !== 'md') return

      const timeStamp = Date.now()
      if (this.lastClick < (timeStamp - 1000)) {
        addRippleEffect(this.$el, ev.pageX, ev.pageY)
      }
    },
    getProps () {
      isTrueProperty(this.small) && (this.size = 'small')
      isTrueProperty(this.default) && (this.size = '')
      isTrueProperty(this.large) && (this.size = 'large')

      isTrueProperty(this.outline) && (this.style = 'outline')
      isTrueProperty(this.clear) && (this.style = 'clear')
      isTrueProperty(this.solid) && (this.style = 'solid')

      isTrueProperty(this.round) && (this.shape = 'round')

      isTrueProperty(this.full) && (this.display = 'full')
      isTrueProperty(this.block) && (this.display = 'block')

      isTrueProperty(this.menutoggle) && (this.menuToggle = 'menutoggle')

      isTrueProperty(this.strong) && (this.decorator = 'strong')
    },

    assignCss (assignCssClass) {
      let role = this.roleName
      if (role) {
        this.setClass(this.style, assignCssClass) // button-clear
        this.setClass(this.shape, assignCssClass) // button-round
        this.setClass(this.display, assignCssClass) // button-full
        this.setClass(this.size, assignCssClass) // button-small
        this.setClass(this.decorator, assignCssClass) // button-strong
        this.setClass(this.menuToggle, assignCssClass) // button-menutoggle

        this.updateColor(this.color, assignCssClass) // button-secondary, bar-button-secondary

        if (role !== 'button') {
          this.setElementClass(role)
        }
      }
    },

    setClass (type, assignCssClass) {
      if (type) {
        type = type.toLocaleLowerCase()
        if (type === '') return
        this.setElementClass(`${this.roleName}-${type}`, assignCssClass)
        this.setElementClass(`${this.roleName}-${type}-${this.mode}`, assignCssClass)
      }
    },

    updateColor (color, isAdd) {
      if (color) {
        // The class should begin with the button role
        // button, bar-button
        let className = this.roleName

        // If the role is not a bar-button, don't apply the solid style
        let style = this.style
        style = (this.roleName !== 'bar-button' && style === 'solid') ? 'default' : style

        className += (style !== null && style !== '' && style !== 'default') ? '-' + style.toLowerCase() : ''

        if (color !== null && color !== '') {
          this.setElementClass(`${className}-${this.mode}-${color}`, isAdd)
        }
      }
    },

    // 设置icon button的左右位置
    addIconBtnPosition () {
      let _firstSlot = null
      let _lastSlot = null
      let _length = this.$slots && this.$slots.default ? this.$slots.default.length : 0

      if (_length > 0) {
        _firstSlot = this.$slots.default[0]
        _lastSlot = this.$slots.default[_length - 1]
        // icon-only
        if (_length === 1 && this.isIconComponent(_firstSlot)) {
          this.setElementAttribute('icon-only')
        }

        if (_length > 1) {
          // icon left
          if (this.isIconComponent(_firstSlot) && this.roleName !== 'bar-button') {
            this.setElementAttribute('icon-start')
          }
          // icon right
          if (this.isIconComponent(_lastSlot)) {
            this.setElementAttribute('icon-end')
          }
        }
      }
    },

    // 判断slot是icon组件
    isIconComponent (slot) {
      return !!slot.componentOptions && !!slot.componentOptions.tag && slot.componentOptions.tag.toLowerCase() === 'vm-icon'
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
@import "button-effect";
@import "button.ios";
@import "button.md";
</style>
