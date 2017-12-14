<template>
  <div :class="['ion-list-header item', modeClass]">
    <div class="item-inner">
      <div class="input-wrapper">
        <slot name="item-label"></slot>
        <vm-label ref="label" v-if="noItemLabel">
          <slot></slot>
        </vm-label>
      </div>
      <slot name="item-end"></slot>
    </div>
  </div>
</template>
<script>
import ModeMixins from '../../themes/theme.mixins'
import VmLabel from '../label'

export default {
  name: 'vm-list-header',
  components: { VmLabel },
  mixins: [ModeMixins],

  data () {
    return {
      componentName: 'ionItem'
    }
  },
  computed: {
    noItemLabel: function () {
      return typeof this.$slots['item-label'] === 'undefined'
    }
  },
  mounted () {
    if (this.$slots['item-end']) {
      this.$slots['item-end'].forEach(function (item) {
        item.elm.setAttribute('item-end', '')
      })
    }
  }
}
</script>
