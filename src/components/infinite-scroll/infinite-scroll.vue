<template>
  <div class="ion-infinite-scroll" :threshold="threshold" :state="state">
    <slot>
      <div class="ion-infinite-scroll-content">
        <div class="infinite-loading">
          <div class="infinite-loading-spinner" v-if="loadingSpinner">
            <ion-spinner :name="loadingSpinner"></ion-spinner>
          </div>
          <div class="infinite-loading-text" v-html="loadingText" v-if="loadingText"></div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script type="text/javascript">
/**
 * @component InfiniteScroll
 * @description
 *
 * ## 数据加载 / InfiniteScroll无限滚动组件
 *
 * ### 说明
 *
 * 当页面滚动到页面底部一定距离时, InfiniteScroll组件会触发`onInfinite`事件, 通过回调传入的参数`infiniteScroll`来处理对应的状态.
 *
 * 比如: 当需要异步请求AJAX数据时, 数据请求后, 需要执行`infiniteScroll.complete()` 来变更InfiniteScroll组件的状态,当继续向下滚动时, 还能继续出发`onInfinite`事件, 如此往复.
 *
 * 当通过AJAX请求的数据已经全部请求完毕(没有更多的数据时), 则执行`infiniteScroll.enable(false)`, 表明InfiniteScroll任务全部结束. 此时, 将解除对Content组件的`onScroll`事件的监听.
 *
 * ### 其他
 *
 * InfiniteScroll组件会附带InfiniteScrollContent内容,它只是起到显示状态的作用, 你也可以自己定义显示状态.
 *
 * 其中, 标示状态的`state`有三种值: enabled/disabled/loading, 且这三种状态会写在父组件上, 因此可以用这个特性定义子组件的样式. 比如像下面的demo
 *
 * ### 建议
 *
 * 首屏的数据至少占满两个以上屏幕高度, 通过 InfiniteScroll 加载的数据也至少能占满两个以上的屏幕高度, 这样的体验效果会好点
 *
 * ### 注意
 *
 * - 组件中的方法是在事件的回调参数中定义的.
 * - 组件支持js滚动监听, 如何设置参考Content组件
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { InfiniteScroll } from 'vimon'
 * // 安装
 * Vue.component(InfiniteScroll.name, InfiniteScroll)
 * // 或者
 * export default{
 *   components: {
 *     InfiniteScroll
 *  }
 * }
 *```
  *
  *
  * @props {Boolean} [enabled=true] - 设置当前组件的可用状态, 如果为false, 则移除当前组件绑定的全部事件处理函数, 隐藏组件并且将状态设置为disabled
  * @props {String} [threshold='15%'] - 激活`onInfinite`事件的阈值. 阈值可以使百分比也可以是具体的px值. 如果为百分比(10%), 则距离底部10%的位置将为激活点; 如果为具体px值(100px), 则页面底部向下100px出为激活点.
  *
  * @fires component:InfiniteScroll#onInfinite
  *
  * @demo #/infinite-scroll
  * @see component:Base/Content
  *
  * @usage
  *
  * <InfiniteScroll threshold="20%" @onInfinite="onInfinite" loadingSpinner="ios" loadingText="正在加载..."></InfiniteScroll>
  *
  * // ....
  *  .ion-infinite-scroll{
  *      .loadedAll{
  *          display: none;
  *      }
  *   }
  *  .ion-infinite-scroll[state=disabled]{
  *      .loadedAll{
  *          display: block;
  *      }
  *  }
  *
  * // ....
  *
  * methods: {
  *    onInfinite(infiniteScroll){
  *      let _start = this.i;
  *      if(_start < 40){
  *        setTimeout(() => {
  *          for (; (10 + _start) > this.i; this.i++) {
  *           this.list.push(`item - ${this.i}`)
  *         }
  *         // 当前异步完成
  *         infiniteScroll.complete();
  *       }, 100)
  *     }else{
  *       // 当前异步结束, 没有新数据了
  *       infiniteScroll.enable(false);
  *     }
  *  }
  *  // ....
  */
import { isTrueProperty } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'
import IonSpinner from '../spinner'

const STATE_ENABLED = 'enabled'
const STATE_DISABLED = 'disabled'
const STATE_LOADING = 'loading'

