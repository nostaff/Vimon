
export function getCss (docEle) {
  var css = {
    transform: null,
    transition: null,
    transitionDuration: null,
    transitionDelay: null,
    transitionTimingFn: null,
    transitionStart: null,
    transitionEnd: null,
    transformOrigin: null,
    animationDelay: null
  }

  // transform
  var i
  var keys = ['webkitTransform', '-webkit-transform', 'webkit-transform', 'transform']

  for (i = 0; i < keys.length; i++) {
    if ((docEle.style)[keys[i]] !== undefined) {
      css.transform = keys[i]
      break
    }
  }

  // transition
  keys = ['webkitTransition', 'transition']
  for (i = 0; i < keys.length; i++) {
    if ((docEle.style)[keys[i]] !== undefined) {
      css.transition = keys[i]
      break
    }
  }

  // The only prefix we care about is webkit for transitions.
  var isWebkit = css.transition.indexOf('webkit') > -1

  // transition duration
  css.transitionDuration = (isWebkit ? '-webkit-' : '') + 'transition-duration'

  // transition timing function
  css.transitionTimingFn = (isWebkit ? '-webkit-' : '') + 'transition-timing-function'

  // transition delay
  css.transitionDelay = (isWebkit ? '-webkit-' : '') + 'transition-delay'

  // To be sure transitionend works everywhere, include *both* the webkit and non-webkit events
  css.transitionEnd = (isWebkit ? 'webkitTransitionEnd ' : '') + 'transitionend'

  // transform origin
  css.transformOrigin = (isWebkit ? '-webkit-' : '') + 'transform-origin'

  // animation delay
  css.animationDelay = (isWebkit ? 'webkitAnimationDelay' : 'animationDelay')

  return css
}

export function pointerCoord (ev) {
  // get coordinates for either a mouse click
  // or a touch depending on the given event
  if (ev) {
    var changedTouches = ev.changedTouches
    if (changedTouches && changedTouches.length > 0) {
      var touch = changedTouches[0]
      return { x: touch.clientX, y: touch.clientY }
    }
    var pageX = ev.pageX
    if (pageX !== undefined) {
      return { x: pageX, y: ev.pageY }
    }
  }
  return { x: 0, y: 0 }
}

export function hasPointerMoved (threshold, startCoord, endCoord) {
  if (startCoord && endCoord) {
    const deltaX = (startCoord.x - endCoord.x)
    const deltaY = (startCoord.y - endCoord.y)
    const distance = deltaX * deltaX + deltaY * deltaY
    return distance > (threshold * threshold)
  }
  return false
}

export function focusOutActiveElement () {
  const activeElement = document.activeElement //  <HTMLElement>
  activeElement && activeElement.blur && activeElement.blur()
}

export function setElementClass (ele, className, add) {
  if (add) {
    addClass(ele, className)
  } else {
    removeClass(ele, className)
  }
}

export function hasClass (el, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }

  const newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function removeClass (el, className) {
  if (!hasClass(el, className)) {
    return
  }

  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
  el.className = el.className.replace(reg, ' ')
}

