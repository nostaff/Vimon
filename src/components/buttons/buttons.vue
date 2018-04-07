<template>
  <div class="ion-buttons" :class="[modeClass]">
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
import ModeMixins from '../../themes/theme.mixins'
export default {
  name: 'vm-buttons',
  mixins: [ModeMixins],
  data () {
    return {
      roleName: 'buttons'
    }
  }
}
</script>
