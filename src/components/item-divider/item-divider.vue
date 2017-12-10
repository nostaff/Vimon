<template>
  <div class="item item-divider ion-item-divider" :class="['item-'+theme, themeClass, colorClass]">
    <div class="item-inner">
      <div class="input-wrapper">
        <slot name="item-label"></slot>
        <ion-label ref="label" v-if="noItemLabel">
          <slot></slot>
        </ion-label>
      </div>
      <slot name="item-end"></slot>
    </div>
  </div>
</template>

<script>
import ThemeMixins from '../../themes/theme.mixins'
import IonItem from '../item'

export default {
  name: 'ion-item-divider',
  mixins: [ThemeMixins],
  components: {
    IonItem
  },
  data () {
    return {
      componentName: 'ionItem'
    }
  },
  computed: {
    noItemLabel: function () {
      return typeof this.$slots['item-label'] === 'undefined'
    }
  },
  mounted () {
    if (this.$slots['item-end']) {
      this.$slots['item-end'].forEach(function (item) {
        item.elm.setAttribute('item-end', '')
      })
    }
  }
}
</script>
