<template>
  <div class="ion-card" :class="[modeClass, colorClass]">
    <slot></slot>
  </div>
</template>
<script>
  import ModeMixins from '../../themes/theme.mixins'

  export default {
    name: 'ion-card',
    mixins: [ModeMixins]
  }
</script>

<style lang="scss">
  @import './card';
  @import './card.ios';
  @import './card.md';
</style>
