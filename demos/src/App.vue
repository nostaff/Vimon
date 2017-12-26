<template>
  <vm-app>
    <vm-menu id="menu" :side="menu.side" :type="menu.type">
      <vm-list>
        <vm-list-header>
          <span>Start</span>
        </vm-list-header>
        <vm-item detail-push :to="{name: 'introduce'}" wait>
          <vm-icon slot="item-left" name="apps"></vm-icon>
          <span>Introduction</span>
        </vm-item>
        <vm-item detail-push :to="{name: 'config'}" wait>
          <vm-icon slot="item-left" name="settings"></vm-icon>
          <span>Config</span>
        </vm-item>
        <vm-item detail-push :to="{name: 'platform'}" wait>
          <vm-icon slot="item-left" md="logo-android" ios="logo-apple"></vm-icon>
          <span>Platfrom</span>
        </vm-item>
        <vm-item detail-push :to="{name: 'crossPlatform'}" wait>
          <vm-icon slot="item-left" name="logo-javascript"></vm-icon>
          <span>Cross Platorm</span>
        </vm-item>
      </vm-list>
      <vm-list>
        <vm-list-header>
          <span>Main</span>
        </vm-list-header>
        <vm-item detail-push :to="{name: 'components'}" wait>
          <vm-icon slot="item-left" name="logo-rss"></vm-icon>
          <span>Components</span>
        </vm-item>
      </vm-list>
    </vm-menu>

    <vm-nav>
      <router-view></router-view>
    </vm-nav>
  </vm-app>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
export default {
  name: 'app-root',
  computed: {
    ...mapState(['menu'])
  },
  mounted () {
    this.$platform.onNetworkChange(type => {
      alert(`网路状况发生变化, 当前状态: ${type}, 即将立即推出App!`)
      this.$platform.exitApp()
    })
  }
}
</script>
