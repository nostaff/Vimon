<template>
  <div class="ion-fab-list" :side="side">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
import { isTrueProperty } from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'

export default {
  name: 'vm-fab-list',
  mixins: [ModeMixins],
  inject: {
    fabComponent: {
      from: 'fabComponent',
      default () {
        if (process.env.NODE_ENV !== 'production') {
          console.error('[Component] FabList组件 需要与 Fab组件 组合使用!')
        }
        return null
      }
    }
  },
  provide () {
    let _this = this
    return {
      fabListComponent: _this
    }
  },
  data () {
    return {
      fabButtons: [],
      visible: false
    }
  },
  props: {
    side: {
      type: String,
      default: 'bottom',
      validator (val) {
        return ['top', 'bottom', 'left', 'right'].indexOf(val) > -1
      }
    }
  },
  created () {
    this.fabComponent && this.fabComponent.fabLists.push(this)
  },

  methods: {
    setFabButton (fab) {
      this.fabButtons.push(fab)

      setTimeout(() => {
        const className = `fab-${this.mode}-in-list`
        this.fabButtons.forEach(fab => {
          fab.setElementClass('fab-in-list', true)
          fab.setElementClass(className, true)
        })
      }, 0)
    },

    setVisible (val) {
      let visible = isTrueProperty(val)
      if (visible === this.visible) {
        return
      }
      this.visible = visible

      let fabButtons = this.fabButtons
      if (visible) {
        fabButtons.forEach((fab, index) => {
          setTimeout(() => fab.setElementClass('show', true), (index + 1) * 30)
        })
      } else {
        fabButtons.forEach(fab => fab.setElementClass('show', false))
      }

      this.setElementClass('fab-list-active', visible)
    }
  }
}
</script>

<style lang="scss">
  @import 'fab-list';
</style>