<template>
  <div class="ion-avatar" :class="[colorClass]" :style="style">
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
import ModeMixins from '../../themes/theme.mixins'
import { isTrueProperty } from '../../util/util'
export default {
  name: 'vm-avatar',
  mixins: [ModeMixins],
  props: {
    size: {
      type: [Number, String],
      default: 36
    },
    tile: [Boolean, String]
  },
  data () {
    return {
      isTile: isTrueProperty(this.tile)
    }
  },
  computed: {
    style () {
      return {
        width: parseInt(this.size) + 'px',
        height: parseInt(this.size) + 'px'
      }
    }
  },
  mounted () {
    if (this.isTile) { this.setElementClass('avatar-tile') }
  }
}
</script>

<style lang="scss">
  .ion-avatar {
    border-radius: 50%;
    text-align: center;
    vertical-align: middle;

    img, .icon {
        border-radius: 50%;
    }

    &.avatar-tile {
      border-radius: 0;

      img, .icon {
          border-radius: 0;
      }
    }
  }
</style>
