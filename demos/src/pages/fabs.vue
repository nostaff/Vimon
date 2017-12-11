<template>
  <ion-page v-nav="{title: '浮动按钮'}">
    <ion-content fullscreen>
      <div :key="i" v-for="i in array">{{i}}</div>
      <section slot="fixed">
        <ion-fab top right edge>
          <ion-fab-button mini @click="clickMainFAB()">
            <ion-icon name="add"></ion-icon>
          </ion-fab-button>
          <ion-fab-list>
            <ion-fab-button @click="openSocial($event, 'facebook')">
              <ion-icon name="logo-facebook"></ion-icon>
            </ion-fab-button>
            <ion-fab-button @click="openSocial($event, 'twitter')">
              <ion-icon name="logo-twitter"></ion-icon>
            </ion-fab-button>
            <ion-fab-button @click="openSocial($event, 'vimeo')">
              <ion-icon name="logo-vimeo"></ion-icon>
            </ion-fab-button>
            <ion-fab-button @click="openSocial($event, 'googleplus')">
              <ion-icon name="logo-googleplus"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
        </ion-fab>

        <ion-fab right bottom>
          <ion-fab-button color="light">
            <ion-icon name="arrow-dropleft"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="left">
            <ion-fab-button @click="openSocial($event, 'facebook')">
              <ion-icon name="logo-facebook"></ion-icon>
            </ion-fab-button>
            <ion-fab-button @click="openSocial($event, 'twitter')">
              <ion-icon name="logo-twitter"></ion-icon>
            </ion-fab-button>
            <ion-fab-button @click="openSocial($event, 'vimeo')">
              <ion-icon name="logo-vimeo"></ion-icon>
            </ion-fab-button>
            <ion-fab-button @click="openSocial($event, 'googleplus')">
              <ion-icon name="logo-googleplus"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
        </ion-fab>

        <ion-fab left top>
          <ion-fab-button color="secondary">
            <ion-icon name="arrow-dropright"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="right">
            <ion-fab-button @click="openSocial($event, 'facebook')">
              <ion-icon name="logo-facebook"></ion-icon>
            </ion-fab-button>
            <ion-fab-button @click="openSocial($event, 'twitter')">
              <ion-icon name="logo-twitter"></ion-icon>
            </ion-fab-button>
            <ion-fab-button @click="openSocial($event, 'vimeo')">
              <ion-icon name="logo-vimeo"></ion-icon>
            </ion-fab-button>
            <ion-fab-button @click="openSocial($event, 'googleplus')">
              <ion-icon name="logo-googleplus"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
        </ion-fab>

        <ion-fab left bottom>
          <ion-fab-button color="dark">
            <ion-icon name="arrow-dropup"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="top">
            <ion-fab-button @click="openSocial($event, 'facebook')">
              <ion-icon name="logo-facebook"></ion-icon>
            </ion-fab-button>
            <ion-fab-button @click="openSocial($event, 'twitter')">
              <ion-icon name="logo-twitter"></ion-icon>
            </ion-fab-button>
            <ion-fab-button @click="openSocial($event, 'vimeo')">
              <ion-icon name="logo-vimeo"></ion-icon>
            </ion-fab-button>
            <ion-fab-button @click="openSocial($event, 'googleplus')">
              <ion-icon name="logo-googleplus"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
        </ion-fab>

        <ion-fab center middle>
          <ion-fab-button color="danger" @click="clickMainFAB()">
            <ion-icon name="md-share"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="top">
            <ion-fab-button @click="openSocial($event, 'vimeo')" color="primary">
              <ion-icon name="logo-vimeo"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
          <ion-fab-list side="bottom">
            <ion-fab-button @click="openSocial($event, 'facebook')" color="secondary">
              <ion-icon name="logo-facebook"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
          <ion-fab-list side="left">
            <ion-fab-button @click="openSocial($event, 'googleplus')" color="light">
              <ion-icon name="logo-googleplus"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
          <ion-fab-list side="right">
            <ion-fab-button @click="openSocial($event, 'twitter')" color="dark">
              <ion-icon name="logo-twitter"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
        </ion-fab>

        <ion-fab right middle>
          <ion-fab-button color="danger" @click="add()">
            <ion-icon name="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>

      </section>
    </ion-content>
  </ion-page>
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
