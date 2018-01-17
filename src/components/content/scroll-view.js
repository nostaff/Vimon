import {registerListener} from '../../util/dom'

const SCROLL_END_DEBOUNCE_MS = 80
const FRAME_MS = (1000 / 60)
const EVENT_OPTS = {
  passive: true,
  zone: false
}

export default class ScrollView {
  constructor () {
    this.ev = null
    this.isScrolling = false
    this.onScrollStart = (ev) => (ev) => {}
    this.onScroll = (ev) => (ev) => {}
    this.onScrollEnd = (ev) => (ev) => {}
    this.initialized = false

    this._el = null
    this._lsn = null
    this._endTmr = null
    this._transform = window.VM && window.VM.platform && window.VM.platform.css.transform || 'transform'

    this.ev = {
      timeStamp: 0,
      scrollTop: 0,
      scrollLeft: 0,
      scrollHeight: 0,
      scrollWidth: 0,
      contentHeight: 0,
      contentWidth: 0,
      contentTop: 0,
      contentBottom: 0,
      startY: 0,
      startX: 0,
      deltaY: 0,
      deltaX: 0,
      velocityY: 0,
      velocityX: 0,
      directionY: 'down',
      directionX: null
    }
  }

  init (ele) {
    console.assert(ele, 'scroll-view, element can not be null')
    this._el = ele
    if (!this.initialized) {
      this.initialized = true
      this.enableNativeScrolling()
    }
  }

  setScrolling (isScrolling, ev) {
    if (this.isScrolling) {
      if (isScrolling) {
        this.onScroll && this.onScroll(ev)
      } else {
        this.isScrolling = false
        this.onScrollEnd && this.onScrollEnd(ev)
      }
    } else if (isScrolling) {
      this.isScrolling = true
      this.onScrollStart && this.onScrollStart(ev)
    }
  }

  enableNativeScrolling () {
    console.assert(this.onScrollStart, 'onScrollStart is not defined')
    console.assert(this.onScroll, 'onScroll is not defined')
    console.assert(this.onScrollEnd, 'onScrollEnd is not defined')

    if (!this._el) {
      return
    }

    const self = this
    const ev = self.ev
    const positions = []

    function scrollCallback (scrollEvent) {
      ev.timeStamp = scrollEvent.timeStamp

      // Event.timeStamp is 0 in firefox
      if (!ev.timeStamp) {
        ev.timeStamp = Date.now()
      }

      // get the current scrollTop
      ev.scrollTop = self.getTop()

      // get the current scrollLeft
      ev.scrollLeft = self.getLeft()

      if (!self.isScrolling) {
        // remember the start positions
        ev.startY = ev.scrollTop
        ev.startX = ev.scrollLeft

        // new scroll, so do some resets
        ev.velocityY = ev.velocityX = 0
        ev.deltaY = ev.deltaX = 0
        positions.length = 0
      }

      // actively scrolling
      positions.push(ev.scrollTop, ev.scrollLeft, ev.timeStamp)

      if (positions.length > 3) {
        // we've gotten at least 2 scroll events so far
        ev.deltaY = (ev.scrollTop - ev.startY)
        ev.deltaX = (ev.scrollLeft - ev.startX)

        var endPos = (positions.length - 1)
        var startPos = endPos
        var timeRange = (ev.timeStamp - 100)

        // move pointer to position measured 100ms ago
        for (var i = endPos; i > 0 && positions[i] > timeRange; i -= 3) {
          startPos = i
        }

        if (startPos !== endPos) {
          // compute relative movement between these two points
          var movedTop = (positions[startPos - 2] - positions[endPos - 2])
          var movedLeft = (positions[startPos - 1] - positions[endPos - 1])
          var factor = FRAME_MS / (positions[endPos] - positions[startPos])
          // based on XXms compute the movement to apply for each render step
          ev.velocityY = movedTop * factor
          ev.velocityX = movedLeft * factor

          // figure out which direction we're scrolling
          ev.directionY = (movedTop > 0 ? 'up' : 'down')
          ev.directionX = (movedLeft > 0 ? 'left' : 'right')
        }
      }

      function scrollEnd () {
        // reset velocity, do not reset the directions or deltas
        ev.velocityY = ev.velocityX = 0

        // emit that the scroll has ended
        self.setScrolling(false, ev)

        self._endTmr = null
      }

      // emit on each scroll event
      self.setScrolling(true, ev)

      // debounce for a moment after the last scroll event
      window.clearTimeout(self._endTmr)
      self._endTmr = window.setTimeout(scrollEnd, SCROLL_END_DEBOUNCE_MS)
    }

    // clear out any existing listeners (just to be safe)
    self._lsn && self._lsn()

    // assign the raw scroll listener
    // note that it does not have a wrapping requestAnimationFrame on purpose
    // a scroll event callback will always be right before the raf callback
    // so there's little to no value of using raf here since it'll all ways immediately
    // call the raf if it was set within the scroll event, so this will save us some time
    self._lsn = registerListener(self._el, 'scroll', scrollCallback, EVENT_OPTS)
  }

