<template>
  <div class="ion-thumbnail">
    <img :src="src" v-if="src">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
/**
 * @component Thumbnail
 * @description
 *
 * ## 列表组件 / Thumbnail方形头像组件
 *
 * 在Item组件中放置方形头像的组件
 *
 * @see component:List
 * @see component:Item
 * @see component:Avatar
 * @demo #/thumbnailList
 */
export default {
  name: 'vm-thumbnail',
  props: {
    src: {
      type: String,
      default: ''
    }
  }
}
</script>
