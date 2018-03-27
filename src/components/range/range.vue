<template>
  <div :id="_uid" class="ion-range range"
       :class="[modeClass, colorClass, {'range-has-pin':pin, 'range-pressed':pressed, 'range-disabled': disabled}]"
       @touchstart="pointerDown($event)"
       @touchmove="pointerMove($event)"
       @touchend="pointerUp($event)"
       @mousedown="pointerDown($event)"
       @mousemove="pointerMove($event)"
       @mouseup="pointerUp($event)">
    <slot name="range-left">
      <vm-label range-left>{{min}}</vm-label>
    </slot>
    <div class="range-slider">
      <div class="range-tick" :class="{'range-tick-active':tick.active}" role="presentation" v-for="(tick, index) in ticks" :key="index" :style="'left:'+tick.left" v-if="snaps"></div>
      <div class="range-bar" role="presentation"></div>
      <div class="range-bar range-bar-active" role="presentation" :style="{left: barL, right: barR}"></div>
      <div class="range-knob-handle" role="slider" :aria-valuenow="valA" :aria-valuemin="min" :aria-valuemax="max" tabindex="0" :disabled="disabled" :style="{left: sliderA}">
        <div class="range-pin" role="presentation" v-if="pin">{{valA}}</div>
        <div class="range-knob" role="presentation"></div>
      </div>
      <div class="range-knob-handle" role="slider" :aria-valuenow="valB" :aria-valuemin="min" :aria-valuemax="max" tabindex="1" :disabled="disabled" :style="{left: sliderB}" v-if="dual">
        <div class="range-pin" role="presentation" v-if="pin">{{valB}}</div>
        <div class="range-knob" role="presentation"></div>
      </div>
    </div>
    <slot name="range-right">
      <vm-label range-right>{{max}}</vm-label>
    </slot>
  </div>
