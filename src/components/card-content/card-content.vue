<template>
  <div class="ion-card-content" :class="[themeClass,colorClass]">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
  import ThemeMixins from '../../themes/theme.mixins'

export default {
    name: 'ion-card-content',
    mixins: [ThemeMixins],
    created () {
      if (!this.$parent || this.$parent.$options.name !== 'ion-card') {
        console.error('Card-content component must combine with Card')
      }
    }
  }
</script>
