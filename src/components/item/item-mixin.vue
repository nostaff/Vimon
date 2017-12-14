<template>
  <div class="ion-item" :class="[itemClass, itemTypeClass, colorClass]" @click="clickHandler($event)">
    <slot name="item-start"></slot>
    <div class="item-inner">
      <div class="input-wrapper">
        <slot></slot>
      </div>
      <slot name="item-end">
        <template v-if="hasReorder"></slot>
      </slot>
    </div>
  </div>
</template>

<script type="text/javascript">
import ModeMixins from '../../themes/theme.mixins'
import VmReorder from '../item-reorder'
import VmLabel from '../label'

export default {
  mixins: [ModeMixins],
  components: {
    VmLabel,
    VmReorder
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
    itemClass () {
      return `item item-${this.mode}`
    },
    itemTypeClass () {
      return `item-block`
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
        item.elm.setAttribute('item-start', '')
      })
    }
    if (this.$slots['item-end']) {
      this.$slots['item-end'].forEach(function (item) {
        item.elm.setAttribute('item-end', '')
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
@import "item-reorder";
</style>
