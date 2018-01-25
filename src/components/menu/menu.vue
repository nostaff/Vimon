<template>
  <div class="ion-menu" role="navigation" :id="id" :type="type" :side="side" :class="{'show-menu':showMenu}">
    <vm-backdrop
        @click="bdClick"
        :isActive="showBackdrop"
        :class="{'show-backdrop':showBackdrop}"></vm-backdrop>
    <transition
        :name="animationName"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave">
      <div class="menu-inner" v-if="isOpen">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script type="text/javascript">
import { isTrueProperty, firstUpperCase } from '../../util/util'
import { focusOutActiveElement } from '../../util/dom'
import recordMenuInstance from './record-menu-instance'
import VmBackdrop from '../backdrop'

const NOOP = () => {}

export default {
  name: 'vm-menu',
  components: { VmBackdrop },
  data () {
    return {
      isEnabled: isTrueProperty(this.enabled),
      isOpen: false, // menu-inner 动画控制
      showMenu: false, // 整体menu显示控制
      showBackdrop: false, // 是否显示半灰色蒙层
      animationName: '', // 过度动画名称

      // promise
      presentCallback: NOOP,
      dismissCallback: NOOP
    }
  },
  props: {
    /**
     * 当前menu的id
     */
    id: String,
    /**
     * menu从哪个位置出来, left/right
     * 默认:"left"
     */
    side: {
      type: String,
      default: 'left',
      validator (val) {
        return ['left', 'right'].indexOf(val) > -1
      }
    },
    /**
     * menu打开的类型: overlay/reveal/push
     */
    type: {
      type: String,
      default () {
        return this.$config && this.$config.get('menuType', 'overlay')
      },
      validator (val) {
        return ['overlay', 'reveal'].indexOf(val) > -1
      }
    },
    /**
     * 是否禁用menu
     */
    enabled: {
      type: [Boolean, String],
      default: true
    }
  },
  created () {
    // 记录当前实例
    recordMenuInstance(this)
  },
  methods: {
    beforeEnter () {
      this.$events && this.$events.$emit('onMenuOpen', this.id)
      this.showMenu = true
      this.$app && this.$app.setEnabled(false, 300)
      focusOutActiveElement()
    },
    afterEnter () {
      this.presentCallback()
    },
    beforeLeave () {
      this.$events && this.$events.$emit('onMenuClosing', this.id)
      this.$app && this.$app.setEnabled(false, 300)
      focusOutActiveElement()
    },
    afterLeave () {
      this.$events && this.$events.$emit('onMenuClosed', this.id)
      this.dismissCallback()
      this.showMenu = false
    },

    /**
     * open
     * @return {Promise}
     */
    openMenu () {
      if (!this.isEnabled) {
        this.presentCallback()
      } else {
        this.showMenu = true
        if (this.type === 'overlay') {
          this.showBackdrop = true
          // 确定左右动画
          this.animationName = 'slideIn' + firstUpperCase(this.side)
        }

        if (this.type === 'push') {
          // this.showBackdrop = true;
          // 确定左右动画
          this.animationName = 'slideIn' + firstUpperCase(this.side)
        }

        this.isOpen = true
        this.$events && this.$events.$emit('onMenuOpen', this.id)
      }
      return new Promise(resolve => {
        this.presentCallback = resolve
      })
    },

    /**
     * close
     * @return {Promise}
     */
    closeMenu () {
      if (!this.isEnabled) {
        this.dismissCallback()
      } else {
        this.showBackdrop = false
        this.isOpen = false
        this.$events && this.$events.$emit('onMenuClosing', this.id)
      }
      return new Promise(resolve => {
        this.dismissCallback = resolve
      })
    },

    bdClick () {
      this.$menu.close()
    }
  }
}
</script>

<style lang="scss">
@import "menu";
@import "menu.ios";
@import "menu.md";

/*slideInLeft*/
/*animate class*/
.slideInLeft-enter-active,
.slideInLeft-leave-active {
  transform: translateX(0);
}

.slideInLeft-enter,
.slideInLeft-leave-active {
  transform: translateX(-100%);
  transition: all cubic-bezier(0.2, 0, 1, 1) 280ms;
}

/*slideInRight*/
/*animate class*/
.slideInRight-enter-active,
.slideInRight-leave-active {
  transform: translateX(0);
}

.slideInRight-enter,
.slideInRight-leave-active {
  transform: translateX(100%);
  transition: all cubic-bezier(0, 0, 1, 1) 280ms;
}
</style>
