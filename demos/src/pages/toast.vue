<template>
    <vm-page v-nav="{title: 'Toast'}">

        <vm-content padding>

            <vm-button block @click.native="showToast('bottom')">Show Toast Bottom Position</vm-button>
            <vm-button block @click.native="showToast('top')">Show Toast Top Position</vm-button>
            <vm-button block @click.native="showToast('middle')">Show Toast Middle Position</vm-button>
            <vm-button block margin-bottom @click.native="showLongToast()">Show Long Toast</vm-button>

            <vm-button block @click.native="showDismissDurationToast()">Show Custom Duration Toast</vm-button>
            <vm-button block @click.native="showToastWithCloseButton()">Show Close Button Toast</vm-button>

        </vm-content>
    </vm-page>
</template>
<script>
    export default {
      created () {
      },

      mounted () {
      },

      methods: {
        showToast (position) {
          this.$toast.present({
            message: 'Top was added successfully',
            duration: 3000,
            position: position,
            dismissOnPageChange: true,
            onDismiss () {
              console.debug('Toast onDidDismiss()')
            }
          })
        },

        showLongToast () {
          this.$toast.present({
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea voluptatibus quibusdam eum nihil optio, ullam accusamus magni, nobis suscipit reprehenderit, sequi quam amet impedit. Accusamus dolorem voluptates laborum dolor obcaecati.',
            duration: 3000,
            onDismiss () {
              console.debug('Toast onDidDismiss()')
            }
          })
        },

        showDismissDurationToast () {
          this.$toast.present({
            message: 'I am dismissed after 1.5 seconds',
            duration: 1500,
            onDismiss () {
              console.debug('Toast onDidDismiss()')
            }
          })
        },

        showToastWithCloseButton () {
          this.$toast.present({
            message: 'Your internet connection appears to be offline. Data integrity is not guaranteed.',
            showCloseButton: true,
            closeButtonText: 'Ok',
            onDismiss () {
              console.debug('Toast onDidDismiss()')
            }
          })
        }
      }
    }
</script>
