<template>
  <div class="ion-bar-buttons" :class="[modeClass]">
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
import ModeMixins from '../../themes/theme.mixins'
export default {
  name: 'vm-bar-buttons',
  mixins: [ModeMixins],
  data () {
    return {
      roleName: 'bar-buttons'
    }
  }
}
</script>
