<template>
  <vm-page>
    <vm-header ref="header">
      <vm-navbar :color="color" title="设置Bar的样式"></vm-navbar>
    </vm-header>

    <vm-content padding class="outer-content" @onScroll="onScrollHandler">
      <h1>Section</h1>
      <section>
        <p>向下滚动, 则Header将渐变消失, 当滚回来的时候则显示. </p>
        <p>ps: 如果在微信/支付宝/钉钉模式下, 可能看不到Header的效果.</p>
      </section>

      <vm-radio-group title="设置Bar的颜色" :options="colors" v-model="color"></vm-radio-group>

      <section>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error eum expedita porro veniam. Autem dolore earum hic maxime necessitatibus nulla officia optio porro tenetur, veniam. Excepturi neque odio quisquam.</p>
      </section>
    </vm-content>
  </vm-page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
import { clamp } from '../../../src/util/util'
export default {
  name: 'setBarStyle',
  data () {
    return {
      colors: ['default', 'primary', 'light', 'secondary', 'danger', 'dark'],
      color: 'light'
    }
  },
  props: {},
  watch: {},
  computed: {
    headerComponent () {
      return this.$refs.header
    }
  },
  methods: {
    onScrollHandler (ev) {
      const TOP = 200
      let precent = 1 - clamp(0, ev.scrollTop / TOP, 1)
      this.headerComponent.setStyle({
        opacity: precent
      })
    }
  },
  created () {},
  mounted () {},
  activated () {},
  components: {}
}
</script>
