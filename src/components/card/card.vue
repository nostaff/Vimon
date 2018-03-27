<template>
  <div class="ion-card" :class="[modeClass, colorClass]">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
  import ModeMixins from '../../themes/theme.mixins'

  export default {
    name: 'vm-card',
    mixins: [ModeMixins],
    provide () {
      let _this = this
      return {
        cardComponent: _this
      }
    }
  }
</script>

<style lang="scss">
  @import './card';
  @import './card.ios';
  @import './card.md';
</style>
