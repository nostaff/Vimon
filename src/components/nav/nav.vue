<template>
    <div class="ion-nav">
        <div nav-viewport></div>
        <!--animate-->
        <transition :name="pageTransitionName" v-on:before-enter="beforePageEnter">
            <slot></slot>
        </transition>
        <div class="nav-decor"></div>
    </div>
</template>

<script type="text/javascript">
export default {
  name: 'ion-nav',
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
      pageTransitionName: null,
      IndicatorComponent: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    /**
       * 初始化导航
       * @private
       * */
    init () {
      if (!this.$router) return
      // nav 动画切换部分
      const vm = this
      this.$router.beforeEach((to, from, next) => {
        console.log(vm.$history.getDirection())

        vm.pageTransitionName = `${vm.pageTransition}-${vm.$history.getDirection()}`
        vm.$app && vm.$app.setEnabled(false, 500)
        next()
      })

      // 页面切换显示Indicator
      if (this.showIndicatorWhenPageChange) {
        // import('../../services/indicator').then((component) => {
        //   this.IndicatorComponent = component.default
        //   this.$router.beforeEach((to, from, next) => {
        //     if (vm.$history.getDirection() === 'forward') {
        //       this.IndicatorComponent.present()
        //     }
        //     next()
        //   })
        //   this.$router.afterEach(() => {
        //     if (vm.$history.getDirection() === 'forward') {
        //       this.IndicatorComponent.dismiss()
        //     }
        //   })
        // })
      }
    },
    beforePageEnter (el) {
      // console.log('beforePageEnter time:', +new Date())
    }
  }
}
</script>
