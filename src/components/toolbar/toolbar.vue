<template>
  <div class="ion-toolbar" :class="[modeClass, colorClass]">
    <div ref="toolbarBackground" class="toolbar-background" :class="['toolbar-background-'+mode]"></div>
    <slot name="buttons"></slot>
    <div class="toolbar-content" :class="['toolbar-content-'+mode]">
      <slot></slot>
    </div>
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
  },
  inject: {
    navbarComponent: {
      from: 'navbarComponent',
      default: null
    }
  },
  mounted () {
    if (this.navbarComponent) {
      this.navbarComponent.toolbarBackgroundColor = window.getComputedStyle(this.$refs.toolbarBackground).backgroundColor
    }
  }
}
</script>

<style lang="scss">
@import "toolbar-buttons";
@import "toolbar";
@import "toolbar.ios";
@import "toolbar.md";
</style>
