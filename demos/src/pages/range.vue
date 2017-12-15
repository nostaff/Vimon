<template>
    <vm-page v-nav="{title: 'Range'}">
        <vm-content class="padding-top outer-content">

            <vm-list>
                <vm-list-header>
                    Brightness
                    <vm-badge slot="item-end">{{brightness}}</vm-badge>
                </vm-list-header>
                <vm-item>
                    <vm-range v-model="brightness">
                        <vm-icon slot="range-left" small name="sunny"></vm-icon>
                        <vm-icon slot="range-right" name="sunny"></vm-icon>
                    </vm-range>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>
                    Saturation
                    <vm-badge slot="item-end" color="secondary">{{saturation}}</vm-badge>
                </vm-list-header>
                <vm-item>
                    <vm-range v-model="saturation" color="secondary" :min="-200" :max="200"></vm-range>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>
                    Warmth
                    <vm-badge slot="item-end" color="danger">{{temperature}}</vm-badge>
                </vm-list-header>
                <vm-item>
                    <vm-range v-model="temperature" :snaps="true" :step="100" :min="1000" :max="2000" color="danger">
                        <vm-icon slot="range-left" small name="thermometer" color="danger"></vm-icon>
                        <vm-icon slot="range-right" name="thermometer" color="danger"></vm-icon>
                    </vm-range>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>
                    Structure
                    <vm-badge slot="item-end" color="dark">{{structure.lower}}</vm-badge>
                    <vm-badge slot="item-end" color="dark">{{structure.upper}}</vm-badge>
                </vm-list-header>
                <vm-item>
                    <vm-range v-model="structure" :dual="true" :pin="true" :step="1" :min="0" :max="100" color="dark"> </vm-range>
                </vm-item>
            </vm-list>

        </vm-content>
    </vm-page>
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
