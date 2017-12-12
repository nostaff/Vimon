<template>
  <ion-page v-nav="{title:'Modal Page', showMoreButton: true, onMoreButtonClick:'dismiss()'}">

    <ion-content padding>
      <div v-if="myParam">
        <h5>Parameters passed:</h5>
        <pre style="background-color: #f8f8f8">selections: {{myParam}}</pre>
      </div>
      <div v-else>
        <p>No parameters passed.</p>
      </div>
      <ion-button color="danger" full @click.native="dismiss()">Close Modal</ion-button>

    </ion-content>
  </ion-page>
</template>

<script>
  export default {
    data () {
      return {
        myParam: null
      }
    },
    created () {
      this.myParam = this.$options.$data ? this.$options.$data.myParam : null
    },
    methods: {
      dismiss () {
        this.$modal.dismiss('dismiss return by modal page' + this.myParam)
      }
    }
  }
</script>
