<template>
  <div class="ion-card-title" :class="[modeClass,colorClass]">
    <slot></slot>
  </div>
</template>
<script>
  import ModeMixins from '../../themes/theme.mixins'

export default {
    name: 'ion-card-title',
    mixins: [ModeMixins],
    created () {
      if (!this.$parent || this.$parent.$options.name !== 'ion-card') {
        console.error('Card-title component must combine with Card')
      }
    }
  }
</script>
