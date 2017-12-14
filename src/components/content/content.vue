<template>
  <div class="ion-content" :class="[modeClass, {'has-refresher':hasRefresher}]">
    <div ref="fixedElement" class="fixed-content">
      <slot name="fixed"></slot>
      <slot name="fixedTop"></slot>
      <slot name="fixedBottom"></slot>
    </div>
    <div ref="scrollElement" class="scroll-content">
      <slot></slot>
    </div>
    <slot name="refresher"></slot>
  </div>
</template>
<script>
  import {assert, isPresent, removeArrayItem, parsePxUnit, cssFormat} from '../../util/util'
  import {transitionEnd, hasClass} from '../../util/dom'
  import {ScrollView} from './scroll-view'
  import ModeMixins from '../../themes/theme.mixins'

  export default {
    name: 'ion-content',
    mixins: [ModeMixins],
    props: {
      fullscreen: Boolean,
      scrollDownOnLoad: Boolean
    },
    data () {
      return {
        componentName: 'ionContent',

        hasRefresher: false,
        contentTop: 0,
        contentBottom: 0,

        // scrollDownOnLoad: false,
        // fullscreen: false,

        _scrollEle: null,
        _fixedEle: null,

        _tabsCmp: null,

        _hdrHeight: 0,
        _ftrHeight: 0,

        _scroll: null,

        _cTop: 0, // content top
        _cBottom: 0, // content bottom
        _fTop: 0, // fixex top
        _fBottom: 0, // fixex bottom
        _pTop: 0, // padding top
        _pBottom: 0, // padding bottom

        _imgs: [], // 子组件Img的实例列表
        _imgReqBfr: 1400, // 1400
        _imgRndBfr: 600, // 400
        _imgVelMax: 3
      }
    },
    computed: {
      contentHeight: function () {
        return this._scroll.ev.contentHeight
      },

      contentWidth: function () {
        return this._scroll.ev.contentWidth
      },
      scrollHeight: function () {
        return this._scroll.ev.scrollHeight
      },
      scrollWidth: function () {
        return this._scroll.ev.scrollWidth
      },
      scrollTop: {
        get: function () {
          return this._scroll.ev.scrollTop
        },
        set: function (top) {
          this._scroll.setTop(top)
        }
      }
    },
    created () {
      this._scroll = new ScrollView()
      this._imgs = []

      this.hasRefresher = this.$slots && isPresent(this.$slots['refresher'])
    },
    mounted () {
      if (this.$slots && this.$slots['fixed']) {
        this.$slots['fixed'].forEach((item) => {
          item.elm.setAttribute('fixed', '')
        })
      }
      if (this.$slots && this.$slots['fixedTop']) {
        this.$slots['fixedTop'].forEach((item) => {
          item.elm.setAttribute('fixed', '')
          item.elm.setAttribute('fixedTop', '')
        })
      }
      if (this.$slots && this.$slots['fixedBottom']) {
        this.$slots['fixedBottom'].forEach((item) => {
          item.elm.setAttribute('fixed', '')
          item.elm.setAttribute('fixedBottom', '')
        })
      }
      this._fixedEle = this.$refs.fixedElement
      this._scrollEle = this.$refs.scrollElement

      // Check whether in a tabs component
      let parentCmp = this.$parent
      while (parentCmp) {
        if (parentCmp && parentCmp.$el.classList.contains('ion-tabs')) {
          this._tabsCmp = parentCmp
          break
        }
        parentCmp = parentCmp.$parent
      }

      this.fullscreen && this.setElementAttribute('fullscreen', '')

      this.updateContentDimensions()
    },
    destroyed () {
      this._scroll && this._scroll.destroy()
    },
    methods: {
      updateContentDimensions () {
        assert(this.getFixedElement(), 'fixed element was not found')
        assert(this.getScrollElement(), 'scroll element was not found')

        const scroll = this._scroll

        scroll.ev.fixedElement = this.getFixedElement()
        scroll.ev.scrollElement = this.getScrollElement()

        scroll.onScrollStart = (ev) => {
          this.$emit('onScrollStart', ev)
        }

        scroll.onScroll = (ev) => {
          this.$emit('onScroll', ev)
          this.imgsUpdate()
        }

        scroll.onScrollEnd = (ev) => {
          this.$emit('onScrollEnd', ev)
          this.imgsUpdate()
        }

        this.$nextTick(() => {
          this._readDimensions()
          this._writeDimensions()
        })
      },
      getContentDimensions () {
        const scrollEle = this.getScrollElement()
        const parentElement = scrollEle.parentElement

        return {
          contentHeight: parentElement.offsetHeight - this._cTop - this._cBottom,
          contentTop: this._cTop,
          contentBottom: this._cBottom,

          contentWidth: parentElement.offsetWidth,
          contentLeft: parentElement.offsetLeft,

          scrollHeight: scrollEle.scrollHeight,
          scrollTop: scrollEle.scrollTop,

          scrollWidth: scrollEle.scrollWidth,
          scrollLeft: scrollEle.scrollLeft
        }
      },
      scrollTo (x, y, duration = 300, done) {
        return this._scroll.scrollTo(x, y, duration, done)
      },
      scrollToTop (duration = 300) {
        console.debug(`content, scrollToTop, duration: ${duration}`)
        return this._scroll.scrollToTop(duration)
      },
      scrollToBottom (duration = 300) {
        console.debug(`content, scrollToBottom, duration: ${duration}`)
        return this._scroll.scrollToBottom(duration)
      },
      enableJsScroll () {
        this._scroll.enableJsScroll(this._cTop, this._cBottom)
      },

      getScrollElement () {
        return this._scrollEle
      },

      getFixedElement () {
        return this._fixedEle
      },

      /**
       * 滚动结束的事件回调
       * @param {function} callback - 过渡结束的回调, 回调传参TransitionEvent
       * @private
       */
      onScrollElementTransitionEnd (callback) {
        transitionEnd(this.getScrollElement(), callback)
      },

      /**
       * @hidden
       * DOM WRITE
       */
      setScrollElementStyle (prop, val) {
        const scrollEle = this.getScrollElement()
        if (scrollEle) {
          this.$nextTick(() => {
            (scrollEle.style)[prop] = val
          })
        }
      },

      /**
       * Tell the content to recalculate its dimensions. This should be called
       * after dynamically adding/removing headers, footers, or tabs.
       */
      resize () {
        this.$nextTick(() => {
          this._readDimensions()
          this._writeDimensions()
        })
      },

      /**
       * DOM READ
       */
      _readDimensions () {
        const cachePaddingTop = this._pTop
        const cachePaddingRight = this._pRight
        const cachePaddingBottom = this._pBottom
        const cachePaddingLeft = this._pLeft
        const cacheHeaderHeight = this._hdrHeight
        const cacheTabsPlacement = this._tabsPlacement
        const cacheFooterHeight = this._ftrHeight
        let tabsTop = 0
        let scrollEvent = null
        this._pTop = 0
        this._pRight = 0
        this._pBottom = 0
        this._pLeft = 0
        this._hdrHeight = 0
        this._ftrHeight = 0
        this._tabsPlacement = null
        this._tTop = 0
        this._fTop = 0
        this._fBottom = 0

        // In certain cases this._scroll is undefined
        // if that is the case then we should just return
        if (!this._scroll) {
          assert(false, '_scroll should be valid')
          return
        }

        scrollEvent = this._scroll.ev

        let ele
        let computedStyle
        let parentEle = this.$parent.getNativeElement()
        let children = parentEle.children
        for (var i = children.length - 1; i >= 0; i--) {
          ele = children[i]
          if (hasClass(ele, 'ion-content')) {
            scrollEvent.contentElement = ele

            if (this.fullscreen) {
              // ******** DOM READ ****************
              computedStyle = window.getComputedStyle(ele)
              this._pTop = parsePxUnit(computedStyle.paddingTop)
              this._pBottom = parsePxUnit(computedStyle.paddingBottom)
              this._pRight = parsePxUnit(computedStyle.paddingRight)
              this._pLeft = parsePxUnit(computedStyle.paddingLeft)
            }
          } else if (hasClass(ele, 'ion-header')) {
            scrollEvent.headerElement = ele

            // ******** DOM READ ****************
            this._hdrHeight = ele.clientHeight
          } else if (hasClass(ele, 'ion-footer')) {
            scrollEvent.footerElement = ele

            // ******** DOM READ ****************
            this._ftrHeight = ele.clientHeight
            this._footerEle = ele
          }
        }

        // In a Tabs
        if (this._tabsCmp) {
          ele = this._tabsCmp.getNativeElement()
          let tabbarEle = ele.firstElementChild
          // ******** DOM READ ****************
          this._tabbarHeight = tabbarEle.clientHeight

          if (this._tabsPlacement === null) {
            // this is the first tabbar found, remember it's position
            this._tabsPlacement = ele.getAttribute('tabsplacement')
          }
        }

        // Tabs top
        if (this._tabsCmp && this._tabsPlacement === 'top') {
          this._tTop = this._hdrHeight
          tabsTop = this._tabsCmp.getTabsTop()
        }

        // Toolbar height
        this._cTop = this._hdrHeight
        this._cBottom = this._ftrHeight

        // Tabs height
        if (this._tabsPlacement === 'top') {
          this._cTop += this._tabbarHeight
        } else if (this._tabsPlacement === 'bottom') {
          this._cBottom += this._tabbarHeight
        }

        // Refresher uses a border which should be hidden unless pulled
        if (this.hasRefresher) {
          this._cTop -= 1
        }

        // Fixed content shouldn't include content padding
        this._fTop = this._cTop
        this._fBottom = this._cBottom

        // Handle fullscreen viewport (padding vs margin)
        if (this.fullscreen) {
          this._cTop += this._pTop
          this._cBottom += this._pBottom
        }

        // ******** DOM READ ****************
        const contentDimensions = this.getContentDimensions()
        scrollEvent.scrollHeight = contentDimensions.scrollHeight
        scrollEvent.scrollWidth = contentDimensions.scrollWidth
        scrollEvent.contentHeight = contentDimensions.contentHeight
        scrollEvent.contentWidth = contentDimensions.contentWidth
        scrollEvent.contentTop = contentDimensions.contentTop
        scrollEvent.contentBottom = contentDimensions.contentBottom

        this._dirty = (
          cachePaddingTop !== this._pTop ||
          cachePaddingBottom !== this._pBottom ||
          cachePaddingLeft !== this._pLeft ||
          cachePaddingRight !== this._pRight ||
          cacheHeaderHeight !== this._hdrHeight ||
          cacheFooterHeight !== this._ftrHeight ||
          cacheTabsPlacement !== this._tabsPlacement ||
          tabsTop !== this._tTop ||
          this._cTop !== this.contentTop ||
          this._cBottom !== this.contentBottom
        )

        this._scroll.init(this.getScrollElement(), this._cTop, this._cBottom)

        // initial imgs refresh
        this.imgsUpdate()
      },

      /**
       * DOM WRITE
       */
      _writeDimensions () {
        if (!this._dirty) {
          console.debug('Skipping writeDimensions')
          return
        }

        const scrollEle = this.getScrollElement()
        if (!scrollEle) {
          assert(false, 'this._scrollEle should be valid')
          return
        }

        const fixedEle = this.getFixedElement()
        if (!fixedEle) {
          assert(false, 'this._fixedEle should be valid')
          return
        }

        // Tabs height
        if (this._tabsPlacement === 'bottom' && this._cBottom > 0 && this._footerEle) {
          var footerPos = this._cBottom - this._ftrHeight
          assert(footerPos >= 0, 'footerPos has to be positive')
          // ******** DOM WRITE ****************
          this._footerEle.style.bottom = cssFormat(footerPos)
        }

        // Handle fullscreen viewport (padding vs margin)
        let topProperty = 'marginTop'
        let bottomProperty = 'marginBottom'
        let fixedTop = this._fTop
        let fixedBottom = this._fBottom

        if (this.fullscreen) {
          assert(this._pTop >= 0, '_paddingTop has to be positive')
          assert(this._pBottom >= 0, '_paddingBottom has to be positive')

          // adjust the content with padding, allowing content to scroll under headers/footers
          // however, on iOS you cannot control the margins of the scrollbar (last tested iOS9.2)
          // only add inline padding styles if the computed padding value, which would
          // have come from the app's css, is different than the new padding value
          topProperty = 'paddingTop'
          bottomProperty = 'paddingBottom'
        }

        // Only update top margin if value changed
        if (this._cTop !== this.contentTop) {
          assert(this._cTop >= 0, 'contentTop has to be positive')
          assert(fixedTop >= 0, 'fixedTop has to be positive');

          // ******** DOM WRITE ****************
          (scrollEle.style)[topProperty] = cssFormat(this._cTop)
          // ******** DOM WRITE ****************
          fixedEle.style.marginTop = cssFormat(fixedTop)

          this.contentTop = this._cTop
        }

        // Only update bottom margin if value changed
        if (this._cBottom !== this.contentBottom) {
          assert(this._cBottom >= 0, 'contentBottom has to be positive')
          assert(fixedBottom >= 0, 'fixedBottom has to be positive');

          // ******** DOM WRITE ****************
          (scrollEle.style)[bottomProperty] = cssFormat(this._cBottom)
          // ******** DOM WRITE ****************
          fixedEle.style.marginBottom = cssFormat(fixedBottom)

          this.contentBottom = this._cBottom
        }

        if (this._tabsCmp && this._tabsPlacement !== null) {
          // set the position of the tabbar
          if (this._tabsPlacement === 'top') {
            // ******** DOM WRITE ****************
            this._tabsCmp.setTabbarPosition(this._tTop, -1)
          } else {
            assert(this._tabsPlacement === 'bottom', 'tabsPlacement should be bottom')
            // ******** DOM WRITE ****************
            this._tabsCmp.setTabbarPosition(-1, 0)
          }
        }

        // Scroll the page all the way down after setting dimensions
        if (this.scrollDownOnLoad) {
          this.scrollToBottom(0)
          this.scrollDownOnLoad = false
        }
      },

      addImg (img) {
        this._imgs.push(img)
      },

      removeImg (img) {
        removeArrayItem(this._imgs, img)
      },

      imgsUpdate () {
        if (this._scroll.initialized && this._imgs.length && this.isImgsUpdatable()) {
          updateImgs(this._imgs, this.scrollTop, this.contentHeight, this.directionY, this._imgReqBfr, this._imgRndBfr)
        }
      },

      isImgsUpdatable () {
        // an image is only "updatable" if the content isn't scrolling too fast
        // if scroll speed is above the maximum velocity, then let current
        // requests finish, but do not start new requets or render anything
        // if scroll speed is below the maximum velocity, then it's ok
        // to start new requests and render images
        return Math.abs(this._scroll.ev.velocityY) < this._imgVelMax
      }
    }

  }

  function updateImgs (imgs, viewableTop, contentHeight, scrollDirectionY, requestableBuffer, renderableBuffer) {
    // ok, so it's time to see which images, if any, should be requested and rendered
    // ultimately, if we're scrolling fast then don't bother requesting or rendering
    // when scrolling is done, then it needs to do a check to see which images are
    // important to request and render, and which image requests should be aborted.
    // Additionally, images which are not near the viewable area should not be
    // rendered at all in order to save browser resources.
    const viewableBottom = (viewableTop + contentHeight)
    const priority1 = []
    const priority2 = []
    let img

    // all images should be paused
    for (var i = 0, ilen = imgs.length; i < ilen; i++) {
      img = imgs[i]

      if (scrollDirectionY === 'up') {
        // scrolling up
        if (img.top < viewableBottom && img.bottom > viewableTop - renderableBuffer) {
          // scrolling up, img is within viewable area
          // or about to be viewable area
          img.canRequest = img.canRender = true
          priority1.push(img)
          continue
        }

        if (img.bottom <= viewableTop && img.bottom > viewableTop - requestableBuffer) {
          // scrolling up, img is within requestable area
          img.canRequest = true
          img.canRender = false
          priority2.push(img)
          continue
        }

        if (img.top >= viewableBottom && img.top < viewableBottom + renderableBuffer) {
          // scrolling up, img below viewable area
          // but it's still within renderable area
          // don't allow a reset
          img.canRequest = img.canRender = false
          continue
        }
      } else {
        // scrolling down

        if (img.bottom > viewableTop && img.top < viewableBottom + renderableBuffer) {
          // scrolling down, img is within viewable area
          // or about to be viewable area
          img.canRequest = img.canRender = true
          priority1.push(img)
          continue
        }

        if (img.top >= viewableBottom && img.top < viewableBottom + requestableBuffer) {
          // scrolling down, img is within requestable area
          img.canRequest = true
          img.canRender = false
          priority2.push(img)
          continue
        }

        if (img.bottom <= viewableTop && img.bottom > viewableTop - renderableBuffer) {
          // scrolling down, img above viewable area
          // but it's still within renderable area
          // don't allow a reset
          img.canRequest = img.canRender = false
          continue
        }
      }

      img.canRequest = img.canRender = false
      img.reset()
    }

    // update all imgs which are viewable
    priority1.sort(sortTopToBottom).forEach(i => i.update())

    if (scrollDirectionY === 'up') {
      // scrolling up
      priority2.sort(sortTopToBottom).reverse().forEach(i => i.update())
    } else {
      // scrolling down
      priority2.sort(sortTopToBottom).forEach(i => i.update())
    }
  }

  function sortTopToBottom (a, b) {
    if (a.top < b.top) {
      return -1
    }
    if (a.top > b.top) {
      return 1
    }
    return 0
  }
</script>
<style lang="scss">
  @import "content";
  @import "content.ios";
  @import "content.md";
</style>
