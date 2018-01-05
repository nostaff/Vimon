<template>
  <vm-page>

    <!-- Icons on top of text -->
    <vm-tabs selectedIndex="2" color="secondary" tabsLayout="icon-top" @onTabChange="onTabChange" ref="tabs">
      <vm-tab tabTitle="Location" tabIcon="navigate" tabUrlPath="/tabbar/home"></vm-tab>
      <vm-tab tabTitle="Favorites" tabIcon="star" tabBadge="12" tabBadgeStyle="dark" tabUrlPath="/tabbar/favor"></vm-tab>
      <vm-tab tabTitle="Radio" tabIcon="musical-notes" tabUrlPath="/tabbar/radio"></vm-tab>

      <div slot="tab-content">
        <router-view></router-view>
      </div>

    </vm-tabs>

  </vm-page>
</template>

<script>
export default {
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

