<template>
  <div class="ion-chip" :class="[themeClass, colorClass]">
    <slot></slot>
  </div>
</template>

<script>
import ThemeMixins from '../../themes/theme.mixins'
export default {
  name: 'ion-chip',
  mixins: [ThemeMixins]
}
</script>

<style lang="scss">
@import "chip";
@import "chip.ios";
@import "chip.md";
</style>
