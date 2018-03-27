<template>
  <div class="ion-header" :class="[modeClass, {'hide-bar':isHide}]" :style="style">
    <div id="right-button-placeholder"></div>
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
import ModeMixins from '../../themes/theme.mixins'
export default {
  name: 'vm-header',
  mixins: [ModeMixins],
  inject: {
    pageComponent: {
      from: 'pageComponent',
      default: null
    }
  },
  provide () {
    let _this = this
    return {
      headerComponent: _this
    }
  },
  data () {
    return {
      isHide: false,
      style: {}
    }
  },
  created () {
    if (this.pageComponent) {
      this.pageComponent.headerComponent = this
    }
  },
  mounted () {
    this.$events && this.$events.$emit('header:mounted', this)
  },
  methods: {
    /**
     * @function hide
     * @description
     * 隐藏Header
     **/
    hide () {
      this.isHide = true
    },

    /**
     * @function show
     * @description
     * 显示Header
     **/
    show () {
      this.isHide = false
    },

    /**
     * @function toggle
     * @description
     * Toggle显示Header
     **/
    toggle () {
      this.isHide = !this.isHide
    },

    /**
     * @function setStyle
     * @param {object} style - 传入的样式对象
     * @see https://cn.vuejs.org/v2/guide/class-and-style.html#对象语法-1
     * @description
     * 设置Header的样式
     **/
    setStyle (style) {
      this.style = style
    }
  }
}
</script>
