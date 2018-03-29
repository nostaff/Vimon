/**
 * @component Badge
 * @description
 *
 * ## 其他 / Badge 徽章
 *
 * 基础的徽章组件, 可以设置内容值、颜色，是否为圆点徽章等.
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { Badge } from 'vimon'
 * // 安装
 * Vue.component(Badge.name, Badge)
 * // 或者
 * export default{
 *   components: {
 *    Badge
 *  }
 * }
 * ```
 *
 * @props {Boolean} [dot]      - 是否为圆点徽章
 *
 * @demo #/badge
 *
 * @slot 空     徽章内容
 *
 * @usage
 * <Badge color="dark">999</Badge>
 * <Badge color="danger" dot></Badge>
 */

export { default } from './badge.vue'
