<template>
    <ion-page>
        <ion-header>

            <ion-navbar>
                <ion-button menuToggle @click.native="toggleMenu()">
                    <ion-icon name="menu"></ion-icon>
                </ion-button>
                <ion-title>
                    Menu
                </ion-title>
            </ion-navbar>

        </ion-header>

        <ion-content padding>

            <h4>Active Menu: <b color="primary">{{ (activeMenu == 'menu1') ? 'Menu 1' : 'Menu 2' }}</b></h4>

            <p>This page has two menus with different id's, but only one is active at a time.</p>

            <ion-button block color="secondary" @click.native="menu1Active()">Make Menu 1 Active</ion-button>

            <ion-button block color="danger" @click.native="menu2Active()">Make Menu 2 Active</ion-button>

            <ion-button block menuToggle @click.native="toggleMenu()">Toggle Menu</ion-button>

        </ion-content>
    </ion-page>
</template>
<script>
    export default {
      data () {
        return {
          activeMenu: 'menu1'
        }
      },
      created () {
        this.menu1Active()
      },
      methods: {
        menu1Active () {
          this.activeMenu = 'menu1'
          this.$menu.enable(true, 'menu1')
          this.$menu.enable(false, 'menu2')
        },
        menu2Active () {
          this.activeMenu = 'menu2'
          this.$menu.enable(false, 'menu1')
          this.$menu.enable(true, 'menu2')
        },
        toggleMenu () {
          this.$menu.present()
        }
      }
    }
</script>
