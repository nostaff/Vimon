/**
 * @component Tabs
 * @description
 *
 * ## 大标签 / Tabs
 *
 * ### 概述
 *
 * Tabs使用场景类似于"栏目切换", Tab组件中传入`props`定义每个tab的结构/样式/路由位子等信息。
 *
 * ### 使用规则
 *
 * 1. 页面结构参考下面示例
 * 2. 页面进入究竟激活那个子页面由路由规则决定
 * 3. `tabsHighlight`特性只能在`md`模式下使用
 *
 *
 * @props {String=} color                        - 颜色
 * @props {String} [mode='ios']                  - 模式
 * @props {Boolean} [tabsHighlight='false']      - tab下面是否显示选中bar, 只在md模式生效
 * @props {String} [tabsLayout='icon-top']       - tabbar的样式，可选配置: icon-top, icon-start, icon-end, icon-bottom, icon-hide, title-hide.
 *
 *
 * @fires component:Tabs#onTabChange
 *
 * @demo #/tabs
 * @usage
 *
 * <vm-page>
 *
 *    <vm-tabs selectedIndex="2" color="secondary" tabsLayout="icon-top" @onTabChange="onTabChange" ref="tabs">
 *      <vm-tab tabTitle="Location" tabIcon="navigate" tabUrlPath="/tabbar/home"></vm-tab>
 *      <vm-tab tabTitle="Favorites" tabIcon="star" tabBadge="12" tabBadgeStyle="dark" tabUrlPath="/tabbar/favor"></vm-tab>
 *      <vm-tab tabTitle="Radio" tabIcon="musical-notes" tabUrlPath="/tabbar/radio"></vm-tab>
 *
 *      <div slot="tab-content">
 *        <router-view></router-view>
 *      </div>
 *
 *    </vm-tabs>
 *
 * </vm-page>
 * ...
 * computed: {
 *   tabsComponent () {
 *    // 获取tabs的实例
 *    return this.$refs.tabs
 *   }
 * },
 * methods: {
 *    onTabChange(index){
 *      console.debug('事件 -> onTabChange-selectedIndex:' + index);
 *      console.debug('当前选择index的tab实例:')
 *      console.debug(this.tabsComponent.getByIndex(index))
 *      console.debug('获取当前在激活状态的tab实例:')
 *      console.debug(this.tabsComponent.getSelected())
 *      console.debug('由Tabs组件获取当前激活的index:' + this.tabsComponent.getActivatedIndex());
 *      console.debug('3s后选择第一个')
 *      clearTimeout(this.timer)
 *      this.timer = setTimeout(()=>{
 *        this.tabsComponent.selectTab(0)
 *      },3000)
 *    },
 *  },
 *
 */
export { default } from './tabs.vue'
