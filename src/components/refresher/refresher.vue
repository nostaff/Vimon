<template>
  <div class="ion-refresher" :class="{'refresher-active':(state !== 'inactive')}" :style="{'top':top}">
    <div class="ion-refresher-content" :state="state">
      <slot>
        <div class="refresher-pulling">
          <div class="refresher-pulling-icon" v-if="pullingIcon">
            <vm-icon :name="pullingIcon"></vm-icon>
          </div>
          <div class="refresher-pulling-text" v-html="pullingText" v-if="pullingText"></div>
        </div>
        <div class="refresher-refreshing">
          <div class="refresher-refreshing-icon">
            <vm-spinner :name="refreshingSpinner"></vm-spinner>
          </div>
          <div class="refresher-refreshing-text" v-html="refreshingText" v-if="refreshingText"></div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script type="text/javascript">
import { pointerCoord, registerListener } from '../../util/dom'
import { isTrueProperty } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'
import VmIcon from '../icon'
import VmSpinner from '../spinner'

const STATE_INACTIVE = 'inactive'
const STATE_PULLING = 'pulling'
const STATE_READY = 'ready'
const STATE_REFRESHING = 'refreshing'
const STATE_CANCELLING = 'cancelling'
const STATE_COMPLETING = 'completing'

export default {
  name: 'vm-refresher',
  mixins: [ModeMixins],
  inject: ['contentComponent', 'appComponent'],
  components: {
    VmSpinner,
    VmIcon
  },
  data () {
    return {
      unregs: [],

      appliedStyles: false,
      didStart: false,
      lastCheck: 0,
      isEnabled: isTrueProperty(this.enabled),
      top: '',

      /**
       * The current state which the refresher is in. The refresher's states include:
       *
       * - `inactive` - The refresher is not being pulled down or refreshing and is currently hidden.
       * - `pulling` - The user is actively pulling down the refresher, but has not reached the point yet that if the user lets go, it'll refresh.
       * - `cancelling` - The user pulled down the refresher and let go, but did not pull down far enough to kick off the `refreshing` state. After letting go, the refresher is in the `cancelling` state while it is closing, and will go back to the `inactive` state once closed.
       * - `ready` - The user has pulled down the refresher far enough that if they let go, it'll begin the `refreshing` state.
       * - `refreshing` - The refresher is actively waiting on the async operation to end. Once the refresh handler calls `complete()` it will begin the `completing` state.
       * - `completing` - The `refreshing` state has finished and the refresher is in the process of closing itself. Once closed, the refresher will go back to the `inactive` state.
       */
      state: STATE_INACTIVE,

      /**
       * The Y coordinate of where the user started to the pull down the content.
       */
      startY: null,

      /**
       * The current touch or mouse event's Y coordinate.
       */
      currentY: null,

      /**
       * The distance between the start of the pull and the current touch or
       * mouse event's Y coordinate.
       */
      deltaY: null,

      /**
       * A number representing how far down the user has pulled.
       * The number `0` represents the user hasn't pulled down at all. The
       * number `1`, and anything greater than `1`, represents that the user
       * has pulled far enough down that when they let go then the refresh will
       * happen. If they let go and the number is less than `1`, then the
       * refresh will not happen, and the content will return to it's original
       * position.
       */
      progress: 0
    }
  },
  props: {
    /**
     * @input {number} The min distance the user must pull down until the
     * refresher can go into the `refreshing` state. Default is `60`.
     */
    pullMin: {
      type: Number,
      default: 70
    },
    /**
     * @input {number} The maximum distance of the pull until the refresher
     * will automatically go into the `refreshing` state. By default, the pull
     * maximum will be the result of `pullMin + 60`.
     */
    pullMax: {
      type: Number,
      default: 200
    },
    /**
     * @input {number} How many milliseconds it takes to close the refresher. Default is `280`.
     */
    closeDuration: {
      type: Number,
      default: 280
    },
    /**
     * @input {number} How many milliseconds it takes the refresher to to snap back to the `refreshing` state. Default is `280`.
     */
    snapbackDuration: {
      type: Number,
      default: 280
    },
    /**
     * @input {boolean} If the refresher is enabled or not. Default is `true`.
     */
    enabled: {
      type: [Boolean, String],
      default: true
    },
    /**
     * @input {string} a static icon to display when you begin to pull down
     */
    pullingIcon: {
      type: String,
      default: 'arrow-down'
    },
    /**
     * @input {string} the text you want to display when you begin to pull down
     */
    pullingText: {
      type: String,
      default: 'Pull to refresh'
    },
    /**
     * @input {string} An animated SVG spinner that shows when refreshing begins
     */
    refreshingSpinner: {
      type: String,
      default: 'ios'
    },
    /**
     * @input {string} the text you want to display when performing a refresh
     */
    refreshingText: {
      type: String,
      default: 'Refreshing...'
    }
  },
  watch: {
    enabled (val) {
      this.isEnabled = isTrueProperty(val)
      this.setListeners(this.isEnabled)
    },
    state (val) {
      if (val === STATE_INACTIVE) {
        this.appComponent && this.appComponent.setDisableScroll(false)
      }
      if (val === STATE_PULLING) {
        this.appComponent && this.appComponent.setDisableScroll(true)
      }
    }
  },
  mounted () {
    console.assert(this.contentComponent, 'Refresher组件必须要在Content组件下使用')
    this.contentComponent && this.contentComponent.setElementClass('has-refresher', true)

    this.setListeners(this.isEnabled)
  },
  destroyed () {
    this.setListeners(false)
  },

  methods: {
    onStart (ev) {
      // if multitouch then get out immediately
      if (ev.touches && ev.touches.length > 1) {
        return false
      }
      if (this.state !== STATE_INACTIVE) {
        return false
      }

      let scrollHostScrollTop = this.contentComponent.getContentDimensions().scrollTop
      // if the scrollTop is greater than zero then it's
      // not possible to pull the content down yet
      if (scrollHostScrollTop > 0) {
        return false
      }

      let coord = pointerCoord(ev)
      console.debug('Pull-to-refresh, onStart', ev.type, 'y:', coord.y)

      if (this.contentComponent.contentTop > 0) {
        let newTop = this.contentComponent.contentTop + 'px'
        if (this.top !== newTop) {
          this.top = newTop
        }
      }

      this.startY = this.currentY = coord.y
      this.progress = 0
      this.state = STATE_INACTIVE
      return true
    },

    onMove (ev) {
      // this method can get called like a bazillion times per second,
      // so it's built to be as efficient as possible, and does its
      // best to do any DOM read/writes only when absolutely necessary

      // if multitouch then get out immediately
      if (ev.touches && ev.touches.length > 1) {
        return 1
      }

      // do nothing if it's actively refreshing
      // or it's in the process of closing
      // or this was never a startY
      if (
        this.startY === null ||
        this.state === STATE_REFRESHING ||
        this.state === STATE_CANCELLING ||
        this.state === STATE_COMPLETING
      ) {
        return 2
      }

      // if we just updated stuff less than 16ms ago
      // then don't check again, just chillout plz
      let now = Date.now()
      if (this.lastCheck + 16 > now) {
        return 3
      }

      // remember the last time we checked all this
      this.lastCheck = now

      // get the current pointer coordinates
      let coord = pointerCoord(ev)

      this.currentY = coord.y

      // it's now possible they could be pulling down the content
      // how far have they pulled so far?
      this.deltaY = coord.y - this.startY

      // don't bother if they're scrolling up
      // and have not already started dragging
      if (this.deltaY <= 0) {
        // the current Y is higher than the starting Y
        // so they scrolled up enough to be ignored
        this.progress = 0

        if (this.state !== STATE_INACTIVE) {
          this.state = STATE_INACTIVE
        }

        if (this.appliedStyles) {
          // reset the styles only if they were applied
          this.setCss(0, '', false, '')
          return 5
        }

        return 6
      }

      if (this.state === STATE_INACTIVE) {
        // this refresh is not already actively pulling down

        // get the content's scrollTop
        let scrollHostScrollTop = this.contentComponent.getContentDimensions().scrollTop

        // if the scrollTop is greater than zero then it's
        // not possible to pull the content down yet
        if (scrollHostScrollTop > 0) {
          this.progress = 0
          this.startY = null
          return 7
        }

        // content scrolled all the way to the top, and dragging down
        this.state = STATE_PULLING
      }

      // prevent native scroll events
      ev.preventDefault()

      // the refresher is actively pulling at this point
      // move the scroll element within the content element
      this.setCss(this.deltaY * 0.5, '0ms', true, '')

      if (!this.deltaY) {
        // don't continue if there's no delta yet
        this.progress = 0
        return 8
      }

      // so far so good, let's run this all back within zone now
      this.onMoveInZone()
    },

    onMoveInZone () {
      // set pull progress
      this.progress = this.deltaY * 0.5 / this.pullMin

      // emit "start" if it hasn't started yet
      if (!this.didStart) {
        this.didStart = true
        this.$emit('onStart', this)
      }

      // emit "pulling" on every move
      this.$emit('onPull', this)

      // do nothing if the delta is less than the pull threshold
      if (this.deltaY * 0.5 < this.pullMin) {
        // ensure it stays in the pulling state, cuz its not ready yet
        this.state = STATE_PULLING
        return 2
      }

      if (this.deltaY * 0.5 > this.pullMax) {
        // they pulled farther than the max, so kick off the refresh
        this.beginRefresh()
        return 3
      }

      // pulled farther than the pull min!!
      // it is now in the `ready` state!!
      // if they let go then it'll refresh, kerpow!!
      this.state = STATE_READY

      return 4
    },

    onEnd () {
      // only run in a zone when absolutely necessary

      if (this.state === STATE_READY) {
        // they pulled down far enough, so it's ready to refresh
        this.beginRefresh()
      } else if (this.state === STATE_PULLING) {
        // they were pulling down, but didn't pull down far enough
        // set the content back to it's original location
        // and close the refresher
        // set that the refresh is actively cancelling
        this.cancel()
      }

      // reset on any touchend/mouseup
      this.startY = null
    },

    beginRefresh () {
      // assumes we're already back in a zone
      // they pulled down far enough, so it's ready to refresh
      this.state = STATE_REFRESHING

      // place the content in a hangout position while it thinks
      this.setCss(this.pullMin, this.snapbackDuration + 'ms', true, '')

      // emit "refresh" because it was pulled down far enough
      // and they let go to begin refreshing
      this.$emit('onRefresh', this)
    },

    /**
     * Call `complete()` when your async operation has completed.
     * For example, the `refreshing` state is while the app is performing
     * an asynchronous operation, such as receiving more data from an
     * AJAX request. Once the data has been received, you then call this
     * method to signify that the refreshing has completed and to close
     * the refresher. This method also changes the refresher's state from
     * `refreshing` to `completing`.
     */
    complete () {
      this.closeRefresher(STATE_COMPLETING, '120ms')
    },

    /**
     * Changes the refresher's state from `refreshing` to `cancelling`.
     */
    cancel () {
      this.closeRefresher(STATE_CANCELLING, '')
    },

    closeRefresher (state, delay) {
      var timer

      function close (ev) {
        // closing is done, return to inactive state
        if (ev) {
          clearTimeout(timer)
        }

        this.state = STATE_INACTIVE
        this.progress = 0
        this.didStart = this.startY = this.currentY = this.deltaY = null
        this.setCss(0, '0ms', false, '')
      }

      // create fallback timer incase something goes wrong with transitionEnd event
      timer = setTimeout(close.bind(this), 600)

      // create transition end event on the content's scroll element
      this.contentComponent.onScrollElementTransitionEnd(close.bind(this))

      // reset set the styles on the scroll element
      // set that the refresh is actively cancelling/completing
      this.state = state
      this.setCss(0, '', true, delay)
    },

    setCss (y, duration, overflowVisible, delay) {
      this.appliedStyles = y > 0

      const Css = this.$platform.css
      if (this.contentComponent) {
        this.contentComponent.setScrollElementStyle(Css.transform, ((y > 0) ? 'translateY(' + y + 'px) translateZ(0px)' : 'translateZ(0px)'))
        this.contentComponent.setScrollElementStyle(Css.transitionDuration, duration)
        this.contentComponent.setScrollElementStyle(Css.transitionDelay, delay)
        this.contentComponent.setScrollElementStyle('overflow', overflowVisible ? 'hidden' : '')
      }
    },

    setListeners (shouldListen) {
      if (this.unregs && this.unregs.length > 0) {
        console.debug('refresher.vue 解除绑定')
        this.unregs.forEach(unreg => {
          unreg && unreg()
        })
      }

      this.$nextTick(() => {
        if (shouldListen && this.contentComponent) {
          let contentElement = this.contentComponent.getScrollElement()
          console.assert(contentElement, 'Refresh Component need Content Ready!::<Component>setListeners()')

          registerListener(contentElement, 'touchstart', this.onStart.bind(this), {'passive': false}, this.unregs)
          registerListener(contentElement, 'mousedown', this.onStart.bind(this), {'passive': false}, this.unregs)

          registerListener(contentElement, 'touchmove', this.onMove.bind(this), {'passive': false}, this.unregs)
          registerListener(contentElement, 'mousemove', this.onMove.bind(this), {'passive': false}, this.unregs)

          registerListener(contentElement, 'touchend', this.onEnd.bind(this), {'passive': false}, this.unregs)
          registerListener(contentElement, 'mouseup', this.onEnd.bind(this), {'passive': false}, this.unregs)
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "refresher";
</style>
