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
    <ion-icon v-if="tabIcon" :name="tabIcon" class="tab-button-icon"></ion-icon>
    <span v-if="tabTitle" class="tab-button-text">{{tabTitle}}</span>
    <ion-badge v-if="tabBadge" class="tab-badge" :color="tabBadgeStyle">{{tabBadge}}</ion-badge>
    <div class="button-effect"></div>
  </a>
</template>

<script type="text/javascript">
import { isTrueProperty, isBlank } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'
import IonIcon from '../icon'
import IonBadge from '../badge'

export default {
  name: 'ion-tab',
  mixins: [ModeMixins],
  inject: ['tabsComponent'],
  components: {
    IonIcon,
    IonBadge
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
    enabled: {
      type: [Boolean, String],
      default: true
    },
    selected: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      index: '',
      tabsCmp: null,
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
    if (this.$parent.$data.componentName === 'ionTabs') {
      this.tabsCmp = this.$parent
    } else {
      console.error('Tab component must combine with Tabs')
    }

    this.index = this.tabsCmp.addTab(this)

    this.layout = this.tabsCmp.getTabsLayout()
  },
  mounted () {
    this.isSelected =
      !isBlank(this.tabUrlPath) && this.tabUrlPath === this.$route.path
    if (this.isSelected) {
      this.tabsCmp.selectTab(this)
    }
  },
  methods: {
    onClickHandler (ev) {
      if (!this.isDisabled && !this.isSelected) {
        this.isSelected = true
        this.tabsCmp.selectTab(this)
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
