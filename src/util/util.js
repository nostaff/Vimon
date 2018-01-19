
/**
 * @hidden
 * Given a min and max, restrict the given number
 * to the range.
 * @param min the minimum
 * @param n the value
 * @param max the maximum
 */
export function clamp (min, n, max) {
  return Math.max(min, Math.min(n, max))
}

/** @hidden */
export function deepCopy (obj) {
  return JSON.parse(JSON.stringify(obj))
}

/** @hidden */
export function deepEqual (a, b) {
  if (a === b) {
    return true
  }
  return JSON.stringify(a) === JSON.stringify(b)
}

/** @hidden */
export function debounce (fn, wait, immediate) {
  if (immediate === void 0) { immediate = false }
  var timeout, args, context, timestamp, result
  return function () {
    context = this
    args = arguments
    timestamp = Date.now()
    var later = function () {
      var last = Date.now() - timestamp
      if (last < wait) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        if (!immediate) {
          result = fn.apply(context, args)
        }
      }
    }
    var callNow = immediate && !timeout
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    if (callNow) {
      result = fn.apply(context, args)
    }
    return result
  }
}

/**
 * @hidden
 * Rewrites an absolute URL so it works across file and http based engines
 */
export function normalizeURL (url) {
  var ionic = window['Ionic']
  if (ionic && ionic.normalizeURL) {
    return ionic.normalizeURL(url)
  }
  return url
}

/**
 * @hidden
 * Apply default arguments if they don't exist in
 * the first object.
 * @param {any} dest the destination to apply defaults to.
 */
export function defaults (dest) {
  var _args = []
  for (var _i = 1; _i < arguments.length; _i++) {
    _args[_i - 1] = arguments[_i]
  }
  for (var i = arguments.length - 1; i >= 1; i--) {
    var source = arguments[i]
    if (source) {
      for (var key in source) {
        if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
          dest[key] = source[key]
        }
      }
    }
  }
  return dest
}

/** @hidden */
export function isBoolean (val) { return typeof val === 'boolean' }

/** @hidden */
export function isString (val) { return typeof val === 'string' }

/** @hidden */
export function isNumber (val) { return typeof val === 'number' }

/** @hidden */
export function isFunction (val) { return typeof val === 'function' }

/** @hidden */
export function isDefined (val) { return typeof val !== 'undefined' }

/** @hidden */
export function isUndefined (val) { return typeof val === 'undefined' }

/** @hidden */
export function isPresent (val) { return val !== undefined && val !== null && val !== '' }

/** @hidden */
export function isBlank (val) { return val === undefined || val === null }

/** @hidden */
export function isObject (val) { return typeof val === 'object' }

/** @hidden */
export function isArray (val) { return Array.isArray(val) }

/** @hidden */
export function isPrimitive (val) {
  return isString(val) || isBoolean(val) || (isNumber(val) && !isNaN(val))
}

export const isDate = val =>
  Object.prototype.toString
    .call(val)
    .match(/^(\[object )(\w+)\]$/i)[2]
    .toLowerCase() === 'date'

export const isRegExp = val =>
  Object.prototype.toString
    .call(val)
    .match(/^(\[object )(\w+)\]$/i)[2]
    .toLowerCase() === 'regexp'

export const isPlainObject = val =>
  isObject(val) && Object.getPrototypeOf(val) === Object.prototype

/** @hidden */
export function isTrueProperty (val) {
  if (typeof val === 'string') {
    val = val.toLowerCase().trim()
    return (val === 'true' || val === 'on' || val === '')
  }
  return !!val
}

/** @hidden */
export function isCheckedProperty (a, b) {
  if (a === undefined || a === null || a === '') {
    return (b === undefined || b === null || b === '')
  } else if (a === true || a === 'true') {
    return (b === true || b === 'true')
  } else if (a === false || a === 'false') {
    return (b === false || b === 'false')
  } else if (a === 0 || a === '0') {
    return (b === 0 || b === '0')
  }
  // not using strict comparison on purpose
  return (a === b) // tslint:disable-line
}

