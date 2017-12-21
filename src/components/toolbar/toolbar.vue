<template>
  <div class="ion-toolbar" :class="[modeClass, colorClass]">
    <div class="toolbar-background" :class="['toolbar-background-'+mode]"></div>
    <div class="toolbar-content" :class="['toolbar-content-'+mode]">
      <slot></slot>
    </div>
    <slot name="buttons"></slot>
  </div>
</template>

<script>
import ModeMixins from '../../themes/theme.mixins'
export default {
  name: 'vm-toolbar',
  mixins: [ModeMixins],
  provide () {
    const _this = this
    return {
      toolbarComponent: _this
    }
  }
}
</script>

<style lang="scss">
@import "toolbar";
@import "toolbar.ios";
@import "toolbar.md";
</style>
