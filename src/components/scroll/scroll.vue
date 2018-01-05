<template>
  <div ref="wrapper" class="vm-scroll-wrapper">
    <div class="vm-scroll-content">
      <div ref="listWrapper">
        <slot></slot>
      </div>
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div class="vm-pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{ pullUpTxt }}</span>
          </div>
          <div class="after-trigger" v-else>
            <vm-spinner name="ios"></vm-spinner>
          </div>
        </div>
      </slot>
    </div>
    <slot name="pulldown" :pullDownRefresh="pullDownRefresh" :pullDownStyle="pullDownStyle" :beforePullDown="beforePullDown" :isPullingDown="isPullingDown" :bubbleY="bubbleY">
      <div class="vm-pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <vm-bubble :y="bubbleY"></vm-bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <vm-spinner name="ios"></vm-spinner>
          </div>
          <div v-else>
            <span>{{ refreshTxt }}</span>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { getRect } from '../../util/dom'
import VmBubble from './bubble'
import VmSpinner from '../spinner'

const DEFAULT_OPTIONS = {
  observeDOM: true,
  click: true,
  probeType: 1,
  scrollbar: false,
  pullDownRefresh: false,
  pullUpLoad: false
}

export default {
  name: 'vm-scroll',
  components: {
    VmBubble,
    VmSpinner
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'vertical'
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    listRef: {
      type: String,
      default: 'list'
    }
  },
  data () {
    return {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      isPullUpLoad: false,
      pullUpDirty: true,
      bubbleY: 0,
      pullDownStyle: ''
    }
  },
  computed: {
    pullUpLoad () {
      return this.options.pullUpLoad
    },
    pullDownRefresh () {
      return this.options.pullDownRefresh
    },
    pullUpTxt () {
      const pullUpLoad = this.pullUpLoad
      const txt = pullUpLoad && pullUpLoad.txt
      const moreTxt = (txt && txt.more) || 'Load more'
      const noMoreTxt = (txt && txt.noMore) || 'No more data'

      return this.pullUpDirty ? moreTxt : noMoreTxt
    },
    refreshTxt () {
      const pullDownRefresh = this.pullDownRefresh
      return (pullDownRefresh && pullDownRefresh.txt) || 'Refresh success'
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.forceUpdate(true)
      }, this.refreshDelay)
    }
  },
  created () {
    this.pullDownInitTop = -50
  },
  mounted () {
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  methods: {
    initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
        this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
      }

      let options = Object.assign(
        {},
        DEFAULT_OPTIONS,
        {
          scrollY: this.direction === 'vertical',
          scrollX: this.direction === 'horizontal'
        },
        this.options
      )

      this.scroll = new BScroll(this.$refs.wrapper, options)

      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
      }

      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('before-scroll-start')
        })
      }

      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }

      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    destroy () {
      this.scroll.destroy()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    clickItem (item) {
      this.$emit('click', item)
    },
    forceUpdate (dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false
        this._reboundPullDown().then(() => {
          this._afterPullDown()
        })
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false
        this.scroll.finishPullUp()
        this.pullUpDirty = dirty
        this.refresh()
      } else {
        this.refresh()
      }
    },
    _initPullDownRefresh () {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false
        this.isPullingDown = true
        this.$emit('pulling-down')
      })

      this.scroll.on('scroll', pos => {
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
          this.pullDownStyle = `top:${Math.min(
            pos.y + this.pullDownInitTop,
            10
          )}px`
        } else {
          this.bubbleY = 0
        }

        if (this.isRebounding) {
          this.pullDownStyle = `top:${Math.min(pos.y - 30, 10)}px`
        }
      })
    },
    _initPullUpLoad () {
      this.scroll.on('pullingUp', () => {
        this.isPullUpLoad = true
        this.$emit('pulling-up')
      })
    },
    _reboundPullDown () {
      const { stopTime = 600 } = this.pullDownRefresh
      return new Promise(resolve => {
        setTimeout(() => {
          this.isRebounding = true
          this.scroll.finishPullDown()
          this.isPullingDown = false
          resolve()
        }, stopTime)
      })
    },
    _afterPullDown () {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`
        this.beforePullDown = true
        this.isRebounding = false
        this.refresh()
      }, this.scroll.options.bounceTime)
    }
  }
}
</script>

<style lang="scss">
.vm-scroll-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
}

.vm-pulldown-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all;

  .after-trigger {
    margin-top: 5px;
  }
}

.vm-pullup-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
}

.vm-scroll-content {
  position: relative;
  z-index: 1;
  background-color: #fff;
}

</style>
