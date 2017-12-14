<template>
  <div class="ion-title" :class="[themeClass, colorClass]">
    <div class="toolbar-title" :class="['toolbar-title-'+theme]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ThemeMixins from '../../themes/theme.mixins'
export default {
  name: 'ion-title',
  mixins: [ThemeMixins],
  inject: {
    appComponent: {
      from: 'appComponent',
      default: null
    },
    headerComponent: {
      from: 'headerComponent',
      default: null
    },
    toolbarComponent: {
      from: 'toolbarComponent',
      default: null
    }
  }
}
</script>
