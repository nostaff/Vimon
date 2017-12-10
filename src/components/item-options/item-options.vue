<template>
    <div class="ion-item-options" :side="side">
        <slot></slot>
    </div>
</template>
<script>
    export default {
      name: 'ion-item-options',
      data () {
        return {
          componentName: 'ionItemOptions'
        }
      },
      props: {
        side: {
          type: String,
          default: 'right',
          validator (value) {
            return [
              'left',
              'right'
            ].indexOf(value) > -1
          }
        }
      },
      methods: {
        width () {
          return this.$el.offsetWidth
        }
      }
    }
</script>