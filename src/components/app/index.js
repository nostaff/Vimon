/**
 * @component App
 * @description
 *
 *  ## 基础组件 / App组件
 *
 * App组件是Vimo框架的根组件,用于管理及控制整个页面的状态.
 * 控制App行为的方法已挂载到`vue.prototype.$app`上, 所以在页面中直接像这样使用, 例如:
 *
 * ```
 * this.$app.setTitle('Hello World'); // 设置title
 * this.$app.isScrolling; // 获取可滚动状态
 * this.$app.isEnabled; // 获取可点击状态
 * ```
 *
 * ### 可用状态(参考示例)
 *
 * - isScrolling  获取当前可滚动状态
 * - isEnabled    获取可点击状态
 *
 * ### 可在全局使用的公共样式
 *
 * -Text Alignment
 *    - [text-left]          - 文本左对齐
 *    - [text-center]        - 文本居中
 *    - [text-right]         - 文本右对齐
 *    - [text-justify]       - 文本右对齐
 *    - [text-nowrap]        - 文本不换行
 *
 *
 * -Text Transformation
 *    - [text-uppercase]     - 文本大写
 *    - [text-lowercase]     - 文本小写
 *    - [text-capitalize]    - 文本首字母大写
 *
 * -Normal
 *    - [padding]         - 结构增加padding, 默认16px
 *    - [no-padding]      - 结构去除padding
 *    - [hidden]          - display:none
 *    - .hidden           - display:none
 *
 * @props {String} [mode='ios'] - 模式, 用于在根处定义app的平台及样式
 *
 *
 * @slot 空               默认插入到正常页面中
 * @slot [outer]         插入到最外部， 用于定义在所有页面和弹出层之上的结构组件，比如：landscape-prompt组件
 *
 * @demo #/app
 */

export { default } from './app.vue'
