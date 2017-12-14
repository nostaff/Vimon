<template>
  <div class="swiper-container">
    <slot name="parallax-bg"></slot>
    <div :class="classes.wrapperClass">
      <slot></slot>
    </div>
    <slot name="pagination"></slot>
    <slot name="button-prev"></slot>
    <slot name="button-next"></slot>
    <slot name="scrollbar"></slot>
  </div>
</template>

<script>
/**
 * @component Slides
 * @description
 *
 * ## 轮播组件 / Slides
 *
 * Inspired by [Vue-Awesome-Swiper](https://surmon-china.github.io/vue-awesome-swiper)
 *
 * 基于 [Swiper4](http://www.swiper.com.cn)、适用于 Vue 的轮播组件，支持服务端渲染和单页应用。
 *
 *
 * ### Mount
 *
 * ```javascript
 * // require styles
 * import 'swiper/dist/css/swiper.css'
 *
 * import { Slides, Slide } from 'vimon'
 *
 * export default {
 *   components: {
 *     Slides,
 *     Slide
 *   }
 * }
 * ```
 *
 * #### custom swiper plugin
 *
 * ```javascript
 * import Swiper from 'swiper'
 * Swiper.use({
 *   name: 'pluginName',
 *   params: {
 *     pluginSwitch: false,
 *   },
 *   on: {
 *     init() {
 *       if (!this.params.pluginSwitch) return
 *       console.log('init')
 *     },
 *     // swiper callback...
 *   }
 * })
 * ```
 *
 * ### SPA
 *
 * ```vue
 * <!-- The ref attr used to find the swiper instance -->
 * <template>
 *   <swiper :options="swiperOption" ref="mySwiper">
 *     <!-- slides -->
 *     <swiper-slide>I'm Slide 1</swiper-slide>
 *     <swiper-slide>I'm Slide 2</swiper-slide>
 *     <swiper-slide>I'm Slide 3</swiper-slide>
 *     <swiper-slide>I'm Slide 4</swiper-slide>
 *     <swiper-slide>I'm Slide 5</swiper-slide>
 *     <swiper-slide>I'm Slide 6</swiper-slide>
 *     <swiper-slide>I'm Slide 7</swiper-slide>
 *     <!-- Optional controls -->
 *     <div class="swiper-pagination"  slot="pagination"></div>
 *     <div class="swiper-button-prev" slot="button-prev"></div>
 *     <div class="swiper-button-next" slot="button-next"></div>
 *     <div class="swiper-scrollbar"   slot="scrollbar"></div>
 *   </swiper>
 * </template>
 * ```
 *
 * ``` js
 *   export default {
 *     name: 'carrousel',
 *     data() {
 *       return {
 *         swiperOption: {
 *           // some swiper options/callbacks
 *           // 所有的参数同 swiper 官方 api 参数
 *           // ...
 *         }
 *       }
 *     },
 *     computed: {
 *       swiper() {
 *         return this.$refs.mySwiper.swiper
 *       }
 *     },
 *     mounted() {
 *       // current swiper instance
 *       // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
 *       console.log('this is current swiper instance object', this.swiper)
 *       this.swiper.slideTo(3, 1000, false)
 *     }
 *   }
 * ```
 *
 * ### Async data example
 *
 * ```vue
 * <template>
 *   <swiper :options="swiperOption">
 *     <swiper-slide v-for="slide in swiperSlides">I'm Slide {{ slide }}</swiper-slide>
 *     <div class="swiper-pagination" slot="pagination"></div>
 *   </swiper>
 * </template>
 * ```
 *
 * ```JS
 *   export default {
 *     name: 'carrousel',
 *     data() {
 *       return {
 *         swiperOption: {
 *           pagination: {
 *             el: '.swiper-pagination'
 *           }
 *         },
 *         swiperSlides: [1, 2, 3, 4, 5]
 *       }
 *     },
 *     mounted() {
 *       setInterval(() => {
 *         console.log('simulate async data')
 *         if (this.swiperSlides.length < 10) {
 *           this.swiperSlides.push(this.swiperSlides.length + 1)
 *         }
 *       }, 3000)
 *     }
 *   }
 * ```
 *
 * # API
 * Swiper's API and configuration can be used.（Swiper官网中的API及配置均可使用）
 * - [CN Swiper4 documents](http://www.swiper.com.cn/api/index2.html)
 * - [EN Swiper4 documents](http://idangero.us/swiper/api/)
 *
 * @demo #/slides
 * @see http://idangero.us/swiper/api/
 **/
import objectAssign from 'object-assign'
import _Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

const Swiper = window.Swiper || _Swiper

export default {
  name: 'vm-slides',
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    globalOptions: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  methods: {
    update () {
      if (this.swiper) {
        this.swiper.update && this.swiper.update()
      }
    },
    mountInstance () {
      const swiperOptions = objectAssign({}, this.globalOptions, this.options)
      this.swiper = new Swiper(this.$el, swiperOptions)
    }
  },
  data () {
    return {
      classes: {
        wrapperClass: 'swiper-wrapper'
      }
    }
  },
  ready () {
    if (!this.swiper) {
      this.mountInstance()
    }
  },
  mounted () {
    if (!this.swiper) {
      let setClassName = false
      for (const className in this.classes) {
        if (this.classes.hasOwnProperty(className)) {
          if (this.options[className]) {
            setClassName = true
            this.classes[className] = this.options[className]
          }
        }
      }
      setClassName ? this.$nextTick(this.mountInstance) : this.mountInstance()
    }
  },
  activated () {
    this.update()
  },
  updated () {
    this.update()
  },
  beforeDestroy () {
    if (this.swiper) {
      this.swiper.destroy && this.swiper.destroy()
      delete this.swiper
    }
  }
}
</script>
