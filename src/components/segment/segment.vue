<template>
  <div :class="['ion-segment', themeClass, colorClass]">
    <slot></slot>
  </div>
</template>
<script>
/**
 * @component Segment
 * @description
 *
 * ## 小标签 / Segment
 *
 * Segment组件可以说是联动的按钮组合, 他不负责路由, 只是按钮组合而已. 如果涉及路由, 请使用Tab组件, 或者自己集成路由部分.
 *
 * ### 父子组件组合
 *
 * Segment组件和SegmentButton组件是互相组合的模式, 不可分离. 父组件可使用`v-model`指令监听子组件当前的选中状态. 子组件支持异步载入, 当子组件的value没有指定, 则使用当前组件的内置文本作为其value.
 *
 * ### 父子组件通信过程
 *
 * 1. 初始化时, 子组件自己的this传递给父组件, addButton()
 * 2. 子组件点击时, 调用父组件的 refreshButtons 函数, 传递自己的value
 * 3. 父组件得到value触发onChange更新v-modal值, 之后遍历子组件, 触发组件的setChecked, 传递value
 * 4. 子组件根据传入的value设置自己的状态
 *
 * ### 异步加载子组件
 *
 * 父组件通过被动的的方式获取对子组件的控制权, 便于异步动态初始化子组件的情形. 子组件的value是子组件的标示, 当value没有值时, 通过SegmentButton组件中的text内容获取唯一标示.
 *
 * ### 支持`v-model`指令
 *
 * 如果不使用`v-model`指令, 通过`value`属性可设置初始选中状态, 但是使用了`v-model`指令时, 动态改变value将不会触发`onChange事件`, 因为事件的触发原则是组件内部变动通知外部, 但是外部改变value不是内部行为, 这点切记.
 *
 *
 * ### 如何使用
 *
 * ```
 * // 引入
 * import { Segment, SegmentButton } from 'vimo/lib/segment'
 * // 安装
 * Vue.component(Segment.name, Segment)
 * Vue.component(SegmentButton.name, SegmentButton)
 * ```
 *
 * @props {String} color - 颜色
 * @props {String} mode - 样式模式
 * @props {String} value - 当前Segment的value, 用于触发制定value的子组件
 *
 * @fires component:Segment#onChange
 * @demo #/segment
 *
 * @usage
 * <Header>
 *    <Navbar>
 *        <Title>普通用法</Title>
 *    </Navbar>
 *    <Toolbar>
 *        <!--content-->
 *        <Segment v-model="fruit" @onChange="onChangeHandler">
 *            <SegmentButton value="apple" @onSelect="onSelectHandler">Apple</SegmentButton>
 *            <SegmentButton value="orange" @onSelect="onSelectHandler">Orange</SegmentButton>
 *            <SegmentButton value="pear" @onSelect="onSelectHandler">Pear</SegmentButton>
 *            <SegmentButton value="disabled" :disabled="true" @onSelect="onSelectHandler">Disabled</SegmentButton>
 *        </Segment>
 *    </Toolbar>
 * </Header>
 *
 */
import { isBlank, isTrueProperty } from '../../util/util'
import ThemeMixins from '../../themes/theme.mixins'

let tabIds = -1

export default {
  name: 'ion-segment',
  mixins: [ThemeMixins],
  provide () {
    let _this = this
    return {
      segmentComponent: _this
    }
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: [Boolean, String],
      default: true
    }
  },
  data () {
    return {
      isDisabled: isTrueProperty(this.disable),
      currentValue: this.value,

      buttons: [],

      selectedIndex: -1
    }
  },
  watch: {
    value (val) {
      // 更新子组件状态
      this.refreshButtons(val)
    }
  },
  created () {
    this.id = 't-' + ++tabIds
    this.selectedTabIndex = isBlank(this.selectedIndex) ? 0 : parseInt(this.selectedIndex, 10)
  },
  methods: {
    addButton (button) {
      this.buttons.push(button)

      if (isBlank(this.currentValue) && button.isActive) {
        this.currentValue = button.value
      }

      // listen for button select events
      button.$on('onActived', val => {
        // this button has been selected
        this.onButtonActived(val)
      })
    },
    onButtonActived (value) {
      this.refreshButtons(value)
      this.$emit('input', value)
      this.$emit('onChange', value)
    },
    refreshButtons (value) {
      this.buttons.forEach(button => {
        if (!button.isDisabled) {
          button.setActived(value)
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "segment";
@import "segment.ios";
@import "segment.md";
</style>
