<template>
    <vm-page>
        <vm-header>

            <vm-navbar>
                <vm-button menuToggle @click.native="toggleMenu()">
                    <vm-icon name="menu"></vm-icon>
                </vm-button>
                <vm-title>
                    Menu
                </vm-title>
            </vm-navbar>

        </vm-header>

        <vm-content padding>

            <h4>Active Menu: <b color="primary">{{ (activeMenu == 'menu1') ? 'Menu 1' : 'Menu 2' }}</b></h4>

            <p>This page has two menus with different id's, but only one is active at a time.</p>

            <vm-button block color="secondary" @click.native="menu1Active()">Make Menu 1 Active</vm-button>

            <vm-button block color="danger" @click.native="menu2Active()">Make Menu 2 Active</vm-button>

            <vm-button block menuToggle @click.native="toggleMenu()">Toggle Menu</vm-button>

        </vm-content>
    </vm-page>
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
