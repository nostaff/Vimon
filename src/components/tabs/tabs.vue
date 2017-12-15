<template>
  <div class="ion-tabs"
       :class="[modeClass, colorClass]"
       :id="id"
       :tabsLayout="tabsLayout"
       :tabsHighlight="tabsHighlight"
       :tabsPlacement="tabsPlacement">
    <div class="tabbar" role="tablist" ref="tabbarElement">
      <slot></slot>
      <div class="tab-highlight"></div>
    </div>
    <slot name="tab-content"></slot>
    <div tab-portal=""></div>
  </div>
</template>

<script>
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
 * <Page>
 *    <Content>
 *        <router-view></router-view>
 *    </Content>
 *    <Footer>
 *        <Tabs tabsLayout="icon-top" @onTabChange="onTabChange" ref=tabs>
 *            <router-view></router-view>
 *            <Tab slot="tab" :to="{name:'tabsBottom.demoTab1'}" tabBadge="13" tabTitle="User" tabBadgeStyle="danger" tabIcon="person"></Tab>
 *            <Tab slot="tab" :to="{name:'tabsBottom.demoTab2'}" tabBadge="2" tabTitle="Cars" tabBadgeStyle="dark" tabIcon="car"></Tab>
 *            <Tab slot="tab" :to="{name:'tabsBottom.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star" :enabled="true"></Tab>
 *        </Tabs>
 *    </Footer>
 * </Page>
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
 *        this.tabsComponent.select(0)
 *      },3000)
 *    },
 *  },
 *
 */
import {isBlank} from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'

let tabIds = -1

export default {
  name: 'vm-tabs',
  mixins: [ModeMixins],
  provide () {
    const _this = this
    return {
      tabsComponent: _this
    }
  },
  props: {
    selectedIndex: {
      type: [String, Number],
      default: 0
    },
    tabsHighlight: {
      type: Boolean,
      default: true
    },
    tabsLayout: {
      type: String,
      default: 'icon-top',
      validator (value) {
        return ['icon-top', 'icon-start', 'icon-end', 'icon-bottom', 'icon-hide', 'title-hide'].indexOf(value) > -1
      }
    },
    tabsPlacement: {
      type: String,
      default: 'bottom',
      validator (value) {
        return ['top', 'bottom'].indexOf(value) > -1
      }
    }
  },
  data () {
    return {
      id: '',
      ids: -1,
      tabs: [],

      _top: 0,
      _bottom: 0,

      selectedTabIndex: -1
    }
  },
  created () {
    this.id = 't-' + (++tabIds)

    this.selectedTabIndex = (isBlank(this.selectedIndex) ? 0 : parseInt(this.selectedIndex, 10))
  },
  mounted () {
    this.tabbarEle = this.$refs.tabbarElement

    if (this.selectedTabIndex > this.length()) { this.selectedTabIndex = 0 }
  },
  methods: {
    addTab (tab) {
      this.tabs.push(tab)

      return `${this.id}-${++this.ids}`
    },

    selectTab (tabOrIndex) {
      const selectedTab = (typeof tabOrIndex === 'number' ? this.getByIndex(tabOrIndex) : tabOrIndex)
      if (isBlank(selectedTab)) {
        return
      }

      let selectedIndex = this.getTabIndex(selectedTab)

      // If the selected tab is not the current selected tab, we do switch
      if (this.selectedTabIndex !== selectedIndex) {
        const currentTab = this.getByIndex(this.selectedTabIndex)
        currentTab.updateSelected(false)

        this.selectedTabIndex = selectedIndex
        this.$emit('onTabChange', this.selectedTabIndex)
      }
    },

    getByIndex (index) {
      return this.tabs[index]
    },

    getTabIndex (tab) {
      return this.tabs.indexOf(tab)
    },

    /**
       * @return {SwiperItemTab} Returns the currently selected tab
       */
    getSelected () {
      const tabs = this.tabs
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].isSelected) {
          return tabs[i]
        }
      }
      return null
    },

    length () {
      return this.tabs.length
    },

    getTabsLayout () {
      return this.tabsLayout
    },

    getTabsTop () {
      return this._top
    },

    setTabbarPosition (top, bottom) {
      if (this._top !== top || this._bottom !== bottom) {
        var tabbarEle = this.tabbarEle
        tabbarEle.style.top = (top > -1 ? top + 'px' : '')
        tabbarEle.style.bottom = (bottom > -1 ? bottom + 'px' : '')
        tabbarEle.classList.add('show-tabbar')

        this._top = top
        this._bottom = bottom
      }
    }
  }
}
</script>

<style lang="scss">
  @import 'tabs';
  @import 'tabs.ios';
  @import 'tabs.md';
</style>
