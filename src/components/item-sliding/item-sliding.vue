<template>
  <div class="ion-item-sliding item-wrapper"
       @touchstart="onDragStart"
       @mousedown="onDragStart"
       @touchend="onDragEnd"
       @mouseup="onDragEnd"
       @touchmove="onDragMove"
       @mousemove="onDragMove">
    <slot name="ion-item"></slot>
    <slot name="ion-item-options"></slot>
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
  import {pointerCoord} from '../../util/dom'
  import {swipeShouldReset} from '../../util/util'
  import ModeMixins from '../../themes/theme.mixins'

  const SWIPE_MARGIN = 30
  const ELASTIC_FACTOR = 0.55

  const ITEM_SIDE_FLAG_NONE = 0
  const ITEM_SIDE_FLAG_LEFT = 1
  const ITEM_SIDE_FLAG_RIGHT = 2
  const ITEM_SIDE_FLAG_BOTH = 3

  const SLIDING_STATE = {
    Disabled: 2, // 关闭状态
    Enabled: 4, // 滑动状态, 不清楚方向和程度
    Right: 8, // 向右滑动
    Left: 16, // 向左滑动
    SwipeRight: 32, // 向右滑动且滑动距离大
    SwipeLeft: 64 // 向左滑动且滑动距离大
  }

  const MAX_DELTAX = 20

  export default {
    name: 'vm-item-sliding',
    mixins: [ModeMixins],
    provide () {
      let _this = this
      return {
        itemSlidingComponent: _this
      }
    },
    data () {
      return {
        openAmount: 0,
        startX: 0,
        sides: 0,
        timer: null,
        optsDirty: true,
        state: SLIDING_STATE.Disabled,

        leftOptions: null,
        rightOptions: null,
        optsWidthRightSide: 0,
        optsWidthLeftSide: 0,

        itemCmp: null,

        firstCoord: {},
        firstTimestamp: new Date().getTime()
      }
    },
    props: {
      disabled: Boolean
    },
    mounted () {
      this.init()
    },
    destroyed () {
      this.$events && this.$events.$off('onItemSlidingOpen')
      this.$events && this.$events.$off('onScroll')
    },
    methods: {
      init () {
        let side = 0
        this.$children.forEach((item) => {
          if (item.$data.componentName === 'ionItem') {
            this.itemCmp = item
          }
          if (item.$data.componentName === 'ItemSlidingOptions' && item.side === 'left') {
            this.leftOptions = item
            side |= this._getSides(item)
          }
          if (item.$data.componentName === 'ItemSlidingOptions' && item.side === 'right') {
            this.rightOptions = item
            side |= this._getSides(item)
          }
        })
        this.sides = side
        this.optsDirty = true

        //  事件注册
        this.$events && this.$events.$on('onItemSlidingOpen', (ins) => {
          if (this !== ins) {
            this.close()
          }
        })
        this.$events && this.$events.$on('onScroll', () => {
          this.close()
        })
      },

      onDragStart (ev) {
      //                ev.preventDefault()

        let coord = pointerCoord(ev)
        this.firstCoord = coord
        this.firstTimestamp = Date.now()
        this._startSliding(coord.x)
      },

      onDragMove (ev) {
        let lastCoord = pointerCoord(ev)
        if (this._isHorizontalSliding(this.firstCoord, lastCoord)) {
          ev.preventDefault()

          this._moveSliding(lastCoord.x)
        }
      },

      onDragEnd (ev) {
        ev.preventDefault()

        let coordX = pointerCoord(ev).x
        let deltaX = coordX - this.firstCoord.x
        let deltaT = Date.now() - this.firstTimestamp
        if (Math.abs(deltaX) <= MAX_DELTAX) {
          this.close()
        } else {
          this._endSliding(deltaX / deltaT)
        }
      },

      close () {
        if (Math.abs(this.openAmount) > 0 && this.state !== SLIDING_STATE.Disabled) {
          this._setOpenAmount(0, true)
        }
      },

      getOpenAmount () {
        return this.openAmount
      },

      getSlidingPercent () {
        const openAmount = this.openAmount
        if (openAmount > 0) {
          return openAmount / this.optsWidthRightSide
        } else if (openAmount < 0) {
          return openAmount / this.optsWidthLeftSide
        } else {
          return 0
        }
      },

      _isHorizontalSliding (start, end) {
        let deltaX = end.x - start.x
        let deltaY = end.y - start.y

        return Math.abs(deltaX) > MAX_DELTAX && Math.abs(deltaX) > Math.abs(deltaY)
      },

      _startSliding (startX) {
        if (this.timer) {
          window.clearTimeout(this.timer)
          this.timer = null
        }
        if (this.openAmount === 0) {
          this.optsDirty = true
          this._setState(SLIDING_STATE.Enabled)
        }
        this.startX = startX + this.openAmount
        this.itemCmp.setElementStyle('transition', 'none')
      },

      _moveSliding (x) {
        if (this.optsDirty) {
          this._calculateOptsWidth()
          return
        }

        let openAmount = (this.startX - x)
        switch (this.sides) {
          case ITEM_SIDE_FLAG_RIGHT:
            openAmount = Math.max(0, openAmount)
            break
          case ITEM_SIDE_FLAG_LEFT:
            openAmount = Math.min(0, openAmount)
            break
          case ITEM_SIDE_FLAG_BOTH:
            break
          case ITEM_SIDE_FLAG_NONE:
            return
          default:
            console.assert(false, 'invalid ItemSideFlags value')
            break
        }

        if (openAmount > this.optsWidthRightSide) {
          const optsWidth = this.optsWidthRightSide
          openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR
        } else if (openAmount < -this.optsWidthLeftSide) {
          const optsWidth = -this.optsWidthLeftSide
          openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR
        }

        this._setOpenAmount(openAmount, false)

        return openAmount
      },

      _endSliding (velocity) {
        let restingPoint = (this.openAmount > 0)
          ? this.optsWidthRightSide
          : -this.optsWidthLeftSide

        // Check if the drag didn't clear the buttons mid-point
        // and we aren't moving fast enough to swipe open
        const isResetDirection = (this.openAmount > 0) === !(velocity < 0)
        const isMovingFast = Math.abs(velocity) > 0.3
        const isOnCloseZone = Math.abs(this.openAmount) < Math.abs(restingPoint / 2)
        if (swipeShouldReset(isResetDirection, isMovingFast, isOnCloseZone)) {
          restingPoint = 0
        }

        this._fireSwipeEvent()
        this._setOpenAmount(restingPoint, true)
        return restingPoint
      },

      _getSides (ins) {
        if (ins.side === 'left') {
          return ITEM_SIDE_FLAG_LEFT
        } else {
          return ITEM_SIDE_FLAG_RIGHT
        }
      },

      _fireSwipeEvent () {
        if (this.state & SLIDING_STATE.SwipeRight) {
          this.$emit('onSwipe', this)
          this.$emit('onSwipeLeft', this)
        } else if (this.state & SLIDING_STATE.SwipeLeft) {
          this.$emit('onSwipe', this)
          this.$emit('onSwipeLeft', this)
        }
      },

      _calculateOptsWidth () {
        if (!this.optsDirty) {
          return
        }
        this.optsWidthRightSide = 0
        if (this.rightOptions) {
          this.optsWidthRightSide = this.rightOptions.width()
          console.assert(this.optsWidthRightSide > 0, 'optsWidthRightSide should not be zero')
        }

        this.optsWidthLeftSide = 0
        if (this.leftOptions) {
          this.optsWidthLeftSide = this.leftOptions.width()
          console.assert(this.optsWidthLeftSide > 0, 'optsWidthLeftSide should not be zero')
        }
        this.optsDirty = false
      },

      _setOpenAmount (openAmount, isFinal) {
        if (this.timer) {
          window.clearTimeout(this.timer)
          this.timer = null
        }
        this.openAmount = openAmount

        if (isFinal) {
          this.itemCmp.setElementStyle('transition', '')
        }

        if (openAmount > 0) {
          var state = (openAmount >= (this.optsWidthRightSide + SWIPE_MARGIN))
            ? SLIDING_STATE.Right | SLIDING_STATE.SwipeRight
            : SLIDING_STATE.Right

          this._setState(state)
        } else if (openAmount < 0) {
          const state = (openAmount <= (-this.optsWidthLeftSide - SWIPE_MARGIN))
            ? SLIDING_STATE.Left | SLIDING_STATE.SwipeLeft
            : SLIDING_STATE.Left

          this._setState(state)
        } else {
          console.assert(openAmount === 0, 'bad internal state')
          this.timer = window.setTimeout(() => {
            this._setState(SLIDING_STATE.Disabled)
            this.timer = null
          }, 600)
          this.itemCmp.setElementStyle('transform', '')
          return
        }

        this.itemCmp.setElementStyle('transform', `translate3d(${-openAmount}px,0,0)`)

        this.$emit('onDrag', this)
      },

      _setState (state) {
        if (state === this.state) {
          return
        }
        this.setElementClass('active-slide', (state !== SLIDING_STATE.Disabled))
        this.setElementClass('active-options-right', !!(state & SLIDING_STATE.Right))
        this.setElementClass('active-options-left', !!(state & SLIDING_STATE.Left))
        this.setElementClass('active-swipe-right', !!(state & SLIDING_STATE.SwipeRight))
        this.setElementClass('active-swipe-left', !!(state & SLIDING_STATE.SwipeLeft))
        this.state = state
      }
    }
  }
  //
  // function clickedOptionButton(ev) {
  //   let ele = ev.target.closest('vm-item-options>button')
  //   return !!ele
  // }
</script>

<style lang="scss">
  @import 'item-sliding';
  @import 'item-sliding-test';
</style>
