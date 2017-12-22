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
import {isTrueProperty, isPresent} from '../../util/util'
import ModeMixins from '../../themes/theme.mixins'

export default {
  name: 'vm-segment-button',
  mixins: [ModeMixins],
  inject: {
    segmentComponent: {
      from: 'segmentComponent',
      default () {
        if (process.env.NODE_ENV !== 'production') {
          console.error('[Component] SegmentButton 需要与 Segment组件 组合使用!')
        }
        return null
      }
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
      console.warn('<vm-segment-button> requires a "value" attribute')
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
