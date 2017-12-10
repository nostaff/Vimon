<template>
  <div class="ion-spinner" :class="[
        themeClass,
        'spinner-'+name,
        'spinner-'+theme+'-'+name,
        {'spinner-paused':paused}
        ]">
    <svg viewBox="0 0 64 64" v-for="i in circles" :key="i" :style="i.style">
      <circle :r="i.r" transform="translate(32,32)"></circle>
    </svg>
    <svg viewBox="0 0 64 64" v-for="i in lines" :key="i" :style="i.style">
      <line :y1="i.y1" :y2="i.y2" transform="translate(32,32)"></line>
    </svg>
  </div>
</template>
<script>
/**
 * @component Spinner
 * @description
 *
 * ## 其他 / Spinner菊花组件
 *
 * ### 说明
 * Spinner组件提供了一个使用svg+js的方式事项的菊花图(loading). Spinner组件可以通过传入`props`来实时控制Spinner的样子, 用来模拟诸如: processing/thinking/waiting/chilling 等特性.
 *
 * ### 菊花风格
 *
 * Spinner的风格可以是下面的一种: ios/ios-small/bubbles/circles/crescent/dots, 其中, ios默认的是'ios'; md默认的是'crescent'; wp默认的是'circles'; 这些可以通过`config`配置
 *
 *
 * ### 如何使用
 *
 * ```
 * // 引入
 * import Spinner from 'vimo/lib/spinner'
 * // 安装
 * Vue.component(Spinner.name, Spinner)
 * // 或者
 * export default{
 *   components: {
 *    Spinner
 *  }
 * }
 * ```
 *
 * @props {String} [color] - 颜色
 * @props {String} [mode='ios'] - 模式
 * @props {String} [name] - 菊花样式
 * @props {String} [duration] - 旋转动画的持续时间
 * @props {Boolean} [paused] - 是否暂停
 *
 * @demo #/spinner
 *
 * @usage
 * <Spinner></Spinner>
 * <Spinner name="ios"></Spinner>
 * <Spinner mode="wp"></Spinner>
 * <Spinner color="secondary" name="dots"></Spinner>
 * <Spinner duration="3000" name="dots"></Spinner>
 * <Spinner :paused="true" name="ios"></Spinner>
 */
import ThemeMixins from '../../themes/theme.mixins'

const SPINNERS = {
  ios: {
    duration: 1000,
    lines: 12,
    fn: function (dur, index, total) {
      const transform =
        'rotate(' + (30 * index + (index < 6 ? 180 : -180)) + 'deg)'
      const animationDelay = -(dur - dur / total * index) + 'ms'
      return {
        y1: 17,
        y2: 29,
        style: {
          transform: transform,
          webkitTransform: transform,
          animationDelay: animationDelay,
          webkitAnimationDelay: animationDelay
        }
      }
    }
  },

  'ios-small': {
    duration: 1000,
    lines: 12,
    fn: function (dur, index, total) {
      const transform =
        'rotate(' + (30 * index + (index < 6 ? 180 : -180)) + 'deg)'
      const animationDelay = -(dur - dur / total * index) + 'ms'
      return {
        y1: 12,
        y2: 20,
        style: {
          transform: transform,
          webkitTransform: transform,
          animationDelay: animationDelay,
          webkitAnimationDelay: animationDelay
        }
      }
    }
  },

  bubbles: {
    duration: 1000,
    circles: 9,
    fn: function (dur, index, total) {
      const animationDelay = -(dur - dur / total * index) + 'ms'
      return {
        r: 5,
        style: {
          top: 9 * Math.sin(2 * Math.PI * index / total) + 'px',
          left: 9 * Math.cos(2 * Math.PI * index / total) + 'px',
          animationDelay: animationDelay,
          webkitAnimationDelay: animationDelay
        }
      }
    }
  },

  circles: {
    duration: 1000,
    circles: 8,
    fn: function (dur, index, total) {
      const animationDelay = -(dur - dur / total * index) + 'ms'
      return {
        r: 5,
        style: {
          top: 9 * Math.sin(2 * Math.PI * index / total) + 'px',
          left: 9 * Math.cos(2 * Math.PI * index / total) + 'px',
          animationDelay: animationDelay,
          webkitAnimationDelay: animationDelay
        }
      }
    }
  },

  crescent: {
    duration: 750,
    circles: 1,
    fn: function () {
      return {
        r: 26,
        style: {}
      }
    }
  },

  dots: {
    duration: 750,
    circles: 3,
    fn: function (_dur, index) {
      const animationDelay = -(110 * index) + 'ms'
      return {
        r: 6,
        style: {
          left: 9 - 9 * index + 'px',
          animationDelay: animationDelay,
          webkitAnimationDelay: animationDelay
        }
      }
    }
  }
}

export default {
  name: 'ion-spinner',
  mixins: [ThemeMixins],
  props: {
    name: {
      type: String,
      default: 'ios'
    },
    duration: {
      type: Number,
      default: 0
    },
    paused: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      circles: [],
      lines: []
    }
  },

  created () {
    this.load()
  },

  methods: {
    load () {
      this.lines = []
      this.circles = []

      var name = this.name

      const spinner = SPINNERS[name]
      if (spinner) {
        if (spinner.lines) {
          for (let i = 0, l = spinner.lines; i < l; i++) {
            this.lines.push(this._loadEle(spinner, i, l))
          }
        } else if (spinner.circles) {
          for (let i = 0, l = spinner.circles; i < l; i++) {
            this.circles.push(this._loadEle(spinner, i, l))
          }
        }
      }
    },

    _loadEle (spinner, index, total) {
      let duration = this.duration || spinner.duration
      let data = spinner.fn(duration, index, total)
      data.style.animationDuration = duration + 'ms'
      return data
    }
  },

  watch: {
    value: function (newValue) {
      this.hasValue = !!newValue
    }
  }
}
</script>

<style lang="scss">
@import "spinner";
@import "spinner.ios";
@import "spinner.md";
</style>
