<template>
  <vm-page>
    <vm-header>
      <vm-navbar :color="color" title="Page"></vm-navbar>
    </vm-header>

    <vm-content class="outer-content">
      <vm-radio-group title="Navbar Color" :options="colors" v-model="color"></vm-radio-group>

      <div>Selected Color: {{color}}</div>

      <router-link to="/page">Goto Page</router-link>
      <router-link to="/page2">Goto Page2</router-link>
    </vm-content>

    <vm-footer>
      <vm-toolbar>
        <vm-title>I'm a footer</vm-title>
      </vm-toolbar>
    </vm-footer>
  </vm-page>
</template>
<script>
export default {
  data () {
    return {
      colors: ['default', 'primary', 'light', 'secondary', 'danger', 'dark'],
      color: 'danger'
    }
  }
}
</script>
