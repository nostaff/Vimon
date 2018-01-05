/**
 * @component Spinner
 * @description
 *
 * ## 其他 / Spinner菊花组件
 *
 * ### 说明
 * Spinner组件提供了一个使用svg+js的方式事项的菊花图(loading). Spinner组件可以通过传入`props`来实时控制Spinner的样子, 用来模拟诸如: processing/thinking/waiting/chilling 等特性.
 *
 * ### 菊花风格
 *
 * Spinner的风格可以是下面的一种: ios/ios-small/bubbles/circles/crescent/dots, 其中, ios默认的是'ios'; md默认的是'crescent'; wp默认的是'circles'; 这些可以通过`config`配置
 *
 *
 * ### 如何使用
 *
 * ```
 * // 引入
 * import {Spinner} from 'vimon'
 * // 安装
 * Vue.component(Spinner.name, Spinner)
 * // 或者
 * export default{
 *   components: {
 *    Spinner
 *  }
 * }
 * ```
 *
 * @props {String} [color] - 颜色
 * @props {String} [mode='ios'] - 模式
 * @props {String} [name] - 菊花样式
 * @props {String} [duration] - 旋转动画的持续时间
 * @props {Boolean} [paused] - 是否暂停
 *
 * @demo #/spinner
 *
 * @usage
 * <Spinner></Spinner>
 * <Spinner name="ios"></Spinner>
 * <Spinner mode="wp"></Spinner>
 * <Spinner color="secondary" name="dots"></Spinner>
 * <Spinner duration="3000" name="dots"></Spinner>
 * <Spinner :paused="true" name="ios"></Spinner>
 */

export { default } from './spinner.vue'
