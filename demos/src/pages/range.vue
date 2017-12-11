<template>
    <ion-page v-nav="{title: '滑块'}">
        <ion-content class="padding-top outer-content">

            <ion-list>
                <ion-list-header>
                    Brightness
                    <ion-badge slot="item-end">{{brightness}}</ion-badge>
                </ion-list-header>
                <ion-item>
                    <ion-range slot="item-content" v-model="brightness">
                        <ion-icon slot="range-left" small name="sunny"></ion-icon>
                        <ion-icon slot="range-right" name="sunny"></ion-icon>
                    </ion-range>
                </ion-item>
            </ion-list>

            <ion-list>
                <ion-list-header>
                    Saturation
                    <ion-badge slot="item-end" color="secondary">{{saturation}}</ion-badge>
                </ion-list-header>
                <ion-item>
                    <ion-range slot="item-content" v-model="saturation" color="secondary" :min="-200" :max="200"></ion-range>
                </ion-item>
            </ion-list>

            <ion-list>
                <ion-list-header>
                    Warmth
                    <ion-badge slot="item-end" color="danger">{{temperature}}</ion-badge>
                </ion-list-header>
                <ion-item>
                    <ion-range slot="item-content" v-model="temperature" :snaps="true" :step="100" :min="1000" :max="2000" color="danger">
                        <ion-icon slot="range-left" small name="thermometer" color="danger"></ion-icon>
                        <ion-icon slot="range-right" name="thermometer" color="danger"></ion-icon>
                    </ion-range>
                </ion-item>
            </ion-list>

            <ion-list>
                <ion-list-header>
                    Structure
                    <ion-badge slot="item-end" color="dark">{{structure.lower}}</ion-badge>
                    <ion-badge slot="item-end" color="dark">{{structure.upper}}</ion-badge>
                </ion-list-header>
                <ion-item>
                    <ion-range slot="item-content" v-model="structure" :dual="true" :pin="true" :step="1" :min="0" :max="100" color="dark"> </ion-range>
                </ion-item>
            </ion-list>

        </ion-content>
    </ion-page>
</template>
<script>
    export default {
      data () {
        return {
          brightness: 35,
          saturation: 88,
          temperature: 1300,
          structure: {lower: 33, upper: 60}
        }
      }
    }
</script>
