<template>
  <div class="ion-card-header" :class="[modeClass,colorClass]">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
import ModeMixins from '../../themes/theme.mixins'

export default {
  name: 'vm-card-header',
  mixins: [ModeMixins],
  inject: {
    cardComponent: {
      from: 'cardComponent',
      default () {
        if (process.env.NODE_ENV !== 'production') {
          console.error('[Component] CardContent组件 需要与 Card组件 组合使用!')
        }
        return null
      }
    }
  }
}
</script>
