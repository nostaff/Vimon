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
    <div tab-portal></div>
  </div>
</template>

<script type="text/javascript">
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

      top: 0,
      bottom: 0,

      selectedTabIndex: -1
    }
  },
  created () {
    this.id = 't-' + (++tabIds)

    this.selectedTabIndex = (isBlank(this.selectedIndex) ? 0 : parseInt(this.selectedIndex, 10))
  },
  mounted () {
    this.tabbarEle = this.$refs.tabbarElement

    if (this.$slots['tab-content']) {
      this.$slots['tab-content'].forEach(function (item) {
        item.elm && item.elm.classList.add('ion-tab')
      })
      this.$slots['tab-content'][0].elm.classList.add('show-tab')
    }

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
      return this.top
    },

    setTabbarPosition (top, bottom) {
      if (this.top !== top || this.bottom !== bottom) {
        this.top = top
        this.bottom = bottom

        this.$nextTick(() => {
          var tabbarEle = this.tabbarEle
          tabbarEle.style.top = (top > -1 ? top + 'px' : '')
          tabbarEle.style.bottom = (bottom > -1 ? bottom + 'px' : '')
          tabbarEle.classList.add('show-tabbar')
        })
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