export function getRect (el) {
  return {
    top: el.offsetTop,
    left: el.offsetLeft,
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

/**
 * 判断元素是否在激活状态, 比如input
 * @param {HTMLElement} ele - 元素
 * @return {boolean}
 **/
export function isActive (ele) {
  return !!(ele && document.activeElement === ele)
}

/**
 * 判断元素是否在focus状态, 比如input
 * @param {HTMLElement} ele - 元素
 * @return {boolean}
 **/
export function hasFocus (ele) {
  return isActive(ele) && ele.parentElement.querySelector(':focus') === ele
}

/**
 * transitionEnd事件注册，绑定的函数触发后会自动解绑
 * @param {HTMLElement} el      - 绑定的元素
 * @param {Function} callbackFn   - 绑定的函数
 * @return {Function}           - 取消绑定的函数
 **/
export function transitionEnd (el, callbackFn) {
  const unRegs = []

  function unregister () {
    unRegs.forEach(function (unReg) {
      unReg && unReg()
    })
  }

  function onTransitionEnd (ev) {
    if (el === ev.target) {
      callbackFn && callbackFn(ev)
      unregister()
    }
  }

  if (el) {
    registerListener(el, 'webkitTransitionEnd', onTransitionEnd, {}, unRegs)
    registerListener(el, 'transitionend', onTransitionEnd, {}, unRegs)
  }

  return unregister
}

/**
 * hashChange，hash变化后执行回调, 并自动解绑
 * @param {function} callback - 回调函数
 * @return {function} - 解绑函数
 **/
export function hashChange (callback) {
  let unReg = null

  const onHashChange = (ev) => {
    unReg && unReg()
    callback(ev)
  }

  unReg = registerListener(window, 'hashchange', onHashChange, {})
  return unReg
}

/**
 * urlChange(popstate)注册，绑定的函数触发后会自动解绑
 * @param {function} callback - 回调函数
 * @return {function} - 解绑函数
 **/
export function urlChange (callback) {
  let unReg = null
  const onStateChange = ev => {
    unReg && unReg()
    callback(ev)
  }
  unReg = registerListener(window, 'popstate', onStateChange, {})
  return unReg
}

/**
 * 给addEventListener增加passive属性, 如果不支持将降级使用!!opts.capture, 事件的关闭需要自己手动解除, 切记!!
 * @param {any} ele                               - 监听的元素
 * @param {string} eventName                      - 监听的名称
 * @param {function} callback                     - 回调
 * @param {object} [opts]                         - addEventListener的第三个参数 EventListenerOptions
 * @param {object} [opts.capture]                 - capture
 * @param {object} [opts.passive]                 - passive
 * @param {array} [unregisterListenersCollection] - 如果提供Function[], 则unReg将压如这个列表中
 * @return {Function}                             - 返回removeEventListener的函数
 */
export function registerListener (ele, eventName, callback, opts = {}, unregisterListenersCollection) {
  // use event listener options when supported
  // otherwise it's just a boolean for the "capture" arg
  const listenerOpts = isPassive() ? {capture: !!opts.capture, passive: !!opts.passive} : !!opts.capture

  // use the native addEventListener
  ele['addEventListener'](eventName, callback, listenerOpts)

  let unReg = function unregisterListener () {
    ele['removeEventListener'](eventName, callback, listenerOpts)
  }

  if (unregisterListenersCollection && Array.isArray(unregisterListenersCollection)) {
    unregisterListenersCollection.push(unReg)
  }

  return unReg
}

/**
 * 判断的当前浏览器是否支持isPassive属性
 * @return {Boolean}
 **/
export function isPassive () {
  var supportsPassiveOption = false
  try {
    window.addEventListener(
      'test',
      null,
      Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassiveOption = true
        }
      })
    )
  } catch (e) {}
  return supportsPassiveOption
}

/**
 * document的ready事件监听
 * @param {Function} [callback] - 回调函数
 * @return {Promise} - 返回promise，completed后自动解绑
 **/
export function docReady (callback) {
  let promise = null // Promise;

  if (!callback) {
    // a callback wasn't provided, so let's return a promise instead
    promise = new Promise(function (resolve) {
      callback = resolve
    })
  }

  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', completed, false)
    window.addEventListener('load', completed, false)
  }

  return promise

  function completed () {
    document.removeEventListener('DOMContentLoaded', completed, false)
    window.removeEventListener('load', completed, false)
    callback()
  }
}

export function getInsertPosition (position) {
  return (
    document.getElementById(position) ||
    document.getElementById('app') ||
    document.body
  )
}

export function createElement (marker, parentElm, setFirstChild = false) {
  let el = document.createElement('div')
  el.setAttribute(marker, '')

  let container = parentElm || document.body
  if (setFirstChild) { container.insertBefore(el, container.firstChild) } else { container.appendChild(el) }

  return el
}
