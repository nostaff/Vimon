<template>
  <vm-page>
    <vm-header>
      <vm-navbar>
        <vm-title>Menu</vm-title>
      </vm-navbar>
    </vm-header>
    <vm-content padding class="outer-content">
      <h1>Menus参数设置</h1>
      <vm-list radio-group v-model="menusType">
        <vm-list-header>Type</vm-list-header>
        <vm-item>
          <vm-label>Overlay</vm-label>
          <vm-radio value="overlay"></vm-radio>
        </vm-item>
        <vm-item>
          <vm-label>Reveal</vm-label>
          <vm-radio value="reveal"></vm-radio>
        </vm-item>
      </vm-list>
      <vm-list radio-group v-model="menusSide">
        <vm-list-header>Side</vm-list-header>
        <vm-item>
          <vm-label>Left</vm-label>
          <vm-radio value="left"></vm-radio>
        </vm-item>
        <vm-item>
          <vm-label>Right</vm-label>
          <vm-radio value="right"></vm-radio>
        </vm-item>
      </vm-list>
      <vm-button block @click="openMenu('menu')">Open Menu</vm-button>
    </vm-content>
  </vm-page>
</template>
<script type="text/javascript">
export default {
  name: 'MenusDemo',
  components: {},
  // data
  props: {},
  data () {
    return {}
  },
  watch: {},
  computed: {
    menusType: {
      get () {
        return this.$store.state.menu.type
      },
      set (v) {
        this.$store.commit('SET_MENUS', {type: v})
      }
    },
    menusSide: {
      get () {
        return this.$store.state.menu.side
      },
      set (v) {
        this.$store.commit('SET_MENUS', {side: v})
      }
    }
  },
  // methods
  methods: {
    openMenu (id) {
      this.$menu.open(id)
    }
  },
  // life hook
  beforeCreate () {},
  created () {
    console.log(this.$menu)
  },
  beforeMount () {},
  mounted () {
    console.log(this.$store)
  },
  beforeUpdate () {},
  updated () {},
  activated () {},
  deactivated () {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="scss">

</style>
