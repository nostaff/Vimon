<template>
  <vm-page>

    <vm-header>
      <vm-toolbar>
        <vm-buttons right slot="buttons">
          <vm-button @click="dismiss">Close</vm-button>
        </vm-buttons>
        <vm-title>Modal Page</vm-title>
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

<script type="text/javascript">
import {Toolbar, Title, Buttons, Button, Modal} from 'vimon'
export default {
  components: {
    'vm-toolbar': Toolbar,
    'vm-title': Title,
    'vm-buttons': Buttons,
    'vm-button': Button
  },
  inheritAttrs: false, // 避免将传递过来属性显现在根节点上
  data () {
    return {
      myParam: null
    }
  },
  created () {
    console.log(this)
    // this.myParam = this.$attrs.myParam ? this.$attrs.myParam : null
  },
  methods: {
    dismiss () {
      Modal.dismiss('dismiss return by modal page: ' + this.myParam)
    },
    login () {
      Modal.present({
        component: import('./modal-login.vue'),
        onDismiss (data) {
          console.log('onDismissed', data)
        }
      })
    }
  }
}
</script>
