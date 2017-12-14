<template>
  <div class="ion-card-header" :class="[modeClass,colorClass]">
    <slot></slot>
  </div>
</template>
<script>
  import ModeMixins from '../../themes/theme.mixins'

export default {
    name: 'ion-card-header',
    mixins: [ModeMixins],
    created () {
      if (!this.$parent || this.$parent.$options.name !== 'ion-card') {
        console.error('Card-header component must combine with Card')
      }
    }
  }
</script>
