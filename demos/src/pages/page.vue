<template>
    <ion-page>
        <ion-header>
            <ion-navbar :color="color" title="Page"></ion-navbar>
        </ion-header>

        <ion-content>
            <ion-radio-group title="Navbar Color" :options="colors" v-model="color"></ion-radio-group>

            <div>Selected Color: {{color}}</div>

<router-link to="/page">Goto Page</router-link>
<router-link to="/page2">Goto Page2</router-link>
        </ion-content>

        <ion-footer>
            <ion-toolbar>
                <ion-title>I'm a footer</ion-title>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>
<script>
    export default {
      data () {
        return {
          colors: [
            'default',
            'primary',
            'light',
            'secondary',
            'danger',
            'dark'
          ],
          color: 'danger'
        }
      }
    }
</script>
