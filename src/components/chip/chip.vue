<template>
  <div class="ion-chip" :class="[modeClass, colorClass]">
    <slot></slot>
  </div>
</template>

<script>
import ModeMixins from '../../themes/theme.mixins'
export default {
  name: 'vm-chip',
  mixins: [ModeMixins]
}
</script>

<style lang="scss">
@import "chip";
@import "chip.ios";
@import "chip.md";
</style>
