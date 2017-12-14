<template>
  <div class="ion-card-content" :class="[modeClass,colorClass]">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
  import ModeMixins from '../../themes/theme.mixins'

export default {
    name: 'vm-card-content',
    mixins: [ModeMixins],
    created () {
      if (!this.$parent || this.$parent.$options.name !== 'vm-card') {
        console.error('Card-content component must combine with Card')
      }
    }
  }
</script>
