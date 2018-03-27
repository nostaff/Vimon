<template>
  <vm-page v-nav="{title: 'Icons'}">

    <vm-content text-center class="icon-demo">

        <vm-row>
            <vm-col><vm-icon name="ionic" color="primary"></vm-icon></vm-col>
            <vm-col><vm-icon name="logo-angular"></vm-icon></vm-col>
            <vm-col><vm-icon name="heart" color="danger"></vm-icon></vm-col>
            <vm-col><vm-icon name="ionitron" color="primary"></vm-icon></vm-col>

            <vm-col><vm-icon name="happy" color="vibrant"></vm-icon></vm-col>
            <vm-col><vm-icon name="people"></vm-icon></vm-col>
            <vm-col><vm-icon name="person"></vm-icon></vm-col>
            <vm-col><vm-icon name="contact"></vm-icon></vm-col>

            <vm-col><vm-icon name="apps"></vm-icon></vm-col>
            <vm-col><vm-icon name="lock"></vm-icon></vm-col>
            <vm-col><vm-icon name="key" color="bright"></vm-icon></vm-col>
            <vm-col><vm-icon name="unlock"></vm-icon></vm-col>

            <vm-col><vm-icon name="map" color="secondary"></vm-icon></vm-col>
            <vm-col><vm-icon name="navigate"></vm-icon></vm-col>
            <vm-col><vm-icon name="pin"></vm-icon></vm-col>
            <vm-col><vm-icon name="locate"></vm-icon></vm-col>

            <vm-col><vm-icon name="mic"></vm-icon></vm-col>
            <vm-col><vm-icon name="musical-notes" color="vibrant"></vm-icon></vm-col>
            <vm-col><vm-icon name="volume-up"></vm-icon></vm-col>
            <vm-col><vm-icon name="microphone"></vm-icon></vm-col>

            <vm-col><vm-icon name="cafe" color="bright"></vm-icon></vm-col>
            <vm-col><vm-icon name="calculator"></vm-icon></vm-col>
            <vm-col><vm-icon name="bus"></vm-icon></vm-col>
            <vm-col><vm-icon name="wine" color="danger"></vm-icon></vm-col>

            <vm-col><vm-icon name="camera"></vm-icon></vm-col>
            <vm-col><vm-icon name="image" color="secondary"></vm-icon></vm-col>
            <vm-col><vm-icon name="star" color="bright"></vm-icon></vm-col>
            <vm-col><vm-icon name="pin"></vm-icon></vm-col>

            <vm-col><vm-icon name="arrow-dropup-circle" color="vibrant"></vm-icon></vm-col>
            <vm-col><vm-icon name="arrow-back"></vm-icon></vm-col>
            <vm-col><vm-icon name="arrow-dropdown"></vm-icon></vm-col>
            <vm-col><vm-icon name="arrow-forward"></vm-icon></vm-col>

            <vm-col><vm-icon name="cloud"></vm-icon></vm-col>
            <vm-col><vm-icon name="sunny" color="bright"></vm-icon></vm-col>
            <vm-col><vm-icon name="umbrella"></vm-icon></vm-col>
            <vm-col><vm-icon name="rainy" color="primary"></vm-icon></vm-col>
        </vm-row>
    </vm-content>

  </vm-page>
</template>

<script type="text/javascript">
import {Button, Column, Row, Icon} from 'vimon'
export default {
  name: 'DemoButton',
  components: {
    'vm-button': Button,
    'vm-col': Column,
    'vm-row': Row,
    'vm-icon': Icon
  }
}
</script>

<style lang="scss">
    .icon-demo .ion-icon {
        font-size: 50px;
    }
    .icon-demo .row {
        height: 100%;
        flex-wrap: wrap;
    }
    .icon-demo .col {
        flex: 0 0 25%;
        max-width: 25%;
        text-align: center;
        padding: 10px 5px;
    }
</style>
