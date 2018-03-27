<template>
  <div :class="slideClass">
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
/**
 * @component Slides/Slide
 * @description
 *
 * ## 轮播页 / Slide
 *
 * Slide组件为Slides组件的子组件 两者配合使用, 属于嵌套关系.
 *
 * @slot 轮播页面内容
 *
 * @fires component:Segment#onSelect
 * @see component:Segment
 */

export default {
  name: 'vm-swiper-slide',
  data () {
    return {
      slideClass: 'swiper-slide'
    }
  },
  ready () {
    this.update()
  },
  mounted () {
    this.update()
    if (this.$parent && this.$parent.options && this.$parent.options.slideClass) {
      this.slideClass = this.$parent.options.slideClass
    }
  },
  updated () {
    this.update()
  },
  attached () {
    this.update()
  },
  methods: {
    update () {
      if (this.$parent && this.$parent.swiper && this.$parent.swiper.update) {
        this.$parent.swiper.update(true)
        if (this.$parent.options.loop) {
          this.$parent.swiper.reLoop && this.$parent.swiper.reLoop()
        }
      }
    }
  }
}
</script>