export default {
  name: 'ion-infinite-scroll',
  mixins: [ModeMixins],
  components: {
    IonSpinner
  },
  inject: {
    contentComponent: {
      from: 'contentComponent',
      default: null
    }
  },
  data () {
    return {
      lastCheck: 0,
      isInited: false,
      isEnabled: isTrueProperty(this.enabled),

      state: STATE_ENABLED
    }
  },
  props: {
    /**
     * @input {boolean} If true, Whether or not the infinite scroll should be
     * enabled or not. Setting to `false` will remove scroll event listeners
     * and hide the display.
     */
    enabled: {
      type: [Boolean, String],
      default: true
    },
    /**
     * @input {string} The threshold distance from the bottom
     * of the content to call the `infinite` output event when scrolled.
     * The threshold value can be either a percent, or
     * in pixels. For example, use the value of `10%` for the `infinite`
     * output event to get called when the user has scrolled 10%
     * from the bottom of the page. Use the value `100px` when the
     * scroll is within 100 pixels from the bottom of the page.
     * Default is `15%`.
     */
    threshold: {
      type: String,
      default: '15%'
    },
    /**
     * @input {string} An animated SVG spinner that shows while loading.
     */
    loadingSpinner: {
      type: String,
      default () {
        return this.$config && this.$config.get('infiniteLoadingSpinner', this.$config.get('spinner', 'ios')) || 'ios'
      }
    },
    /**
     * @input {string} Optional text to display while loading.
     */
    loadingText: {
      type: String,
      default: 'Loading more data...'
    }
  },
  computed: {
    thr () {
      return this.threshold
    },
    thrPx () {
      if (this.threshold.indexOf('%') > -1) {
        return 0
      } else {
        return parseFloat(this.threshold)
      }
    },
    thrPc () {
      if (this.threshold.indexOf('%') > -1) {
        return parseFloat(this.threshold) / 100
      } else {
        return 0
      }
    }
  },
  watch: {
    enabled (val) {
      this.isEnabled = isTrueProperty(val)
      this.setListeners(this.isEnabled)
    }
  },
  mounted () {
    console.assert(this.contentComponent, 'InfiniteScroll组件必须要在Content组件下使用')
    this.contentComponent &&
      this.contentComponent.setElementClass('has-infinite-scroll', true)

    this.isInited = true
    this.setListeners(this.isEnabled)
  },
  destroy () {
    this.setListeners(false)
  },
  methods: {
    onScroll (ev) {
      if (this.state === STATE_LOADING || this.state === STATE_DISABLED) {
        return 1
      }

      if (this.lastCheck + 32 > ev.timeStamp) {
        // no need to check less than every XXms
        return 2
      }
      this.lastCheck = ev.timeStamp

      // ******** DOM READ ****************
      const infiniteHeight = this.getNativeElement().scrollHeight
      if (!infiniteHeight) {
        // if there is no height of this element then do nothing
        return 3
      }

      // ******** DOM READ ****************
      const d = this.contentComponent.getContentDimensions()
      const height = d.contentHeight

      const threshold = this.thrPc ? height * this.thrPc : this.thrPx

      // ******** DOM READS ABOVE / DOM WRITES BELOW ****************

      let distanceFromInfinite =
        d.scrollHeight - infiniteHeight - d.scrollTop - height - threshold
      if (distanceFromInfinite < 0) {
        if (this.state !== STATE_LOADING && this.state !== STATE_DISABLED) {
          this.state = STATE_LOADING
          this.$emit('onInfinite', this)
        }
        return 5
      }

      return 6
    },

    /**
     * Call `complete()` within the `infinite` output event handler when
     * your async operation has completed. For example, the `loading`
     * state is while the app is performing an asynchronous operation,
     * such as receiving more data from an AJAX request to add more items
     * to a data list. Once the data has been received and UI updated, you
     * then call this method to signify that the loading has completed.
     * This method will change the infinite scroll's state from `loading`
     * to `enabled`.
     */
    complete () {
      if (this.state !== STATE_LOADING) {
        return
      }

      this.state = STATE_ENABLED
      this.contentComponent.resize()
    },

    /**
     * Pass a promise inside `waitFor()` within the `infinite` output event handler in order to
     * change state of infiniteScroll to "complete"
     */
    waitFor (action) {
      const enable = this.complete.bind(this)
      action.then(enable, enable)
    },

    /**
     * Call `enable(false)` to disable the infinite scroll from actively
     * trying to receive new data while scrolling. This method is useful
     * when it is known that there is no more data that can be added, and
     * the infinite scroll is no longer needed.
     * @param {boolean} shouldEnable  If the infinite scroll should be
     * enabled or not. Setting to `false` will remove scroll event listeners
     * and hide the display.
     */
    enable (shouldEnable) {
      this.state = shouldEnable ? STATE_ENABLED : STATE_DISABLED
      this.setListeners(shouldEnable)
    },

    /**
     * @hidden
     */
    setListeners (shouldListen) {
      if (this.isInited) {
        if (shouldListen) {
          this.contentComponent.$on('onScroll', this.onScroll)
        } else {
          this.contentComponent.$off('onScroll', this.onScroll)
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "infinite-scroll";
</style>
