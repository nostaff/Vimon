<template>
  <div class="ion-page show-page" :box="isBox" :style="{zIndex:pageZIndex}" :class="{'vm-box':isBox}">
    <slot></slot>
  </div>
</template>

<script>
import ModeMixins from '../../themes/theme.mixins'

let initPageZIndex = 1000
export default {
  name: 'vm-page',
  mixins: [ModeMixins],
  inject: {
    // Modal 组件可能包裹 Page 组件, 则使用Box布局
    modalComponent: {
      from: 'modalComponent',
      default: null
    }
  },
  provide () {
    let _this = this
    return {
      pageComponent: _this
    }
  },
  data () {
    return {
      pageZIndex: 0,
      headerComponent: null,
      footerComponent: null,
      contentComponent: null
    }
  },
  props: {
    box: {
      type: Boolean,
      default () { return this.$config && this.$config.getBoolean('box') || false } // 盒子模型(固定高度宽度布局)
    }
  },
  computed: {
    isBox () {
      return !!this.box || !!this.modalComponent
    }
  },
  methods: {
    getHeaderComponent () {
      return this.headerComponent
    },
    getFooterComponent () {
      return this.footerComponent
    }
  },
  created () {
    let direction = this.$history.getDirection()
    if (direction === 'forward') {
      this.pageZIndex = ++initPageZIndex
    } else if (direction === 'backward') {
      this.pageZIndex = --initPageZIndex
    } else {
      this.pageZIndex = initPageZIndex
    }
    this.$events.$emit('page:created')
  },
  mounted () {
    this.$events.$emit('page:mounted')
  }
}
</script>
