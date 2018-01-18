/**
 * @class History
 * @classdesc 通过vue-router的onRouteChangeBefore事件构建本地历史记录
 *
 * 完成的功能如下:
 *
 * - 内建导航记录
 * - 此History是对router实例的拓展, 但是不会为router实例添加方法, 而是重新定义$history, 这个可在业务的this中访问到
 */

const VIMO_ROUTES = 'VIMO_ROUTES'
const VIMO_NONE = ''
const VIMO_FORWARD = 'forward'
const VIMO_BACKWARD = 'backward'

export class History {
  constructor (router, config, platform) {
    if (!router) {
      console.error('history need options: this.router')
      return
    }

    this.endTime = Date.now()
    document.addEventListener('touchstart', () => {
      this.endTime = Date.now()
    })

    // init route & session storage
    this.routes = []
    this.routesCount = 0
    this.direction = VIMO_NONE

    this.session = window.sessionStorage
    let routes = this.session.getItem(VIMO_ROUTES)
    if (routes) {
      this.routes = JSON.parse(routes)
    } else {
      this.session.setItem(VIMO_ROUTES, JSON.stringify([]))
    }

    this.router = router // vue-router实例
    this.config = config // this.config 实例
    this.platform = platform // this.platform 实例

    this.replaceFlag = false // 路由跳转是否是使用replace方法
    this.usePushWindow = this.config.getBoolean('usePushWindow', false) // 支付宝 和 钉钉 两个模式下路由跳转是否开启新页面

    const _this = this

    // hack vue-router replace for replaceFlag
    const routerReplace = this.router.replace.bind(this.router)
    this.router.replace = function (location, onComplete, onAbort) {
      _this.replaceFlag = true
      routerReplace(location, onComplete, onAbort)
    }

    if (this.usePushWindow) {
      /**
       * 方法增强: back()
       **/
      const routerBack = this.router.back.bind(this.router)
      this.router.back = function () {
        let isHandled = _this.platform.popWindow && _this.platform.popWindow()
        if (!isHandled) {
          routerBack.apply(null)
        }
      }

      /**
       * 方法增强: go()
       **/
      const routerGo = this.router.go.bind(this.router)
      this.router.go = function (n) {
        let isHandled = _this.platform.popTo && _this.platform.popTo(n)
        if (!isHandled) {
          routerGo.apply(null, n)
        }
      }
    }

    // hook this.router
    this.router.beforeEach((to, from, next) => {
      _this._recordHistory(to, from, _this.replaceFlag)

      if (/\/http/.test(to.path)) {
        let url = to.path.split('http')[1]
        window.location.href = `http${url}`
      } else {
        next()
      }
    })

    // record this.router change
    this.router.afterEach((to, from) => {
      _this.replaceFlag = false
    })
  }

  _recordHistory (toRoute, fromRoute, replaceFlag) {
    const name = toRoute.path || toRoute.name
    if (this.replaceFlag) { // replace
      this.routes.splice(this.routes.length - 1, 1, name)
      this.direction = VIMO_FORWARD
    } else {
      const toIndex = this.routes.lastIndexOf(name)
      if (toIndex === -1) { // forward
        this.routes.push(name)
        // 判断是否是ios左滑前进
        if ((Date.now() - this.endTime) > 377) {
          this.direction = VIMO_NONE
        } else {
          this.direction = VIMO_FORWARD
        }
      } else if (toIndex === this.routes.length - 1) { // refresh
        this.direction = ''
      } else { // backward
        let count = this.routes.length - 1 - toIndex
        this.routes.splice(this.routes.length - count, count)

        // 判断是否是ios右滑返回
        if ((Date.now() - this.endTime) > 377) {
          this.direction = VIMO_NONE
        } else {
          this.direction = VIMO_BACKWARD
        }
      }
    }
    this.nextDirection(this.direction)
    this.session.setItem(VIMO_ROUTES, JSON.stringify(this.routes))
  }

  get length () {
    return this.routes.length
  }

  nextDirection (direction) {
    let el = document.querySelector('.ion-nav')
    if (el) el.setAttribute('transition-direction', direction)
  }

  /**
   * 获取当前的页面进行的方向
   * 只能是这两个值: forward || backward
   * @return {string}
   **/
  getDirection () {
    return this.direction
  }

  /**
   * 判断是否能返回
   * @return {Boolean}
   **/
  canGoBack () {
    return this.length > 1
  }

  /**
   * 获取当前的导航记录
   * @return {Array}
   **/
  getHistory () {
    return this.routes
  }

  /**
   * 返回root页面(在路由信息中标示```route.meta.root=true```的页面)
   * @example
   * {
   *    path: '/',
   *    name: 'index',
   *    meta: {
   *      root: true
   *    },
   *    component: require('@/pages/index.vue')
   * }
   **/
  toRoot () {
    // 支付宝方式返回首页
    let isHandled = this.platform.popToRoot && this.platform.popToRoot()
    if (!isHandled) {
      if (this.router.options.routes) {
        let routes = this.router.options.routes
        for (let i = 0, len = routes.length; len > i; i++) {
          let route = routes[i]
          if (route && route.meta && route.meta.root) {
            this.router.replace(route)
            this.session.clear()
            return
          }
        }
      }

      if (!isHandled) {
        this.router.go(1 - this.length)
      }
    }
  }
}

export function setupHistory (router, config, platform) {
  return new History(router, config, platform)
}
