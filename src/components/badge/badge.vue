<template>
    <span class="ion-badge" :class="[modeClass, colorClass]">
        <slot></slot>
    </span>
</template>

<script>
  import ModeMixins from '../../themes/theme.mixins'

  export default {
    name: 'vm-badge',
    mixins: [ModeMixins]
  }
</script>

<style lang="scss">
  @import 'badge';
  @import 'badge.ios';
  @import 'badge.md';
</style>
