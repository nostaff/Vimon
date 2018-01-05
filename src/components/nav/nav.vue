<template>
    <div class="ion-nav"
         :class="[
           menuContentClass,
           menuContentTypeClass,
           menuContentSideClass,
           {'menu-content-open':isMenuOpen}]">
        <div v-if="isMenuOpen" @click="tapToCloseMenu" @touchmove="stopActive($event)" class="click-cover"></div>
        <div nav-viewport></div>
        <!--animate-->
        <transition :name="pageTransitionName">
            <slot></slot>
        </transition>
        <div class="nav-decor"></div>
    </div>
</template>

<script type="text/javascript">
export default {
  name: 'vm-nav',
  props: {
    // 转场动画名称
    // ios-transition/fade-bottom-transition/zoom-transition/fade-right-transition/fade-transition
    pageTransition: {
      type: String,
      default () { return this.$config && this.$config.get('pageTransition') }
    },
    // 转场是否开启Indicator
    showIndicatorWhenPageChange: {
      type: Boolean,
      default () { return this.$config && this.$config.getBoolean('showIndicatorWhenPageChange') }
    }
  },
  data () {
    return {
      // ----------- Nav -----------
      pageTransitionName: null,
      IndicatorComponent: null,

      // ----------- Menu -----------
      isMenuOpen: false, // ion-menu开启
      menuId: null, // menuId
      menuType: '', // overlay/reveal  这里只处理 reveal
      menuSide: 'left', // 方向
      menuContentClass: null,
      menuContentTypeClass: null,
      menuContentSideClass: null
    }
  },
  created () {
    this.initNav()

    this.initMenu()
  },
  methods: {
    /**
     * 初始化导航
     * @private
     */
    initNav () {
      if (!this.$router) return
      // nav 动画切换部分
      const vm = this
      this.$router.beforeEach((to, from, next) => {
        vm.pageTransitionName = `${vm.pageTransition}-${vm.$history.getDirection()}`
        vm.$app && vm.$app.setEnabled(false, 500)

        next()
      })

      // 页面切换显示Indicator
      if (this.showIndicatorWhenPageChange) {
        import('../indicator').then((component) => {
          this.IndicatorComponent = component.default
          this.$router.beforeEach((to, from, next) => {
            if (vm.$history.getDirection() === 'forward') {
              this.IndicatorComponent.present()
            }
            next()
          })
          this.$router.afterEach(() => {
            if (vm.$history.getDirection() === 'forward') {
              this.IndicatorComponent.dismiss()
            }
          })
        })
      }
    },

    // ----------- Menu -----------
    /**
     * 初始化menu组件对应的监听处理
     * @private
     */
    initMenu () {
      // 监听menu的组件事件
      this.$events.$on('onMenuOpen', (menuId) => {
        this.setMenuInfo(menuId)
        this.isMenuOpen = true
      })
      this.$events.$on('onMenuClosing', () => {
        this.isMenuOpen = false
      })
      this.$events.$on('onMenuClosed', () => {
        this.menuContentTypeClass = null
      })
    },

    tapToCloseMenu () {
      this.isMenuOpen && this.$menu.close()
    },

    stopActive ($event) {
      if (this.isMenuOpen) {
        $event.preventDefault()
        $event.stopPropagation()
      }
    },

    setMenuInfo (menuId) {
      if (menuId) {
        this.menuId = menuId
        this.menuSide = this.$menu.menuIns[menuId].side
        this.menuType = this.$menu.menuIns[menuId].type
        this.menuContentClass = `menu-content`
        this.menuContentTypeClass = `menu-content-${this.menuType}`
        this.menuContentSideClass = `menu-content-${this.menuSide}`
      }
    },

    clearMenuInfo () {
      this.menuId = null
      this.menuSide = 'left'
      this.menuType = ''
      this.menuContentClass = null
      this.menuContentClass = null
      this.menuContentTypeClass = null
      this.menuContentSideClass = null
    }

  }
}
</script>


<<style lang="scss">
.ion-nav {
  .click-cover {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1100;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>

