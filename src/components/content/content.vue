<template>
  <div class="ion-content" :class="[modeClass]">
    <div ref="fixedElement" class="fixed-content">
      <slot name="fixed"></slot>
    </div>
    <div ref="scrollElement" class="scroll-content" :class="{'disable-scroll':isScrollDisabled}">
      <slot></slot>
    </div>
    <slot name="refresher"></slot>
  </div>
</template>
<script>
import {removeArrayItem, parsePxUnit, cssFormat} from '../../util/util'
import {transitionEnd, registerListener} from '../../util/dom'
import ScrollView from './scroll-view'
import {updateImgs} from './img-util'
import ModeMixins from '../../themes/theme.mixins'
import throttle from 'lodash.throttle'

export default {
  name: 'vm-content',
  mixins: [ModeMixins],
  inject: {
    pageComponent: {
      from: 'pageComponent',
      default: null
    },
    tabsComponent: {
      from: 'tabsComponent',
      default: null
    }
  },
  provide () {
    let _this = this
    return {
      contentComponent: _this
    }
  },
  data () {
    return {
      contentTop: 0,
      contentBottom: 0,

      _headerHeight: 0,
      _footerHeight: 0,

      _scrollView: null,

      _contentTop: 0,
      _contentBottom: 0,
      _fixedTop: 0,
      _fixedBottom: 0,
      _paddingTop: 0,
      _paddingBottom: 0,

      _resizeUnReg: null,

      _imgs: [],
      _imgReqBfr: 1400,
      _imgRndBfr: 600,
      _imgVelMax: 3
    }
  },
  computed: {
    scrollElement () {
      return this.$refs.scrollElement
    },
    fixedElement () {
      return this.$refs.fixedElement
    },
    headerComponent () {
      return this.pageComponent.headerComponent
    },
    footerComponent () {
      return this.pageComponent.footerComponent
    },
    isScrollDisabled () {
      return this.$app && this.$app.isScrollDisabled
    }
  },
  created () {
    this._scrollView = new ScrollView()
    this._imgs = []

    // 窗口变化重新计算容器
    this._resizeUnReg = registerListener(window, 'resize', throttle(() => { console.log('throttle'); this._calculateContentDimensions() }, 200, {leading: false, trailing: true}))

    const scroll = this._scrollView
    scroll.onScrollStart = (ev) => {
      this.$emit('onScrollStart', ev)
      this.$events && this.$events.$emit('onScrollStart', ev)
    }

    scroll.onScroll = (ev) => {
      this.$emit('onScroll', ev)
      this.$events && this.$events.$emit('onScroll', ev)
      this._imgsUpdate()
    }

    scroll.onScrollEnd = (ev) => {
      this.$emit('onScrollEnd', ev)
      this.$events && this.$events.$emit('onScrollEnd', ev)
      this._imgsUpdate()
    }

    // TODO
    // directive 插入的header不能被获取到pageComponent，采用监听的方式获得header的加载事件
    const self = this
    this.$events.$once('header:mounted', function (ele) {
      let headerHeight = ele.$el.clientHeight
      self._calculateContentDimensions(headerHeight)
    })
  },
  mounted () {
    this._calculateContentDimensions()
  },
  destroyed () {
    this._resizeUnReg && this._resizeUnReg()

    this._scrollView && this._scrollView.destroy()
  },
  methods: {
    getContentDimensions () {
      const scrollEle = this.scrollElement

      return {
        contentWidth: scrollEle.clientWidth,
        contentHeight: scrollEle.clientHeight - this._contentTop - this._contentBottom,
        contentTop: this._contentTop,
        contentBottom: this._contentBottom,

        scrollHeight: scrollEle.scrollHeight,
        scrollTop: scrollEle.scrollTop,

        scrollWidth: scrollEle.scrollWidth,
        scrollLeft: scrollEle.scrollLeft
      }
    },
    /**
     * @function scrollTo
     * @description 滚动到指定位置
     * @param {Number} [x=0]            - 滚动到指定位置的x值
     * @param {Number} [y=0]            - 滚动到指定位置的y值
     * @param {Number} [duration=300]   - 滚动动画的时间
     * @param {Function=} done          - 当滚动结束时触发的回调
     * @return {Promise}                - 当回调done未定义的时候, 才返回Promise, 如果定义则返回undefined
     */
    scrollTo (x, y, duration = 300, done) {
      return this._scrollView.scrollTo(x, y, duration, done)
    },
    /**
     * @function scrollToTop
     * @description 滚动到顶部
     * @param {Number} [duration=300] - 滚动动画的时间, 默认是300ms
     * @return {Promise} 当滚动动画完毕后返回promise
     */
    scrollToTop (duration = 300) {
      console.debug(`content, scrollToTop, duration: ${duration}`)
      return this._scrollView.scrollToTop(duration)
    },
    /**
     * @function scrollToBottom
     * @description 滚动到顶部
     * @param {Number} [duration=300] - 滚动动画的时间, 默认是300ms
     * @return {Promise} 当滚动动画完毕后返回promise
     */
    scrollToBottom (duration = 300) {
      console.debug(`content, scrollToBottom, duration: ${duration}`)
      return this._scrollView.scrollToBottom(duration)
    },
    /**
     * @function scrollBy
     * @description
     * 滚动到指定位置, 这个和scrollTo类似, 只不过是相对当前位置的滚动
     *
     * 当前位置为scrollTop为`100px`, 执行`myScroll.scrollBy(0, -10)`, 则滚动到`110px`位置
     *
     * @param {Number} x                - 滚动到指定位置的x值
     * @param {Number} y                - 滚动到指定位置的y值
     * @param {Number} [duration=300]   - 滚动动画的时间
     * @param {Function=} done          - 当滚动结束时触发的回调
     * @return {Promise}                - 当回调done未定义的时候, 才返回Promise, 如果定义则返回undefined
     */
    scrollBy (x, y, duration = 300, done) {
      return this.scrollView.scrollBy(x, y, duration, done)
    },
    /**
     * @function scrollToElement
     * @description 滚动到指定元素
     * @param {Element} el
     * @param {Number} [duration=300]   - 滚动动画的时间
     * @param {Function=} done          - 当滚动结束时触发的回调
     * @return {Promise}                - 当回调done未定义的时候, 才返回Promise, 如果定义则返回undefined
     */
    scrollToElement (el, duration = 300, done) {
      return this.scrollView.scrollToElement(el, duration, done)
    },

    /**
     * @function resize
     * @description
     * 当动态添加Header/Footer/Tabs或者修改了他的属性时, 重新计算Content组件的尺寸.
     */
    resize () {
      this.$nextTick(() => {
        this._calculateContentDimensions()
      })
    },

    _calculateContentDimensions (headerHeight = 0) {
      console.assert(this.fixedElement, 'fixed element was not found')
      console.assert(this.scrollElement, 'scroll element was not found')

      this._readDimensions(headerHeight)
      this._writeDimensions()
    },

    _readDimensions (headerHeight = 0) {
      const cachePaddingTop = this._paddingTop
      const cachePaddingRight = this._paddingRight
      const cachePaddingBottom = this._paddingBottom
      const cachePaddingLeft = this._paddingLeft
      const cacheHeaderHeight = this._headerHeight
      const cacheTabsPlacement = this._tabsPlacement
      const cacheFooterHeight = this._footerHeight
      let tabsTop = 0
      let scrollEvent = null
      this._paddingTop = 0
      this._paddingRight = 0
      this._paddingBottom = 0
      this._paddingLeft = 0
      this._headerHeight = headerHeight
      this._footerHeight = 0
      this._tabsPlacement = null
      this._tabsTop = 0
      this._fixedTop = 0
      this._fixedBottom = 0

      // In certain cases this._scrollView is undefined
      // if that is the case then we should just return
      if (!this._scrollView) {
        console.assert(false, '_scrollView should be valid')
        return
      }

      scrollEvent = this._scrollView.ev

      if (this.headerComponent) {
        let ele = this.headerComponent.getNativeElement()
        this._headerHeight = parsePxUnit(window.getComputedStyle(ele).height)
      }
      if (this.footerComponent) {
        let ele = this.footerComponent.getNativeElement()
        this._footerEle = ele
        this._footerHeight = parsePxUnit(window.getComputedStyle(ele).height)
      }

      // Toolbar height
      this._contentTop = this._headerHeight
      this._contentBottom = this._footerHeight

      // In a Tabs
      if (this.tabsComponent) {
        let ele = this.tabsComponent.getNativeElement()
        let tabbarEle = ele.firstElementChild
        this._tabbarHeight = tabbarEle.clientHeight

        if (this._tabsPlacement === null) {
          // this is the first tabbar found, remember it's position
          this._tabsPlacement = ele.getAttribute('tabsplacement')
        }

        // Tabs height
        if (this._tabsPlacement === 'top') {
          this._tabsTop = this._headerHeight
          tabsTop = this.tabsComponent.getTabsTop()
          this._contentTop += this._tabbarHeight
        } else {
          this._contentBottom += this._tabbarHeight
        }
      }

      // Fixed content shouldn't include content padding
      this._fixedTop = this._contentTop
      this._fixedBottom = this._contentBottom

      // ******** DOM READ ****************
      const contentDimensions = this.getContentDimensions()
      scrollEvent.scrollHeight = contentDimensions.scrollHeight
      scrollEvent.scrollWidth = contentDimensions.scrollWidth
      scrollEvent.contentHeight = contentDimensions.contentHeight
      scrollEvent.contentWidth = contentDimensions.contentWidth
      scrollEvent.contentTop = contentDimensions.contentTop
      scrollEvent.contentBottom = contentDimensions.contentBottom

      this._dirty = (
        cachePaddingTop !== this._paddingTop ||
          cachePaddingBottom !== this._paddingBottom ||
          cachePaddingLeft !== this._paddingLeft ||
          cachePaddingRight !== this._paddingRight ||
          cacheHeaderHeight !== this._headerHeight ||
          cacheFooterHeight !== this._footerHeight ||
          cacheTabsPlacement !== this._tabsPlacement ||
          tabsTop !== this._tabsTop ||
          this._contentTop !== this.contentTop ||
          this._contentBottom !== this.contentBottom
      )

      this._scrollView.init(this.scrollElement)

      // initial imgs refresh
      this._imgsUpdate()
    },

    _writeDimensions () {
      if (!this._dirty) {
        console.debug('Skipping writeDimensions')
        return
      }

      const scrollEle = this.scrollElement
      if (!scrollEle) {
        console.assert(false, 'this.scrollElement should be valid')
        return
      }

      const fixedEle = this.fixedElement
      if (!fixedEle) {
        console.assert(false, 'this.fixedElement should be valid')
        return
      }

      // Tabs height
      if (this._tabsPlacement === 'bottom' && this._contentBottom > 0 && this._footerEle) {
        var footerPos = this._contentBottom - this._footerHeight
        console.assert(footerPos >= 0, 'footerPos has to be positive')
        this._footerEle.style.bottom = cssFormat(footerPos)
      }

      // Only update top margin if value changed
      if (this._contentTop !== this.contentTop) {
        console.assert(this._contentTop >= 0, 'contentTop has to be positive')
        console.assert(this._fixedTop >= 0, 'fixedTop has to be positive')

        scrollEle.style.marginTop = cssFormat(this._contentTop)
        fixedEle.style.marginTop = cssFormat(this._fixedTop)

        this.contentTop = this._contentTop
      }

      // Only update bottom margin if value changed
      if (this._contentBottom !== this.contentBottom) {
        console.assert(this._contentBottom >= 0, 'contentBottom has to be positive')
        console.assert(this._fixedBottom >= 0, 'fixedBottom has to be positive')

        scrollEle.style.marginBottom = cssFormat(this._contentBottom)
        fixedEle.style.marginBottom = cssFormat(this._fixedBottom)

        this.contentBottom = this._contentBottom
      }

      if (this.tabsComponent && this._tabsPlacement !== null) {
        // set the position of the tabbar
        if (this._tabsPlacement === 'top') {
          this.tabsComponent.setTabbarPosition(this._tabsTop, -1)
        } else {
          console.assert(this._tabsPlacement === 'bottom', 'tabsPlacement should be bottom')
          this.tabsComponent.setTabbarPosition(-1, 0)
        }
      }
    },

    // -------- For Refresher Component --------
    getScrollElement () {
      return this.scrollElement
    },
    onScrollElementTransitionEnd (callback) {
      transitionEnd(this.getScrollElement(), callback)
    },
    setScrollElementStyle (prop, val) {
      const scrollEle = this.scrollElement
      if (scrollEle) {
        this.$nextTick(() => {
          (scrollEle.style)[prop] = val
        })
      }
    },

    // -------- For Img Component --------
    addImg (img) {
      this._imgs.push(img)
    },
    removeImg (img) {
      removeArrayItem(this._imgs, img)
    },
    _imgsUpdate () {
      if (this._scrollView.initialized && this._imgs.length && this._isImgsUpdatable()) {
        updateImgs(this._imgs, this.scrollTop, this.contentHeight, this.directionY, this._imgReqBfr, this._imgRndBfr)
      }
    },
    _isImgsUpdatable () {
      // an image is only "updatable" if the content isn't scrolling too fast
      // if scroll speed is above the maximum velocity, then let current
      // requests finish, but do not start new requets or render anything
      // if scroll speed is below the maximum velocity, then it's ok
      // to start new requests and render images
      return Math.abs(this._scrollView.ev.velocityY) < this._imgVelMax
    }
  }

}
</script>
<style lang="scss">
  @import "content";
  @import "content.ios";
  @import "content.md";
</style>
