/**
 * @component Avatar
 * @description
 *
 * ## 其他 / Avatar 头像
 *
 * 基础的头像组件, 可以设置大小、颜色等.
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { Avatar } from 'vimon'
 * // 安装
 * Vue.component(Avatar.name, Avatar)
 * // 或者
 * export default{
 *   components: {
 *    Avatar
 *  }
 * }
 * ```
 *
 * @props {String} [color='default'] - 颜色
 * @props {Number} [size]       - 尺寸
 * @props {Boolean} [tile]      - 是否方形边框，默认为否，圆形
 *
 * @demo #/list
 *
 * @slot 空     头像内容，可以是图片、图标、文字等
 *
 * @usage
 * <Avatar><img src="/static/avatar-1.png"/></Avatar>
 * <Avatar color="danger" size="48"><Icon name="heart"></Icon></Avatar>
 */

export { default } from './avatar.vue'