  /**
   * DOM READ
   */
  getHeight () {
    return this._el.scrollHeight
  }

  /**
   * DOM READ
   */
  getWidth () {
    return this._el.scrollWidth
  }

  /**
   * DOM READ
   */
  getTop () {
    return this._el.scrollTop
  }

  /**
   * DOM READ
   */
  getLeft () {
    return this._el.scrollLeft
  }

  /**
   * DOM WRITE
   */
  setTop (top) {
    this._el.scrollTop = top
  }

  /**
   * DOM WRITE
   */
  setLeft (left) {
    this._el.scrollLeft = left
  }

  scrollTo (x, y, duration, done) {
    // scroll animation loop w/ easing
    // credit https://gist.github.com/dezinezync/5487119

    let promise
    if (done === undefined) {
      // only create a promise if a done callback wasn't provided
      // done can be a null, which avoids any functions
      promise = new Promise(resolve => {
        done = resolve
      })
    }

    const self = this
    const el = self._el
    if (!el) {
      // invalid element
      done()
      return promise
    }

    if (duration < 32) {
      self.setTop(y)
      self.setLeft(x)
      done()
      return promise
    }

    const fromY = el.scrollTop
    const fromX = el.scrollLeft

    const maxAttempts = (duration / 16) + 100
    const transform = this._transform

    let startTime
    let attempts = 0
    let stopScroll = false

    // scroll loop
    function step (timeStamp) {
      attempts++

      if (!self._el || stopScroll || attempts > maxAttempts) {
        self.setScrolling(false, null);
        (el.style)[transform] = ''
        done()
        return
      }

      let time = Math.min(1, ((timeStamp - startTime) / duration))

      // where .5 would be 50% of time on a linear scale easedT gives a
      // fraction based on the easing method
      let easedT = (--time) * time * time + 1

      if (fromY !== y) {
        self.setTop((easedT * (y - fromY)) + fromY)
      }

      if (fromX !== x) {
        self.setLeft(Math.floor((easedT * (x - fromX)) + fromX))
      }

      if (easedT < 1) {
        // do not use DomController here
        // must use nativeRaf in order to fire in the next frame
        window.requestAnimationFrame(step)
      } else {
        stopScroll = true
        self.setScrolling(false, null);
        (el.style)[transform] = ''
        done()
      }
    }

    // start scroll loop
    self.setScrolling(true, null)
    self.isScrolling = true

    // chill out for a frame first
    window.setTimeout(timeStamp => {
      startTime = timeStamp
      step(timeStamp)
    }, 16)

    return promise
  }

  scrollToTop (duration) {
    return this.scrollTo(0, 0, duration)
  }

  scrollToBottom (duration) {
    let y = 0
    if (this._el) {
      y = this._el.scrollHeight - this._el.clientHeight
    }
    return this.scrollTo(0, y, duration)
  }

  scrollBy (x = 0, y = 0, duration = 300, done) {
    y += this.getTop()
    x += this.getLeft()
    return this.scrollTo(x, y, duration, done)
  }

  scrollToElement (el, duration = 300, done) {
    if (!el) {
      console.assert(el, 'The method scrollToElement() need element!')
      return new Promise((resolve) => { resolve() })
    }

    let x = 0
    let y = el.offsetTop

    return this.scrollTo(x, y, duration, done)
  }

  stop () {
    this.setScrolling(false, null)
  }

  /**
   * @hidden
   */
  destroy () {
    this.stop()

    this._endTmr && window.clearTimeout(this._endTmr)
    this._lsn && this._lsn()

    let ev = this.ev
    ev.contentElement = ev.fixedElement = ev.scrollElement = ev.headerElement = null
    this._lsn = this._el = this.ev = ev = null
    this.onScrollStart = this.onScroll = this.onScrollEnd = null
  }
}