</template>
<script type="text/javascript">
import ModeMixins from '../../themes/theme.mixins'
import VmLabel from '../label'
export default {
  name: 'vm-range',
  components: {
    VmLabel
  },
  mixins: [ModeMixins],
  inject: {
    itemComponent: {
      from: 'itemComponent',
      default: null
    }
  },
  data () {
    return {
      ticks: [],
      rect: [],
      pressed: false,
      ratioA: 0,
      ratioB: 0,
      valA: 0,
      valB: 0,
      pressedA: false,
      pressedB: false,
      barL: '',
      barR: '',
      sliderA: '',
      sliderB: ''
    }
  },
  props: {
    value: {
      type: [Number, Object],
      default: 50
    },
    step: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    pin: {
      type: Boolean,
      default: false
    },
    snaps: {
      type: Boolean,
      default: false
    },
    dual: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * Returns the ratio of the knob's is current location, which is a number
     * between `0` and `1`. If two knobs are used, this property represents
     * the lower value.
     */
    ratio: function () {
      if (this.dual) {
        return Math.min(this.ratioA, this.ratioB)
      }
      return this.ratioA
    },

    /**
     * Returns the ratio of the upper value's is current location, which is
     * a number between `0` and `1`. If there is only one knob, then this
     * will return `null`.
     */
    ratioUpper: function () {
      if (this.dual) {
        return Math.max(this.ratioA, this.ratioB)
      }
      return null
    }

  },
  created () {
    this.inputUpdated()

    // build all the ticks if there are any to show
    this.createTicks()
  },
  mounted () {
    this.itemComponent && this.itemComponent.setElementClass('item-range', true)

    if (this.$slots['range-left']) {
      this.$slots['range-left'].forEach(function (item) {
        item.elm.setAttribute('range-left', '')
      })
    }
    if (this.$slots['range-right']) {
      this.$slots['range-right'].forEach(function (item) {
        item.elm.setAttribute('range-right', '')
      })
    }
  },
  methods: {
    pointerDown (ev) {
      if (this.disabled) {
        return false
      }

      // prevent default so scrolling does not happen
      ev.preventDefault()
      ev.stopPropagation()

      // get the start coordinates
      const current = this._pointerCoord(ev)

      // get the full dimensions of the slider element
      const rect = this.rect = this.$el.getBoundingClientRect()

      // figure out which knob they started closer to
      const ratio = this._clamp(0, (current.x - rect.left) / (rect.width), 1)
      this.activeB = this.dual && (Math.abs(ratio - this.ratioA) > Math.abs(ratio - this.ratioB))

      // update the active knob's position
      this._updatePos(current, rect, true)

      // return true so the pointer events
      // know everything's still valid
      return true
    },

    pointerMove (ev) {
      if (this.disabled) {
        return
      }
      // prevent default so scrolling does not happen
      ev.preventDefault()
      ev.stopPropagation()

      // update the active knob's position
      this._updatePos(this._pointerCoord(ev), this.rect, true)
    },

    pointerUp (ev) {
      if (this.disabled) {
        return
      }
      // prevent default so scrolling does not happen
      ev.preventDefault()
      ev.stopPropagation()

      // update the active knob's position
      this._updatePos(this._pointerCoord(ev), this.rect, false)
    },

    _updatePos (current, rect, isPressed) {
      // figure out where the pointer is currently at
      // update the knob being interacted with
      let ratio = this._clamp(0, (current.x - rect.left) / (rect.width), 1)
      let val = this._ratioToValue(ratio)

      if (this.snaps) {
        // snaps the ratio to the current value
        ratio = this._valueToRatio(val)
      }

      // update which knob is pressed
      this.pressed = isPressed
      let valChanged = false
      if (this.activeB) {
        // when the pointer down started it was determined
        // that knob B was the one they were interacting with
        this.pressedB = isPressed
        this.pressedA = false
        this.ratioB = ratio
        valChanged = val === this.valB
        this.valB = val
      } else {
        // interacting with knob A
        this.pressedA = isPressed
        this.pressedB = false
        this.ratioA = ratio
        valChanged = val === this.valA
        this.valA = val
      }
      this.updateBar()
      if (valChanged) {
        return false
      }

      // value has been updated
      let value
      if (this.dual) {
        // dual knobs have an lower and upper value
        value = {
          lower: Math.min(this.valA, this.valB),
          upper: Math.max(this.valA, this.valB)
        }

        console.debug(`range, updateKnob: ${ratio}, lower: ${this.value.lower}, upper: ${this.value.upper}`)
      } else {
        // single knob only has one value
        value = this.valA
        console.debug(`range, updateKnob: ${ratio}, value: ${this.value}`)
      }

      // Update input value
      this.$emit('input', value)

      return true
    },

    /** @internal */
    updateBar () {
      const ratioA = this.ratioA
      const ratioB = this.ratioB

      if (this.dual) {
        this.barL = `${(Math.min(ratioA, ratioB) * 100)}%`
        this.barR = `${100 - (Math.max(ratioA, ratioB) * 100)}%`

        this.sliderA = `${(Math.min(ratioA, ratioB) * 100)}%`
        this.sliderB = `${(Math.max(ratioA, ratioB) * 100)}%`
      } else {
        this.barL = ''
        this.barR = `${100 - (ratioA * 100)}%`

        this.sliderA = `${(ratioA * 100)}%`
        this.sliderB = ''
      }

      this.updateTicks()
    },

    createTicks () {
      if (this.snaps) {
        this.ticks = []
        for (var value = this.min; value <= this.max; value += this.step) {
          var ratio = this._valueToRatio(value)
          this.ticks.push({
            ratio: ratio,
            left: `${ratio * 100}%`
          })
        }
        this.updateTicks()
      }
    },

    updateTicks () {
      const ticks = this.ticks
      const ratio = this.ratio

      if (this.snaps && ticks) {
        if (this.dual) {
          var upperRatio = this.ratioUpper

          ticks.forEach(t => {
            t.active = (t.ratio >= ratio && t.ratio <= upperRatio)
          })
        } else {
          ticks.forEach(t => {
            t.active = (t.ratio <= ratio)
          })
        }
      }
    },

    inputUpdated () {
      const val = this.value
      if (this.dual) {
        this.valA = val.lower
        this.valB = val.upper
        this.ratioA = this._valueToRatio(val.lower)
        this.ratioB = this._valueToRatio(val.upper)
      } else {
        this.valA = val
        this.ratioA = this._valueToRatio(val)
      }

      this.updateBar()
    },

    _ratioToValue (ratio) {
      ratio = Math.round(((this.max - this.min) * ratio))
      ratio = Math.round(ratio / this.step) * this.step + this.min
      return this._clamp(this.min, ratio, this.max)
    },

    _valueToRatio (value) {
      value = Math.round((value - this.min) / this.step) * this.step
      value = value / (this.max - this.min)
      return this._clamp(0, value, 1)
    },

    _clamp (min, n, max) {
      return Math.max(min, Math.min(n, max))
    },

    _pointerCoord (ev) {
      // get coordinates for either a mouse click
      // or a touch depending on the given event
      if (ev) {
        var changedTouches = ev.changedTouches
        if (changedTouches && changedTouches.length > 0) {
          var touch = changedTouches[0]
          return {x: touch.clientX, y: touch.clientY}
        }
        var pageX = ev.pageX
        if (pageX !== undefined) {
          return {x: pageX, y: ev.pageY}
        }
      }
      return {x: 0, y: 0}
    }

  }
}
</script>

<style lang="scss">
  @import 'range';
  @import 'range.ios';
  @import 'range.md';
</style>

