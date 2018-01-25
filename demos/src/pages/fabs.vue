<template>
  <vm-page v-nav="{title: 'Floating Action Buttons'}">
    <vm-content>
      <div :key="i" v-for="i in array">num: {{i}}</div>

      <vm-fab slot="fixed" top right edge>
        <vm-fab-button mini @click="clickMainFAB()">
          <vm-icon name="add"></vm-icon>
        </vm-fab-button>
        <vm-fab-list>
          <vm-fab-button @click="openSocial($event, 'facebook')">
            <vm-icon name="logo-facebook"></vm-icon>
          </vm-fab-button>
          <vm-fab-button @click="openSocial($event, 'twitter')">
            <vm-icon name="logo-twitter"></vm-icon>
          </vm-fab-button>
          <vm-fab-button @click="openSocial($event, 'vimeo')">
            <vm-icon name="logo-vimeo"></vm-icon>
          </vm-fab-button>
          <vm-fab-button @click="openSocial($event, 'googleplus')">
            <vm-icon name="logo-googleplus"></vm-icon>
          </vm-fab-button>
        </vm-fab-list>
      </vm-fab>

      <vm-fab slot="fixed" right bottom>
        <vm-fab-button color="light">
          <vm-icon name="arrow-dropleft"></vm-icon>
        </vm-fab-button>
        <vm-fab-list side="left">
          <vm-fab-button @click="openSocial($event, 'facebook')">
            <vm-icon name="logo-facebook"></vm-icon>
          </vm-fab-button>
          <vm-fab-button @click="openSocial($event, 'twitter')">
            <vm-icon name="logo-twitter"></vm-icon>
          </vm-fab-button>
          <vm-fab-button @click="openSocial($event, 'vimeo')">
            <vm-icon name="logo-vimeo"></vm-icon>
          </vm-fab-button>
          <vm-fab-button @click="openSocial($event, 'googleplus')">
            <vm-icon name="logo-googleplus"></vm-icon>
          </vm-fab-button>
        </vm-fab-list>
      </vm-fab>

      <vm-fab slot="fixed" left top>
        <vm-fab-button color="secondary">
          <vm-icon name="arrow-dropright"></vm-icon>
        </vm-fab-button>
        <vm-fab-list side="right">
          <vm-fab-button @click="openSocial($event, 'facebook')">
            <vm-icon name="logo-facebook"></vm-icon>
          </vm-fab-button>
          <vm-fab-button @click="openSocial($event, 'twitter')">
            <vm-icon name="logo-twitter"></vm-icon>
          </vm-fab-button>
          <vm-fab-button @click="openSocial($event, 'vimeo')">
            <vm-icon name="logo-vimeo"></vm-icon>
          </vm-fab-button>
          <vm-fab-button @click="openSocial($event, 'googleplus')">
            <vm-icon name="logo-googleplus"></vm-icon>
          </vm-fab-button>
        </vm-fab-list>
      </vm-fab>

      <vm-fab slot="fixed" left bottom>
        <vm-fab-button color="dark">
          <vm-icon name="arrow-dropup"></vm-icon>
        </vm-fab-button>
        <vm-fab-list side="top">
          <vm-fab-button @click="openSocial($event, 'facebook')">
            <vm-icon name="logo-facebook"></vm-icon>
          </vm-fab-button>
          <vm-fab-button @click="openSocial($event, 'twitter')">
            <vm-icon name="logo-twitter"></vm-icon>
          </vm-fab-button>
          <vm-fab-button @click="openSocial($event, 'vimeo')">
            <vm-icon name="logo-vimeo"></vm-icon>
          </vm-fab-button>
          <vm-fab-button @click="openSocial($event, 'googleplus')">
            <vm-icon name="logo-googleplus"></vm-icon>
          </vm-fab-button>
        </vm-fab-list>
      </vm-fab>

      <vm-fab slot="fixed" center middle>
        <vm-fab-button color="danger" @click="clickMainFAB()">
          <vm-icon name="md-share"></vm-icon>
        </vm-fab-button>
        <vm-fab-list side="top">
          <vm-fab-button @click="openSocial($event, 'vimeo')" color="primary">
            <vm-icon name="logo-vimeo"></vm-icon>
          </vm-fab-button>
        </vm-fab-list>
        <vm-fab-list side="bottom">
          <vm-fab-button @click="openSocial($event, 'facebook')" color="secondary">
            <vm-icon name="logo-facebook"></vm-icon>
          </vm-fab-button>
        </vm-fab-list>
        <vm-fab-list side="left">
          <vm-fab-button @click="openSocial($event, 'googleplus')" color="light">
            <vm-icon name="logo-googleplus"></vm-icon>
          </vm-fab-button>
        </vm-fab-list>
        <vm-fab-list side="right">
          <vm-fab-button @click="openSocial($event, 'twitter')" color="dark">
            <vm-icon name="logo-twitter"></vm-icon>
          </vm-fab-button>
        </vm-fab-list>
      </vm-fab>

      <vm-fab slot="fixed" right middle>
        <vm-fab-button color="danger" @click="add()">
          <vm-icon name="add"></vm-icon>
        </vm-fab-button>
      </vm-fab>

    </vm-content>
  </vm-page>
</template>
<script>
  export default {
    data () {
      return {
        array: []
      }
    },

    methods: {
      onClick (item) {
        console.log(item)
      },

      add () {
        this.array.push(1)
      },

      clickMainFAB () {
        console.log('Clicked open social menu')
      },

      openSocial (componemnt, network) {
        componemnt.close()

        console.log('Share in ' + network)
      }
    }
  }
</script>
