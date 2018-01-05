<template>
  <div class="ion-item-options" :side="side">
    <slot></slot>
  </div>
</template>
<script>
import ModeMixins from '../../themes/theme.mixins'
export default {
  name: 'vm-item-options',
  mixins: [ModeMixins],
  inject: {
    itemSlidingComponent: {
      from: 'itemSlidingComponent',
      default: null
    }
  },
  props: {
    side: {
      type: String,
      default: 'right',
      validator (value) {
        return ['left', 'right'].indexOf(value) > -1
      }
    }
  },
  methods: {
    width () {
      return this.$el.offsetWidth
    }
  }
}
</script>
