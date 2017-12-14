<template>
  <div class="ion-item" :class="[itemClass, itemTypeClass, colorClass]" @click="clickHandler($event)">
    <!--以下组件显示在此处：[item-start],ion-checkbox:not([item-end])-->
    <slot name="item-start"></slot>
    <div class="item-inner">
      <div class="input-wrapper">
        <slot></slot>
      </div>
      <!--以下组件显示在此处：[item-end],ion-radio,ion-toggle-->
      <slot name="item-end">
        <ion-reorder v-if="hasReorder"></ion-reorder>
      </slot>
    </div>
  </div>
</template>

<script type="text/javascript">
import ModeMixins from '../../themes/theme.mixins'
export default {
  mixins: [ModeMixins],
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
