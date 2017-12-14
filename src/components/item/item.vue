<template>
  <router-link v-if="!!link" class="item-block" :class="[themeClass]" :to="link">
    <slot name="item-start"></slot>
    <div class="item-inner">
      <div class="input-wrapper">
        <slot name="item-label"></slot>
        <ion-label ref="label" v-if="noItemLabel">
          <slot></slot>
        </ion-label>
        <slot name="item-content"></slot>
      </div>
      <slot name="item-end"></slot>
    </div>
  </router-link>

  <button v-else-if="!!isLink" class="item-block" :class="[themeClass]">
    <slot name="item-start"></slot>
    <div class="item-inner">
      <div class="input-wrapper">
        <slot name="item-label"></slot>
        <ion-label ref="label" v-if="noItemLabel">
          <slot></slot>
        </ion-label>
        <slot name="item-content"></slot>
      </div>
      <slot name="item-end"></slot>
    </div>
    <div class="button-effect"></div>
  </button>

  <div v-else class="item-block" :class="[themeClass]">
    <slot name="item-start"></slot>
    <div class="item-inner">
      <div class="input-wrapper">
        <slot name="item-label"></slot>
        <ion-label ref="label" v-if="noItemLabel">
          <slot></slot>
        </ion-label>
        <slot name="item-content"></slot>
      </div>
      <slot name="item-end">
        <ion-reorder v-if="hasReorder"></ion-reorder>
      </slot>
    </div>
  </div>
</template>
<script>
import { isUndefined } from '../../util/util'
import ThemeMixins from '../../themes/theme.mixins'
import IonReorder from '../item-reorder'
import IonLabel from '../label'

export default {
  components: {
    IonLabel,
    IonReorder
  },
  name: 'ion-item',
  mixins: [ThemeMixins],
  provide () {
    const that = this
    return {
      itemComponent: that
    }
  },
  props: {
    link: {
      type: String,
      default: ''
    },
    isLink: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      componentName: 'ionItem',

      noItemLabel: false,
      hasReorder: false
    }
  },
  created () {
    this.noItemLabel = isUndefined(this.$slots['item-label'])

    this.hasReorder =
      this.$parent.$data.componentName === 'ionItemGroup' &&
      this.$parent.allowReorder
  },
  mounted () {
    if (this.$el.classList.contains('item-divider')) {
      this.setElementClass('item-block', false)
    }

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
  },
  methods: {
    getLabelText () {
      if (this.$refs.label && this.$refs.label.$el.length !== 0) {
        // 空==0，不为空 != 0 ，非大于0
        return this.$refs.label.$el.innerText
      } else if (this.$slots['item-label']) {
        return this.$slots['item-label'][0].elm.innerText
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
@import "item";
@import "item-media";
@import "item.ios";
@import "item.md";
</style>
