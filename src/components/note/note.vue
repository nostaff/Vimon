<template>
  <span class="ion-note" :class="[modeClass]">
    <slot></slot>
  </span>
</template>

<script>
import ModeMixins from '../../themes/theme.mixins'

export default {
  name: 'vm-note',
  mixins: [ModeMixins]
}
</script>

<style lang="scss">
@import "note.ios";
@import "note.md";
</style>
