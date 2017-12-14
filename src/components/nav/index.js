/**
 * @component Nav
 * @description
 *
 * ## 基础组件 / Nav组件
 *
 * 这里是Page组件的父容器, 而且转场动画也是在这里执行.
 *
 * 转场动画是使用css3的特性完成的, 也就是说Vimo不提供手势转场动画. 按照在props中的说明, 可提供这几类已写好的专场动画, 如果项目需要定制, 则特换自定义的动画即可, 动画定义在App组件的文件夹中.
 *
 * ### 转场动画
 *
 * 动画是在Nav组件设置的, 其中, IOS默认使用```fade-right-transition```动画, 安卓默认使用```zoom-transition```.
 *
 * ### 页面切换是否需要Indicator的问题
 *
 * 添加这个功能是因为在有些使用情况下, 跳转加载大页面时会有很长时间的空白无交互期, 因此加上Indicator给用户提示正在下载将要去的页面的资源, 这个默认不开启.
 *
 * @props {String} [pageTransition] - 转场动画的名称, 可以是这里的一种: ios-transition / zoom-transition / fade-bottom-transition / fade-right-transition / fade-transition
 * @props {Boolean} [showIndicatorWhenPageChange=false] - 页面切换是否显示Indicator
 *
 */
export { default } from './nav.vue'
