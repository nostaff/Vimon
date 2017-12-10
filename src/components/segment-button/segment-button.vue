<template>
  <div class="segment-button" role="button" @click="onClickHandler"
       :aria-pressed="isActive"
       :class="{
            'segment-activated':isActive,
            'segment-button-disabled':isDisabled
        }">
    <slot></slot>
    <div class="button-effect"></div>
  </div>
</template>
<script type="text/javascript">
/**
 * @component Segment/SegmentButton
 * @description
 *
 * ## 小标签 / SegmentButton
 *
 * Segment组件的子组件SegmentButton, 两者配合使用, 属于嵌套关系.
 *
 * @props {String|Number} value - 当前SegmentButton的值, 如果父元素的value和这个相同, 这个当前被选中
 * @props {Boolean} [disabled=false] - 当前SegmentButton的禁用状态
 *
 * @slot 空 - 当前button的显示值, 如果没有提供value值, 建议不要嵌套过多的结构.
 *
 * @fires component:Segment#onSelect
 * @see component:Segment
 *
 */
import {isTrueProperty, isPresent} from '../../util/util'
import ThemeMixins from '../../themes/theme.mixins'

export default {
  name: 'ion-segment-button',
  mixins: [ThemeMixins],
  inject: {
    segmentComponent: {
      from: 'segmentComponent',
      default: null
    }
  },
  props: {
    value: {
      type: [String],
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
      isActive: false
    }
  },
  watch: {
    disabled (val) {
      this.setDisabled(isTrueProperty(val))
    }
  },
  created () {
    if (!isPresent(this.value)) {
      console.warn('<ion-segment-button> requires a "value" attribute')
    }

    if (!isPresent(this.segmentComponent)) {
      console.error('Segment-button component must combine with Segment')
    }

    this.segmentComponent.addButton(this)
  },
  methods: {
    onClickHandler (ev) {
      if (!this.isDisabled && !this.isActive) {
        this.isActive = true
        this.$emit('onActived', this.value)
      }
    },
    setActived (value) {
      let isActive = value === this.value
      if (this.isActive !== isActive) {
        this.isActive = isActive
      }
    },
    setDisabled (disabled) {
      this.setActived(null)
      this.isDisabled = disabled
    }
  }

}
</script>
