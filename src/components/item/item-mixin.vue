<template>
  <div class="ion-item" :class="[itemTypeClass, colorClass]" @click="clickHandler">
    <slot name="item-start"></slot>
    <div class="item-inner">
      <div class="input-wrapper">
        <slot>
          <vm-label v-if="title">
            {{title}}
            <p v-if="label">{{label}}</p>
          </vm-label>
        </slot>
      </div>
      <slot name="item-end">
        <vm-note v-if="value" item-end>{{value}}</vm-note>
        <vm-item-reorder v-if="hasReorder"></vm-item-reorder>
      </slot>
    </div>
  </div>
</template>

<script type="text/javascript">
import ModeMixins from '../../themes/theme.mixins'
import VmItemReorder from './item-reorder'
import VmLabel from '../label'
import VmNote from '../note'

export default {
  mixins: [ModeMixins],
  components: {
    VmItemReorder,
    VmLabel,
    VmNote
  },
  provide () {
    const _this = this
    return {
      itemComponent: _this
    }
  },
  props: {
    /**
     * 左侧标题
     */
    title: String,

    /**
     * 右侧内容
     */
    value: String,

    /**
     * 标题下方的描述
     */
    label: String
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
    clickHandler (ev) {
      console.log('dadada')
      this.setElementClass('activated')
      setTimeout(() => {
        this.setElementClass('activated', false)
      }, 88)

      this.$emit('click', ev)
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
