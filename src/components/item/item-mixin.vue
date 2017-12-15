<template>
  <div class="ion-item" :class="[itemTypeClass, colorClass]" @click="clickHandler($event)">
    <slot name="item-start"></slot>
    <div class="item-inner">
      <div class="input-wrapper">
        <slot></slot>
      </div>
      <slot name="item-end">
        <vm-item-reorder v-if="hasReorder"></vm-item-reorder>
      </slot>
    </div>
  </div>
</template>

<script>
import ModeMixins from '../../themes/theme.mixins'
import VmItemReorder from '../item-reorder'
import VmLabel from '../label'

export default {
  mixins: [ModeMixins],
  components: {
    VmLabel,
    VmItemReorder
  },
  provide () {
    const _this = this
    return {
      itemComponent: _this
    }
  },
  data () {
    return {
      hasReorder: false
    }
  },
  computed: {
    itemTypeClass () {
      return `item item-${this.mode} item-block`
    }
  },
  methods: {
    clickHandler ($event) {
      this.$emit('click', $event)
    }
  },
  mounted () {
    // 为slot="item-start"/slot="item-end"的沟槽设定属性
    if (this.$slots['item-start']) {
      this.$slots['item-start'].forEach(function (item) {
        item.elm && item.elm.setAttribute('item-start', '')
      })
    }
    if (this.$slots['item-end']) {
      this.$slots['item-end'].forEach(function (item) {
        item.elm && item.elm.setAttribute('item-end', '')
      })
    }
  }
}
</script>

<style lang="scss">
@import "item";
@import "item.ios";
@import "item.md";
@import "item-media";
</style>
