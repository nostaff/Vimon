<template>
    <sup class="ion-badge" :class="[modeClass, colorClass]">
        <slot></slot>
    </sup>
</template>

<script type="text/javascript">
import ModeMixins from '../../themes/theme.mixins'
export default {
  name: 'vm-badge',
  mixins: [ModeMixins]
}
</script>

<style lang="scss">
@import "badge";
@import "badge.ios";
@import "badge.md";
</style>
