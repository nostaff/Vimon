<template>
  <div class="ion-title" :class="[modeClass, colorClass]">
    <div class="toolbar-title" :class="['toolbar-title-'+mode]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ModeMixins from '../../themes/theme.mixins'
export default {
  name: 'vm-title',
  mixins: [ModeMixins],
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
