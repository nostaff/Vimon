<template>
  <div class="ion-card-header" :class="[themeClass,colorClass]">
    <slot></slot>
  </div>
</template>
<script>
  import ThemeMixins from '../../themes/theme.mixins'

export default {
    name: 'ion-card-header',
    mixins: [ThemeMixins],
    created () {
      if (!this.$parent || this.$parent.$options.name !== 'ion-card') {
        console.error('Card-header component must combine with Card')
      }
    }
  }
</script>
