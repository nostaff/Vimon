/**
 * @component Modal
 * @description
 *
 * ## 弹出层 / Modal弹出页组件
 *
 * ## 补充
 *
 * Model组件用于当前页面的补充, 相当于在当前页面上再来弹一个页面, 这里并不改变路由, 但是会改变H5 history的popstate, 每打开一个Modal则新增一个历史记录, 可以通过后退关闭最后一次打开的modal.
 *
 * ## 注意点
 *
 * - 在modal中如果跳转到另一页之前希望能先关闭当前modal再操作
 * - modal不会再url中留下记录
 * - modal只是装菜的盘子, 盘子中的菜通过`component`传入, 数据通过`data`传入,
 *    - this.$attrs.data.username 获取数据
 *    - this.username 也能获取到数据, 注意别冲突
 * - `onDismiss`会在modal关闭后触发.
 * - 开启的页面就是完整的Page页面, 别无其他
 *
 * @usage
 * // 开启
 * openModal () {
 *        this.$modal.present({
 *          component: modalPageComponent,
 *          data: {hello: 'Page1Data'},
 *          showBackdrop: true,
 *          enableBackdropDismiss: true,
 *          onDismiss (data) {
 *            console.debug('得到了modal1的关闭信息')
 *            console.debug(JSON.stringify(data))
 *          }
 *    })
 * },
 *
 * // 关闭
 * closeModal () {
 *        this.$modal.dismiss({
 *          result: 'modal 1 dismissed success!'
 *        })
 * }
 * @demo #/modal
 *
 * */

import Vue from 'vue'
import {getInsertPosition} from '../../util/dom'
import modalComponent from './modal.vue'

let modalArr = [] // modal实例的堆栈

/**
 * 获取实例
 * @private
 */
function ModalFactory (options) {
  const Modal = Vue.extend(modalComponent)
  return new Modal({
    el: getInsertPosition('modal-portal').appendChild(
      document.createElement('div')
    ),
    $data: options
  })
}

/**
 * 开启Modal方法
 * 如果不懂想下: 桌子(页面)/菜盘(modal)/菜(template)的关系, 开启后获取Modal实例, 并将template初始化后挂在到Modal上, 然后注册urlChange事件. 在之后记录开启的Modal信息,
 * 然后执行modal实例的_present开启.
 *
 * @param {Object} options
 * @param {object} options.component - modal页面, 不支持异步
 * @param {object} [options.data] - 传给modal的数据, 数据会写到component的data属性中, 当然, 这个是响应式的.
 * @param {function} [options.onDismiss] - 关闭model执行的操作, data是关闭时传入的参数
 * @param {Boolean} [options.showBackdrop=true] - 显示backdrop
 * @param {Boolean} [options.enableBackdropDismiss=true] - 点击backdrop是否关闭
 * @example
 * 传入参数示例:
 * {
 *  component:require('*.vue'),  // modal页面
 *  data:{...},            // 传给modal的数据
 *  onDismiss(data){....},      // 关闭model执行的操作, data是关闭时传入的参数
 * }
 *
 * 子页面通过
 * - this.$attrs.data.username 获取数据
 *
 * */
function present (options = {}) {
  return new Promise((resolve) => {
    let modalInstance = ModalFactory(options)
    let presentPromise = modalInstance.present()

    // record
    modalArr.push(modalInstance)

    presentPromise.then(() => {
      resolve()
    })
  })
}

/**
 * 全局注册dismiss方法
 * dismiss关闭最后一次打开的Modal, 并执行onDismiss函数, 就酱, 因为, modal是覆盖式的显示在页面上, 即使给定关闭的modal名字, 也无使用意义.
 * `data`数据将由外部`onDismiss`接收
 * @param {*} [data] -  modal调用dismiss传递向外的数据
 * */
function dismiss (data) {
  return new Promise(resolve => {
    // 总是关闭最后一次创建的modal
    let lastModalInstance = modalArr.pop()
    lastModalInstance.dismiss(data).then(() => {
      // 执行注册的onDismiss回调
      resolve()
    })
  })
}

export default {
  present,
  dismiss
}
