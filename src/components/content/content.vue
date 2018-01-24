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
      contentMarginTop: 0,
      contentMarginBottom: 0,

      headerHeight: 0,
      footerHeight: 0,

      scrollView: null,

      contentTop: 0,
      contentBottom: 0,
      fixedTop: 0,
      fixedBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,

      tabsPlacement: null,
      tabsTop: 0,

      resizeUnReg: null,

      imgs: [],
      imgReqBfr: this.$config && this.$config.getNumber('imgRequestBuffer', 1400),
      imgRndBfr: this.$config && this.$config.getNumber('imgRenderBuffer', 400),
      imgVelMax: this.$config && this.$config.getNumber('imgVelocityMax', 3)
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
    this.scrollView = new ScrollView()
    this.imgs = []

    // 窗口变化重新计算容器
    this.resizeUnReg = registerListener(window, 'resize', throttle(() => { this._calculateContentDimensions() }, 200, {leading: false, trailing: true}))

    const scroll = this.scrollView
    scroll.onScrollStart = (ev) => {
      this.$emit('onScrollStart', ev)
      this.$events && this.$events.$emit('onScrollStart', ev)
    }

    scroll.onScroll = (ev) => {
      this.$emit('onScroll', ev)
      this.$events && this.$events.$emit('onScroll', ev)
      this.imgsUpdate()
    }

    scroll.onScrollEnd = (ev) => {
      this.$emit('onScrollEnd', ev)
      this.$events && this.$events.$emit('onScrollEnd', ev)
      this.imgsUpdate()
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
    if (this.$slots && this.$slots['fixed']) {
      this.$slots['fixed'].forEach((item) => {
        item.elm.setAttribute('fixed', '')
      })
    }

    this._calculateContentDimensions()
  },
  destroyed () {
    this.resizeUnReg && this.resizeUnReg()

    this.scrollView && this.scrollView.destroy()
  },
  methods: {
    getContentDimensions () {
      const scrollEle = this.scrollElement

      return {
        contentWidth: scrollEle.clientWidth,
        contentHeight: scrollEle.clientHeight - this.contentTop - this.contentBottom,
        contentTop: this.contentTop,
        contentBottom: this.contentBottom,

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
      return this.scrollView.scrollTo(x, y, duration, done)
    },
    /**
     * @function scrollToTop
     * @description 滚动到顶部
     * @param {Number} [duration=300] - 滚动动画的时间, 默认是300ms
     * @return {Promise} 当滚动动画完毕后返回promise
     */
    scrollToTop (duration = 300) {
      console.debug(`content, scrollToTop, duration: ${duration}`)
      return this.scrollView.scrollToTop(duration)
    },
    /**
     * @function scrollToBottom
     * @description 滚动到顶部
     * @param {Number} [duration=300] - 滚动动画的时间, 默认是300ms
     * @return {Promise} 当滚动动画完毕后返回promise
     */
    scrollToBottom (duration = 300) {
      console.debug(`content, scrollToBottom, duration: ${duration}`)
      return this.scrollView.scrollToBottom(duration)
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
      const cachePaddingTop = this.paddingTop
      const cachePaddingBottom = this.paddingBottom
      const cacheHeaderHeight = this.headerHeight
      const cacheTabsPlacement = this.tabsPlacement
      const cacheFooterHeight = this.footerHeight
      let tabsTop = 0
      let scrollEvent = null
      this.paddingTop = 0
      this.paddingBottom = 0
      this.headerHeight = headerHeight
      this.footerHeight = 0
      this.tabsPlacement = null
      this.tabsTop = 0
      this.fixedTop = 0
      this.fixedBottom = 0

      // In certain cases this.scrollView is undefined
      // if that is the case then we should just return
      if (!this.scrollView) {
        console.assert(false, 'scrollView should be valid')
        return
      }

      scrollEvent = this.scrollView.ev

      if (this.headerComponent) {
        let ele = this.headerComponent.getNativeElement()
        this.headerHeight = parsePxUnit(window.getComputedStyle(ele).height)
      }
      if (this.footerComponent) {
        let ele = this.footerComponent.getNativeElement()
        this.footerHeight = parsePxUnit(window.getComputedStyle(ele).height)
      }

      // Toolbar height
      this.contentTop = this.headerHeight
      this.contentBottom = this.footerHeight

      // In a Tabs
      if (this.tabsComponent) {
        let ele = this.tabsComponent.getNativeElement()
        let tabbarEle = ele.firstElementChild
        let tabbarHeight = tabbarEle.clientHeight

        if (this.tabsPlacement === null) {
          // this is the first tabbar found, remember it's position
          this.tabsPlacement = ele.getAttribute('tabsplacement')
        }

        // Tabs height
        if (this.tabsPlacement === 'top') {
          this.tabsTop = this.headerHeight
          tabsTop = this.tabsComponent.getTabsTop()
          this.contentTop += tabbarHeight
        } else {
          this.contentBottom += tabbarHeight
        }
      }

      // Fixed content shouldn't include content padding
      this.fixedTop = this.contentTop
      this.fixedBottom = this.contentBottom

      // ******** DOM READ ****************
      const contentDimensions = this.getContentDimensions()
      scrollEvent.scrollHeight = contentDimensions.scrollHeight
      scrollEvent.scrollWidth = contentDimensions.scrollWidth
      scrollEvent.contentHeight = contentDimensions.contentHeight
      scrollEvent.contentWidth = contentDimensions.contentWidth
      scrollEvent.contentTop = contentDimensions.contentTop
      scrollEvent.contentBottom = contentDimensions.contentBottom

      this._dirty = (
        cachePaddingTop !== this.paddingTop ||
          cachePaddingBottom !== this.paddingBottom ||
          cacheHeaderHeight !== this.headerHeight ||
          cacheFooterHeight !== this.footerHeight ||
          cacheTabsPlacement !== this.tabsPlacement ||
          tabsTop !== this.tabsTop ||
          this.contentTop !== this.contentMarginTop ||
          this.contentBottom !== this.contentMarginBottom
      )

      this.scrollView.init(this.scrollElement)

      // initial imgs refresh
      this.imgsUpdate()
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
      if (this.tabsPlacement === 'bottom' && this.contentBottom > 0 && this.footerComponent) {
        var footerPos = this.contentBottom - this.footerHeight
        console.assert(footerPos >= 0, 'footerPos has to be positive')
        this.footerComponent.getNativeElement().style.bottom = cssFormat(footerPos)
      }

      // Only update top margin if value changed
      if (this.contentTop !== this.contentMarginTop) {
        console.assert(this.contentTop >= 0, 'contentTop has to be positive')
        console.assert(this.fixedTop >= 0, 'fixedTop has to be positive')

        scrollEle.style.marginTop = cssFormat(this.contentTop)
        fixedEle.style.marginTop = cssFormat(this.fixedTop)

        this.contentMarginTop = this.contentTop
      }

      // Only update bottom margin if value changed
      if (this.contentBottom !== this.contentMarginBottom) {
        console.assert(this.contentBottom >= 0, 'contentBottom has to be positive')
        console.assert(this.fixedBottom >= 0, 'fixedBottom has to be positive')

        scrollEle.style.marginBottom = cssFormat(this.contentBottom)
        fixedEle.style.marginBottom = cssFormat(this.fixedBottom)

        this.contentMarginBottom = this.contentBottom
      }

      if (this.tabsComponent && this.tabsPlacement !== null) {
        // set the position of the tabbar
        if (this.tabsPlacement === 'top') {
          this.tabsComponent.setTabbarPosition(this.tabsTop, -1)
        } else {
          console.assert(this.tabsPlacement === 'bottom', 'tabsPlacement should be bottom')
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
      this.imgs.push(img)
    },
    removeImg (img) {
      removeArrayItem(this.imgs, img)
    },
    isImgsUpdatable () {
      // an image is only "updatable" if the content isn't scrolling too fast
      // if scroll speed is above the maximum velocity, then let current
      // requests finish, but do not start new requets or render anything
      // if scroll speed is below the maximum velocity, then it's ok
      // to start new requests and render images
      return Math.abs(this.scrollView.ev.velocityY) < this.imgVelMax
    },
    imgsUpdate () {
      if (this.scrollView.initialized && this.imgs.length && this.isImgsUpdatable()) {
        this.$nextTick(() => {
          updateImgs(this.imgs, this.scrollView.ev.scrollTop, this.scrollView.ev.contentHeight, this.scrollView.ev.directionY, this.imgReqBfr, this.imgRndBfr)
        })
      }
    }
  }

}
</script>

<style lang="scss">
  @import "content";
  @import "content.ios";
  @import "content.md";
</style>
