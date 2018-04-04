/**
 * @component Toolbar/BarButtons
 * @description
 *
 * ## 按钮组(Toolbar) / BarButtons
 *
 * 这个组件只在Toolbar中使用. start/left/right/end等位置属性只能在此组组件上起作用. 可以理解为Button的放置盒子
 *
 * ### 如何引入
 *
 * ```
 * // 引入
 * import { Toolbar, BarButtons, Title } from 'vimon'
 * // 安装
 * Vue.component(Toolbar.name, Toolbar)
 * Vue.component(Title.name, Title)
 * Vue.component(BarButtons.name, BarButtons)
 * ```
 *
 * ### 说明
 *
 * [left]/[right]/[end]属性标记位置, 注意没有[start]属性!!!
 *
 * @props {String} [mode=ios] - 模式
 * @props {Boolean} [left=false] - 放置在左侧
 * @props {Boolean} [right=false] - 放置在右侧
 * @props {Boolean} [end=false] - 放置在最右侧
 *
 * @see component:Toolbar
 *
 */
export { default } from './bar-buttons.vue'
