<template>
  <div class="ion-label"
      :class="[modeClass, colorClass]"
      :fixed="fixed"
      :floating="floating"
      :stacked="stacked"
      v-if="viewLabel">
    <slot></slot>
  </div>
</template>

<script>
/**
 * @component Label
 * @description
 *
 * ## 表单组件 / Label组件
 *
 * ### 说明
 *
 * Label组件主要是放在Item组件中使用, 用于标记Input组件/Toggle组件/Checkbox组件等Form组件. Label的四种类型可展示不同的Label样式: inline(默认)/fixed/floating/stacked.
 * 当label内容为空时，将不显示自身HTML。
 *
 * ### 使用场景
 *
 * input组件/Item包裹content部分等.
 *
 * @props {String} mode - 模式
 * @props {String} color - 颜色
 * @props {Boolean} fixed - 固定在input旁边
 * @props {Boolean} floating - 浮动在input上面, 点击input时浮动到上面
 * @props {Boolean} stacked - 永远在input的上面
 *
 * @slot 空 - 可以嵌入任何结构
 * @see component:Item
 * @see component:Input
 * @demo #/input-normal
 */
import ModeMixins from '../../themes/theme.mixins'
export default {
  name: 'ion-label',
  mixins: [ModeMixins],
  inject: {
    itemComponent: {
      from: 'itemComponent',
      default: null
    }
  },
  data () {
    return {
      viewLabel: true
    }
  },
  props: {
    // label格式
    fixed: Boolean,
    floating: Boolean,
    stacked: Boolean
  },
  created () {
    // 如果slot 没有值 则隐藏该label 不管任何label 的是
    if (typeof (this.$slots.default) === 'undefined') {
      this.viewLabel = false
    }
  },
  mounted () {
    if (this.itemComponent) {
      this.itemComponent.setElementClass('item-label-fixed', this.fixed)
      this.itemComponent.setElementClass('item-label-floating', this.floating)
      this.itemComponent.setElementClass('item-label-stacked', this.stacked)
      this.itemComponent.labelComponent = this
    }
  },
  methods: {
    hasAttribute (name) {
      console.log(this.$el)
      return this.$el.hasAttribute(name)
    }
  }
}
</script>

<style lang="scss">
  @import 'label';
  @import 'label.ios';
  @import 'label.md';
</style>
