<template>
  <div class="ion-item-group" :class="{'reorder-enabled reorder-visible':reorderEnabled}">
    <vm-item-divider :color="color" v-if="title">{{title}}</vm-item-divider>
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
import { isTrueProperty } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'
import VmItemDivider from '../item-divider'

export default {
  name: 'vm-item-group',
  mixins: [ModeMixins],
  inject: {
    contentComponent: {
      from: 'contentComponent',
      default: null
    }
  },
  provide () {
    let _this = this
    return {
      itemGroupComponent: _this
    }
  },
  components: {
    VmItemDivider
  },
  props: {
    title: String,
    reorder: {
      type: [String, Boolean],
      default: false
    },
    reorderEnabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      allowReorder: isTrueProperty(this.reorder),
      lastToIndex: -1
    }
  },
  methods: {
    reorderPrepare () {
      let ele = this.$el
      let children = ele.children
      for (let i = 0, ilen = children.length; i < ilen; i++) {
        var child = children[i]
        child.dataset.order = i
      }
    },

    reorderStart () {
      this.setElementClass('reorder-list-active', true)
    },

    reorderEmit (fromIndex, toIndex) {
      this.reorderReset()
      if (fromIndex !== toIndex) {
        const indexes = { from: fromIndex, to: toIndex }
        this.$emit('onItemReorder', indexes)
      }
    },

    scrollContent (scroll) {
      const scrollTop = this.contentComponent.scrollTop + scroll
      if (scroll !== 0) {
        this.contentComponent.scrollTo(0, scrollTop, 0)
      }
      return scrollTop
    },

    reorderReset () {
      let children = this.$el.children
      let len = children.length

      this.setElementClass('reorder-list-active', false)
      let transform = this.$platform.css.transform
      for (let i = 0; i < len; i++) {
        children[i].style[transform] = ''
      }
      this.lastToIndex = -1
    },

    reorderMove (fromIndex, toIndex, itemHeight) {
      if (this.lastToIndex === -1) {
        this.lastToIndex = fromIndex
      }
      let lastToIndex = this.lastToIndex
      this.lastToIndex = toIndex

      /** ******* DOM READ ***********/
      let children = this.$el.children

      /** ******* DOM WRITE **********/
      let transform = this.$platform.css.transform
      if (toIndex >= lastToIndex) {
        for (let i = lastToIndex; i <= toIndex; i++) {
          if (i !== fromIndex) {
            children[i].style[transform] =
              i > fromIndex ? `translateY(${-itemHeight}px)` : ''
          }
        }
      }

      if (toIndex <= lastToIndex) {
        for (let i = toIndex; i <= lastToIndex; i++) {
          if (i !== fromIndex) {
            children[i].style[transform] =
              i < fromIndex ? `translateY(${itemHeight}px)` : ''
          }
        }
      }
    }
  }
}
</script>
