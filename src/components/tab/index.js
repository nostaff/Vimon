/**
 * @component Tabs/Tab
 * @description
 *
 * ## 大标签 / Tab
 *
 * 还是需要再声明下，Tab组件必须和Tabs组件配合使用， Tab组件内部与路由`$router`结合,
 * Tab点击切换使用的是`$router.[this.routerType](this.to)`处理的， 因此应该包含:to属性用于跳转。
 *
 * @props {String} [mode] - Tab组件内Icon核Badge的模式, 不可较差定义不同mode, 默认跟随系统
 * @props {Boolean|String} [disabled=false] - 是否能选择
 * @props {Boolean|String} [hidden=false] - 是否能隐藏
 * @props {Boolean|String} [selected=false] - 是否被选中，当tabUrlPath为空时，依据此项设置判断是否选中
 * @props {Boolean|String} [tabBadgeDot] - 是否圆点徽章
 * @props {String} [tabBadge] - 徽章显示值
 * @props {String} [tabBadgeColor] - 徽章颜色
 * @props {String} [tabIcon] - tab的IconName
 * @props {String} [tabTitle] - tab的tabTitle
 * @props {String} [tabUrlPath] - tabUrlPath点击后的URL地址，并用于计算是否选中了本tab
 *
 * @fires component:Tabs#onTabSelect
 *
 * @usage
 * <vm-tab tabBadge="7" tabTitle="Star" tabIcon="star" disabled="false"></vm-tab>
 * <vm-tab tabBadgeDot="true" tabBadgeColor="danger" tabTitle="Star" tabIcon="star" disabled="false"></vm-tab>
 *
 */
export { default } from './tab.vue'
