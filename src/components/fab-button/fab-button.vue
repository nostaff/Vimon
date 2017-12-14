<template>
  <button @click="clickHandler" :class="[modeClass,colorClass]">
    <ion-icon name="close" class="fab-close-icon" v-if="isMainButton"></ion-icon>
    <span class="button-inner">
      <slot></slot>
    </span>
  </button>
</template>
<script type="text/javascript">
import ModeMixins from '../../themes/theme.mixins'
import IonIcon from '../icon/icon'

export default {
  name: 'ion-fab-button',
  mixins: [ModeMixins],
  components: {
    IonIcon
  },
  inject: {
    fabComponent: {
      from: 'fabComponent',
      default () {
        if (process.env.NODE_ENV !== 'production') {
          console.error('[Component] FabButton组件 需要与 Fab组件 组合使用!')
        }
        return null
      }
    },
    fabListComponent: {
      from: 'fabListComponent',
      default: null
    }
  },
  data () {
    return {
      roleName: 'fab'
    }
  },
  computed: {
    isMainButton () {
      return !this.fabListComponent && !!this.fabComponent
    }
  },
  created () {
    if (!this.isMainButton) {
      this.fabListComponent && this.fabListComponent.setFabButton(this)
    } else {
      this.fabComponent.mainButton = this
    }
  },

  methods: {
    /**
       * 按钮点击处理函数, 如果是主button, 则Fab组件改写此方法
       * @private
       **/
    clickHandler () {
      this.$emit('click', this.fabComponent)
      this.isMainButton && this.fabComponent.toggleClicked()
    },

    /**
       * @hidden
       */
    setActiveClose (closeVisible) {
      this.setElementClass('fab-close-active', closeVisible)
    }
  }
}
</script>
