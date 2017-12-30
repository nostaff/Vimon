/**
 * @component Loading
 * @description
 *
 * ## 弹出层 / Loading组件
 *
 * - Loading通过present开启, 如果没设置duration, 则需要手动dismiss,
 * - Vimo的弹出层都是独立于页面的, 但也不是`body`的直接子元素, 而是挂载在App组件中的. 这样做是有考量的.
 * - 组件相应路由切换, 路由切换则自动关闭
 *
 * ### 用法
 *
 * - 不传参数则显示菊花
 * - 传入string则显示string
 * - 参考下面的示例
 *
 *
 * @props {string} [spinner='ios'] - 菊花样式
 * @props {string} [content] - 内容
 * @props {string} [cssClass] - 自定义样式
 * @props {boolean} [showBackdrop=false] - 是否显示黑色背景
 * @props {number} [duration] - loading持续时间, 如果为0则无效
 * @props {boolean} [dismissOnPageChange=true] - 页面切换是否关闭loading
 * @props {string} [mode='ios'] - 模式
 *
 * @demo #/loading
 * @see component:Indicator
 * @usage
 *
 * // 只显示菊花
 * spinnerOnly () {
 *      this.$loading.present();
 *      setTimeout(() => {
 *        this.$loading.dismiss().then(() => {
 *          console.debug('dismiss in promise success!')
 *        })
 *      }, 1000)
 * },
 *
 * // 是显示name
 * stringOnly () {
 *      this.$loading.present('只传入了String');
 *      setTimeout(() => {
 *        this.$loading.dismiss().then(() => {
 *          console.debug('dismiss in promise success!')
 *        })
 *      }, 1000)
 * },
 *
 * // 普通的
 * showDefault () {
 *      this.$loading.present({
 *        content: '正在加载, 6000ms后自动关闭...',
 *        dismissOnPageChange: false, // url变化后关闭loading(默认)
 *        showBackdrop: true,
 *      });
 *      setTimeout(() => {
 *        this.$loading.dismiss().then(() => {
 *          console.debug('dismiss in promise success!')
 *        })
 *      }, 6000);
 * },
 *
 */
import { isString } from '../../util/util'
import LoadingComponent from './loading.vue'
import GeneratePopUpInstance from '../../util/generatePopUpInstance.js'

class LoadingInstance extends GeneratePopUpInstance {
  normalizeOptions (options = {}) {
    if (isString(options)) {
      options = {content: options}
    }
    options.scrollControl = false
    return options
  }

  isPresentHandled (options) {
    return (!!options && !options.isH5) &&
      window.VM &&
      window.VM.platform &&
      window.VM.platform.showLoading &&
      window.VM.platform.showLoading(options)
  }

  isDismissHandled () {
    return window.VM &&
      window.VM.platform &&
      window.VM.platform.hideLoading &&
      window.VM.platform.hideLoading()
  }
}

export default new LoadingInstance(LoadingComponent, 'loading-portal')
