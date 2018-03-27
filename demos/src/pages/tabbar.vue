<template>
  <vm-page>

    <!-- Icons on top of text -->
    <vm-tabs selectedIndex="2" color="secondary" tabsLayout="icon-top" @onTabChange="onTabChange" ref="tabs">
      <vm-tab tabTitle="Location" tabIcon="navigate" tabUrlPath="/tabbar/home"></vm-tab>
      <vm-tab tabTitle="Favorites" tabIcon="star" tabBadge="12" tabBadgeColor="dark" tabUrlPath="/tabbar/favor"></vm-tab>
      <vm-tab tabTitle="Radio" tabIcon="musical-notes" tabBadgeDot="true" tabBadgeColor="danger" tabUrlPath="/tabbar/radio"></vm-tab>

      <div slot="tab-content">
        <router-view></router-view>
      </div>

    </vm-tabs>

  </vm-page>
</template>

<script type="text/javascript">
import { Tabs, Tab } from 'vimon'
export default {
  components: {
    'vm-tabs': Tabs,
    'vm-tab': Tab
  },
  data () {
    return {
      tabsCom: null
    }
  },
  mounted () {
    this.tabsCom = this.$refs.tabs

    console.log(this.tabsCom)
  },
  methods: {
    onTabChange (index) {
      console.log('onTabChange to ', index)
    },

    selectTab (index) {
      this.tabsCom.selectTab(index)
    }
  }
}
</script>
