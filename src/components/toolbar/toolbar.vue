<template>
  <div class="ion-toolbar" :class="[modeClass, colorClass]">
    <div class="toolbar-background" :class="['toolbar-background-'+mode]"></div>
    <slot name="item-start"></slot>
    <slot name="item-end"></slot>
    <div class="toolbar-content" :class="['toolbar-content-'+mode]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ModeMixins from '../../themes/theme.mixins'
export default {
  name: 'ion-toolbar',
  mixins: [ModeMixins],
  provide () {
    const _this = this
    return {
      toolbarComponent: _this
    }
  },
  data () {
    return {
      componentName: 'ionToolbar',
      roleName: 'toolbar'
    }
  },
  mounted () {
    if (this.$slots['item-start']) {
      this.$slots['item-start'].forEach(function (item) {
        item.elm.setAttribute('start', '')
      })
    }
    if (this.$slots['item-end']) {
      this.$slots['item-end'].forEach(function (item) {
        item.elm.setAttribute('end', '')
      })
    }
  }
}
</script>

<style lang="scss">
@import "toolbar";
@import "toolbar.ios";
@import "toolbar.md";
</style>
