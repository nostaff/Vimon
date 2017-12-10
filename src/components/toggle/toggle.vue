<template>
  <div :class="[themeClass, colorClass, {'toggle-checked':checked, 'toggle-disabled':disabled}]" @click="onToggle()">
    <div class="toggle-icon">
      <div class="toggle-inner"></div>
    </div>
    <ion-button role="checkbox" :disabled="disabled" :checked="checked"></ion-button>
  </div>
</template>

<script>
/**
 * @component Toggle
 * @description
 *
 * ## 表单组件 / Toggle开关组件
 *
 * ### 注意
 *
 * 使用 v-model 切换状态, 不支持checked属性
 *
 * ### 说明
 *
 * Toggle组件和Checkbox组件的功能类似, 但是Toggle组件在移动端更加好看, 也更加易用. Toggle可以设置颜色, 当然不同模式下的样式还是不一样的, 感兴趣的可以切换试试.
 *
 * ### 如何引入
 * ```
 * // 引入
 * import {Toggle} from 'vimon'
 * // 安装
 * Vue.component(Toggle.name, Toggle)
 * // 或者
 * export default{
 *   components: {
 *    Toggle
 *  }
 * }
 * ```
 *
 * @props {String} [mode='ios'] - 模式: "ios", "md"
 * @props {String} [color] - 颜色: "primary", "secondary", "danger", "light", and "dark"
 * @props {Boolean} [disabled=false] - 禁用状态
 *
 * @fires component:Toggle#onChange
 * @demo #/toggle
 * @usage
 * ```
 * <List>
 *    <ListHeader>
 *        普通使用
 *    </ListHeader>
 *    <Item>
 *        Toggle Normal
 *        <Toggle slot="item-right"></Toggle>
 *    </Item>
 *    <Item>
 *        Red Toggle
 *        <Toggle slot="item-right" color="danger"></Toggle>
 *    </Item>
 *    <Item>
 *        Toggle Open
 *        <Toggle slot="item-right"></Toggle>
 *    </Item>
 *    <Item>
 *        Toggle Close
 *        <Toggle slot="item-right"></Toggle>
 *    </Item>
 *    <Item>
 *        Toggle Disabled
 *        <Toggle slot="item-right" v-model="checked"></Toggle>
 *    </Item>
 * </List>
 *```
 */
import ThemeMixins from '../../themes/theme.mixins'
import IonButton from '../button/index'

export default {
  name: 'ion-toggle',
  mixins: [ThemeMixins],
  components: { IonButton },
  inject: {
    itemComponent: {
      from: 'itemComponent',
      default: null
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked: false
    }
  },
  watch: {
    value (val) {
      this.checked = val
    }
  },
  created () {
    if (typeof this.value !== 'undefined') {
      this.checked = this.value
    }
  },
  methods: {
    onToggle () {
      if (this.disabled) return
      this.checked = !this.checked
      this.$emit('input', this.checked)
      this.$emit('onChange', this.checked)
    }
  }
}
</script>

<style lang="scss">
@import "toggle.ios";
@import "toggle.md";
</style>
