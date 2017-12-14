<template>
  <div class="scroll-content" ref="scrollContent" :class="{'scroll-x': allowScrollX, 'scroll-y': allowScrollY}">
      <div class="scroll-zoom-wrapper">
        <slot></slot>
      </div>
  </div>
</template>
<script>
/**
 * @name Scroll
 * @description
 * Scroll is a non-flexboxed scroll area that can scroll horizontally or vertically. `ion-Scroll` Can be used in places where you may not need a full page scroller, but a highly customized one, such as image scubber or comment scroller.
 *
 * @usage
 * ```html
 * <vm-scroll scrollX="true">
 * </vm-scroll>
 *
 * <vm-scroll scrollY="true">
 * </vm-scroll>
 *
 * <vm-scroll scrollX="true" scrollY="true">
 * </vm-scroll>
 * ```
 * @demo /scroll/
 */
import {isTrueProperty} from '../../util/util'
export default {
  props: {
    scrollX: [Boolean, String],
    scrollY: [Boolean, String],
    zoom: [Boolean, String],
    maxZoom: {
      type: Number,
      default: 1
    },
    onRefresh: {
      type: Function,
      default: undefined,
      required: false
    },
    onInfinite: {
      type: Function,
      default: undefined,
      require: false
    }
  },
  data () {
    return {
      allowScrollX: isTrueProperty(this.scrollX),
      allowScrollY: isTrueProperty(this.scrollY),
      allowZoom: isTrueProperty(this.zoom),
      maxScale: 3,
      zoomDuration: 250,
      startY: 0,
      touching: false,
      infiniteLoading: false
    }
  },
  mounted () {
    this.initEvent()
  },
  methods: {
    initEvent () {
      // 滚动开始之前触发
      this.jsScrollInstance.on('beforeScrollStart', (ev) => {
        this.$emit('beforeScrollStart', ev)
      })
      // 滚动时触发
      this.jsScrollInstance.on('scrollStart', (ev) => {
        this.$emit('scrollStart', ev)
      })
      // 滚动时触发
      this.jsScrollInstance.on('scroll', (ev) => {
        this.$emit('scroll', ev)
      })
      // 取消滚动时触发
      this.jsScrollInstance.on('scrollCancel', (ev) => {
        this.$emit('scrollCancel', ev)
      })
      // 滚动结束时触发
      this.jsScrollInstance.on('scrollEnd', (ev) => {
        this.$emit('scrollEnd', ev)
      })
      // 手指移开屏幕时触发
      this.jsScrollInstance.on('touchEnd', (ev) => {
        this.$emit('touchEnd', ev)
      })
      // 触发了 fastclick 时的回调函数
      this.jsScrollInstance.on('flick', (ev) => {
        this.$emit('flick', ev)
      })
      // 当 better-scroll 刷新时触发
      this.jsScrollInstance.on('refresh', (ev) => {
        this.$emit('refresh', ev)
      })
      // 销毁 better-scroll 实例时触发
      this.jsScrollInstance.on('destroy', (ev) => {
        this.$emit('destroy', ev)
      })
    },
    touchStart (e) {
      this.startY = e.targetTouches[0].pageY
      this.touching = true
    },
    mouseDown (e) {
      this.startY = e.pageY
      this.touching = true
    },
    touchMove (e) {
      if (this.$el.scrollTop > 0 || !this.touching) {
        return
      }
      let diff = e.targetTouches[0].pageY - this.startY
      if (diff > 0) e.preventDefault()
      this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)

      if (this.state === 2) { // in refreshing
        return
      }
      if (this.top >= this.offset) {
        this.state = 1
      } else {
        this.state = 0
      }
    },
    mouseMove (e) {
      if (this.$el.scrollTop > 0 || !this.touching) {
        return
      }
      let diff = e.pageY - this.startY
      if (diff > 0) e.preventDefault()
      this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)

      if (this.state === 2) { // in refreshing
        return
      }
      if (this.top >= this.offset) {
        this.state = 1
      } else {
        this.state = 0
      }
    },
    touchEnd (e) {
      this.touching = false
      if (this.state === 2) { // in refreshing
        this.state = 2
        this.top = this.offset
        return
      }
      if (this.top >= this.offset) { // do refresh
        this.refresh()
      } else { // cancel refresh
        this.state = 0
        this.top = 0
      }
    },
    mouseUp (e) {
      this.touching = false
      if (this.state === 2) { // in refreshing
        this.state = 2
        this.top = this.offset
        return
      }
      if (this.top >= this.offset) { // do refresh
        this.refresh()
      } else { // cancel refresh
        this.state = 0
        this.top = 0
      }
    },
    refresh () {
      this.state = 2
      this.top = this.offset
      this.onRefresh(this.refreshDone)
    },
    refreshDone () {
      this.state = 0
      this.top = 0
    },
    infinite () {
      this.infiniteLoading = true
      this.onInfinite(this.infiniteDone)
    },
    infiniteDone () {
      this.infiniteLoading = false
    },
    onScroll (e) {
      if (this.infiniteLoading) {
        return
      }
      let outerHeight = this.$el.clientHeight
      let innerHeight = this.$el.querySelector('.scroll-inner').clientHeight
      let scrollTop = this.$el.scrollTop
      let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-to-refresh-layer').clientHeight : 0
      let infiniteHeight = this.$el.querySelector('.infinite-layer').clientHeight
      let bottom = innerHeight - outerHeight - scrollTop - ptrHeight

      if (bottom < infiniteHeight) this.infinite()
    }
  }
}
</script>
