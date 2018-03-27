<template>
  <div class="ion-spinner" :class="[
        modeClass,
        'spinner-'+name,
        'spinner-'+mode+'-'+name,
        {'spinner-paused':paused}
        ]">
    <svg viewBox="0 0 64 64" v-for="(circle, index) in circles" :key="index" :style="circle.style">
      <circle :r="circle.r" transform="translate(32,32)"></circle>
    </svg>
    <svg viewBox="0 0 64 64" v-for="(line, index) in lines" :key="index" :style="line.style">
      <line :y1="line.y1" :y2="line.y2" transform="translate(32,32)"></line>
    </svg>
  </div>
</template>
<script type="text/javascript">
import ModeMixins from '../../themes/theme.mixins'

const SPINNERS = {
  ios: {
    duration: 1000,
    lines: 12,
    fn: function (dur, index, total) {
      const transform = 'rotate(' + (30 * index + (index < 6 ? 180 : -180)) + 'deg)'
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
      const transform = 'rotate(' + (30 * index + (index < 6 ? 180 : -180)) + 'deg)'
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
  name: 'vm-spinner',
  mixins: [ModeMixins],
  props: {
    name: {
      type: String,
      default: 'ios',
      validator (val) {
        return ~[
          'ios',
          'ios-small',
          'bubbles',
          'circles',
          'crescent',
          'dots'
        ].indexOf(val)
      }
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
  watch: {
    name () {
      this.load()
    },
    duration () {
      this.load()
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
  }
}
</script>

<style lang="scss">
@import "spinner";
@import "spinner.ios";
@import "spinner.md";
</style>