/**
 * @hidden
 * Given a side, return if it should be on the right
 * based on the value of dir
 * @param side the side
 * @param isRTL whether the application dir is rtl
 * @param defaultRight whether the default side is right
 */
export function isRightSide (side, isRTL, defaultRight) {
  if (defaultRight === void 0) { defaultRight = false }
  switch (side) {
    case 'right': return true
    case 'left': return false
    case 'end': return !isRTL
    case 'start': return isRTL
    default: return defaultRight ? !isRTL : isRTL
  }
}

/** @hidden */
export function reorderArray (array, indexes) {
  var element = array[indexes.from]
  array.splice(indexes.from, 1)
  array.splice(indexes.to, 0, element)
  return array
}

/** @hidden */
export function removeArrayItem (array, item) {
  var index = array.indexOf(item)
  return !!~index && !!array.splice(index, 1)
}

/** @hidden */
export function swipeShouldReset (isResetDirection, isMovingFast, isOnResetZone) {
  // The logic required to know when the sliding item should close (openAmount=0)
  // depends on three booleans (isCloseDirection, isMovingFast, isOnCloseZone)
  // and it ended up being too complicated to be written manually without errors
  // so the truth table is attached below: (0=false, 1=true)
  // isCloseDirection | isMovingFast | isOnCloseZone || shouldClose
  //         0        |       0      |       0       ||    0
  //         0        |       0      |       1       ||    1
  //         0        |       1      |       0       ||    0
  //         0        |       1      |       1       ||    0
  //         1        |       0      |       0       ||    0
  //         1        |       0      |       1       ||    1
  //         1        |       1      |       0       ||    1
  //         1        |       1      |       1       ||    1
  // The resulting expression was generated by resolving the K-map (Karnaugh map):
  var shouldClose = (!isMovingFast && isOnResetZone) || (isResetDirection && isMovingFast)
  return shouldClose
}

/** @hidden */
const ASSERT_ENABLED = true

/** @hidden */
export function runInDev (fn) {
  if (ASSERT_ENABLED === true) {
    return fn()
  }
}

/** @hidden */
export function assert (actual, reason) {
  if (!actual && ASSERT_ENABLED === true) {
    let message = 'IONIC ASSERT: ' + reason
    console.error(message)
    debugger // tslint:disable-line
    throw new Error(message)
  }
}
//
// /** @hidden */
// export function requestIonicCallback(functionToLazy) {
//   if ('requestIdleCallback' in window) {
//     return (window as any).requestIdleCallback(functionToLazy);
//   } else {
//     return setTimeout(functionToLazy, 500);
//   }
// }

/**
 * 首字母大写
 * @param {string} str - 传入string
 * @return {string}
 **/
export function firstUpperCase (str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1)
}
//
/**
 * 将带px单位的string转化为数字
 * @param {string} val - 传入的string
 * @return {number}
 * @example
 * 10px -> 10
 **/
export function parsePxUnit (val) {
  return !!val && val.indexOf('px') > 0 ? parseInt(val, 10) : 0
}

/**
 * 获取尺寸单位值
 * @param {*} val
 */
export function getUnitValue (val) {
  if (isPresent(val)) {
    if (typeof val === 'string') {
      if (val.indexOf('%') > -1 || val.indexOf('px') > -1) {
        return val
      }
      if (val.length) {
        return val + 'px'
      }
    } else if (typeof val === 'number') {
      return val + 'px'
    }
  }
  return ''
}

export function cssFormat (val) {
  return (val > 0 ? val + 'px' : '')
}

export function timeout (duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration)
  })
}

export function uuid () {
  return Math.random().toString(36).substr(3, 8)
}

export function createElement (marker, parentElm, setFirstChild = false) {
  let el = document.createElement('div')
  el.setAttribute(marker, '')

  let container = parentElm || document.body
  if (setFirstChild) { container.insertBefore(el, container.firstChild) } else { container.appendChild(el) }

  return el
}
