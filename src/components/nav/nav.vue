<template>
    <div class="ion-nav"
         :class="[
           menuContentClass,
           {'menu-content-open':isMenuOpen}]">
        <div v-if="isMenuOpen" @click="tapToCloseMenu" @touchmove="stopActive($event)" class="click-cover"></div>
        <div nav-viewport></div>
        <transition :name="pageTransition">
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
    // fade-bottom-transition/zoom-transition/fade-right-transition/fade-transition
    pageTransition: {
      type: String,
      default () {
        return this.$config && this.$config.get('pageTransition') || 'fade-transition'
      }
    },
    // 转场是否开启Indicator
    showIndicatorWhenPageChange: {
      type: Boolean,
      default () {
        return this.$config && this.$config.getBoolean('showIndicatorWhenPageChange') || false
      }
    }
  },
  data () {
    return {
      isMenuOpen: false, // ion-menu开启
      menuId: null, // menuId
      menuType: '', // overlay/reveal  这里只处理 reveal
      menuSide: 'left', // 方向
      menuContentClass: null
    }
  },
  created () {
    if (!this.$router) return

    // 页面切换显示Indicator
    const vm = this
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

    // 监听menu的组件事件
    this.$events.$on('onMenuOpen', (menuId) => {
      this.setMenuInfo(menuId)
      this.isMenuOpen = true
    })
    this.$events.$on('onMenuClosing', () => {
      this.isMenuOpen = false
    })
    this.$events.$on('onMenuClosed', () => {
      // this.menuContentTypeClass = null
    })
  },
  methods: {
    init () {
      if (!this.$router) return
      const vm = this

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
        this.menuContentClass = `menu-content menu-content-${this.menuType} menu-content-${this.menuSide}`
      }
    }
  }
}
</script>

<style lang="scss">
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

