<template>
  <a class="disable-hover tab-button" @click="onClickHandler" :id="tabId" :aria-selected="isSelected" :class="{
           'has-title':hasTitle,
           'has-icon':hasIcon,
           'has-title-only':hasTitleOnly,
           'icon-only':hasIconOnly,
           'has-badge':hasBadge,
           'tab-disabled':isDisabled,
           'tab-hidden':isHidden,
       }">
    <vm-icon v-if="tabIcon" :name="tabIcon" class="tab-button-icon"></vm-icon>
    <span v-if="tabTitle" class="tab-button-text">{{tabTitle}}</span>
    <vm-badge v-if="tabBadge" class="tab-badge" :color="tabBadgeStyle">{{tabBadge}}</vm-badge>
    <div class="button-effect"></div>
  </a>
</template>

<script type="text/javascript">
import { isTrueProperty, isBlank } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'
import VmIcon from '../icon'
import VmBadge from '../badge'

export default {
  name: 'vm-tab',
  mixins: [ModeMixins],
  inject: {
    tabsComponent: {
      from: 'tabsComponent',
      default () {
        console.error('[Component] Tab组件 需要与 Tabs组件 组合使用!')
        return null
      }
    }
  },
  components: {
    VmIcon,
    VmBadge
  },
  props: {
    tabUrlPath: String,
    tabTitle: String,
    tabIcon: String,
    tabBadge: String,
    tabBadgeStyle: {
      type: String,
      default: 'default'
    },
    hidden: {
      type: [Boolean, String],
      default: false
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    selected: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      index: '',
      layout: '',

      isHidden: isTrueProperty(this.hidden),
      isDisabled: isTrueProperty(this.disabled),
      isSelected: isTrueProperty(this.selected)
    }
  },
  computed: {
    tabId () {
      return `tabId-${this.index}`
    },
    hasTitle () {
      return !!this.tabTitle
    },
    hasIcon () {
      return !!this.tabIcon && this.layout !== 'icon-hide'
    },
    hasTitleOnly () {
      return this.tabTitle && !this.tabIcon
    },
    hasIconOnly () {
      return this.tabIcon && !this.tabTitle
    },
    hasBadge () {
      return !!this.tabBadge
    }
  },
  created () {
    this.index = this.tabsComponent.addTab(this)

    this.layout = this.tabsComponent.getTabsLayout()
  },
  mounted () {
    this.isSelected = !isBlank(this.tabUrlPath) && this.tabUrlPath === this.$route.path
    if (this.isSelected) {
      this.tabsComponent.selectTab(this)
    }
  },
  methods: {
    onClickHandler () {
      if (!this.isDisabled && !this.isSelected) {
        this.isSelected = true
        this.tabsComponent.selectTab(this)
        if (!isBlank(this.tabUrlPath)) {
          this.$router.replace({ path: this.tabUrlPath })
        }
      }
    },
    updateSelected (selected) {
      this.isSelected = selected
    }
  }
}
</script>
