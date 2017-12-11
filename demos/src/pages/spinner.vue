<template>
  <ion-page v-nav="{title: '列表'}">
    <ion-content>

      <ion-list title="Spinner Loading Indicators">
        <ion-item detail-push @click.native="showLoading('ios', 3000)">
          <ion-spinner slot="item-start" name="ios"></ion-spinner>
          Show iOS
        </ion-item>
        <ion-item detail-push @click.native="showLoading('ios-small', 3000)">
          <ion-spinner slot="item-start" name="ios-small"></ion-spinner>
          Show iOS Small
        </ion-item>
        <ion-item detail-push @click.native="showLoading('dots', 3000)">
          <ion-spinner slot="item-start" name="dots"></ion-spinner>
          Show Dots
        </ion-item>
        <ion-item detail-push @click.native="showLoading('bubbles', 3000)">
          <ion-spinner slot="item-start" name="bubbles"></ion-spinner>
          Show Bubbles
        </ion-item>
        <ion-item detail-push @click.native="showLoading('circles', 3000)">
          <ion-spinner slot="item-start" name="circles"></ion-spinner>
          Show Circles
        </ion-item>
        <ion-item detail-push @click.native="showLoading('crescent', 3000)">
          <ion-spinner slot="item-start" name="crescent"></ion-spinner>
          Show Crescent
        </ion-item>
      </ion-list>

      <ion-list title="Custom Loading Indicators">
        <ion-item detail-push @click.native="showCustomLoading()">Show Custom</ion-item>
        <ion-item detail-push @click.native="showLoadingText()">Show Text Only</ion-item>
      </ion-list>

    </ion-content>
  </ion-page>
</template>

<script>
  import Loading from 'vimon/components/loading'
  export default {
    methods: {
      showLoading (name, duration) {
        Loading.present({
          spinner: name,
          content: 'This is the "' + name + '" spinner. It will dismiss after ' + duration / 1000 + 'seconds.',
          duration: duration
        }).then((res) => {
          console.log('loading hide.', res)
        })
      },

      showCustomLoading () {
        Loading.present({
          spinner: 'circles',
          content: 'This is the spinner with "enableBackdropDismiss = true".',
          duration: 100000,
          enableBackdropDismiss: true
        }).then((res) => {
          console.log('loading hide.', res)
        })
      },

      showLoadingText () {
        Loading.present({
          content: 'This is the ONLY TEXT spinner. It will dismiss after  3 seconds.',
          duration: 3000
        }).then((res) => {
          console.log('loading hide.', res)
        })
      }
    }
  }
</script>
