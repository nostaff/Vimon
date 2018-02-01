<template>
  <vm-page>

    <vm-header>
      <vm-toolbar>
        <vm-buttons right slot="buttons">
          <vm-button @click="dismiss">Close</vm-button>
        </vm-buttons>
        <vm-title>Modal Page1</vm-title>
      </vm-toolbar>
    </vm-header>

    <vm-content padding>
      <div v-if="myParam">
        <h5>Parameters passed:</h5>
        <pre style="background-color: #f8f8f8">selections: {{myParam}}</pre>
      </div>
      <div v-else>
        <p>No parameters passed.</p>
      </div>
      <vm-button color="danger" block @click="dismiss()">Close Modal</vm-button>
      <p></p>
      <p></p>
      <p></p>
      <vm-button color="secondary" block @click="login()">Open Another Modal</vm-button>

    </vm-content>
  </vm-page>
</template>

<script>
export default {
  data () {
    return {
      myParam: null
    }
  },
  created () {
    this.myParam = this.$attrs.data ? this.$attrs.data.myParam : null
  },
  methods: {
    dismiss () {
      this.$modal.dismiss('dismiss return by modal page' + this.myParam)
    },
    login () {
      this.$modal.present({
        component: import('./modal-login.vue'),
        onDismiss (data) {
          console.log('onDismissed', data)
        }
      })
    }
  }
}
</script>
