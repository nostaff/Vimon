<template>
  <ion-page v-nav="{title: 'Badge'}">
    <ion-content padding>
        <ion-badge>2</ion-badge>
        <ion-badge color="danger">35</ion-badge>
        <ion-badge color="dark">99</ion-badge>
    </ion-content>
  </ion-page>
</template>

<script>
  export default {
    name: 'DemoBadge'
  }
</script>
