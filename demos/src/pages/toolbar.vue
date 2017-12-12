<template>
  <ion-page v-nav="{title: 'Toolbar'}">

    <ion-content>
      <ion-toolbar no-border-top>
        <ion-title>Long title that never ends. It just goes on and on my friend.</ion-title>
      </ion-toolbar>

      <ion-toolbar no-border-top>
        <ion-buttons slot="item-start">
          <ion-button icon-only>
            <ion-icon name="contact"></ion-icon>
          </ion-button>
          <ion-button icon-only>
            <ion-icon name="search"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="item-end">
          <ion-button icon-only>
            <ion-icon name="more"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Default Buttons</ion-title>
      </ion-toolbar>

      <ion-toolbar no-border-top>
        <ion-buttons slot="item-start">
          <ion-button icon-only color="danger">
            <ion-icon name="contact"></ion-icon>
          </ion-button>
          <ion-button icon-only color="secondary">
            <ion-icon name="search"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="item-end">
          <ion-button icon-only color="dark">
            <ion-icon name="more"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Colored Buttons</ion-title>
      </ion-toolbar>

      <ion-toolbar no-border-top>
        <ion-buttons slot="item-start">
          <ion-button icon-only solid>
            <ion-icon name="contact"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Solid</ion-title>
        <ion-buttons slot="item-end">
          <ion-button icon-end solid color="secondary">
            Help
            <ion-icon name="help-circle"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

      <ion-toolbar no-border-top>
        <ion-buttons slot="item-start">
          <ion-button icon-only outline>
            <ion-icon name="contact"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="item-end">
          <ion-button icon-end outline color="secondary">
            Help
            <ion-icon name="help-circle"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Outline</ion-title>
      </ion-toolbar>

      <ion-toolbar no-border-top>
        <ion-button icon-only menuToggle>
          <ion-icon name="menu"></ion-icon>
        </ion-button>
        <ion-title>Left Menu</ion-title>
      </ion-toolbar>

      <ion-toolbar no-border-top>
        <ion-title>Right Menu</ion-title>
        <ion-button menuToggle slot="item-end">
          <ion-icon name="menu"></ion-icon>
        </ion-button>
      </ion-toolbar>

      <ion-toolbar no-border-top>
        <ion-buttons end>
          <ion-button icon-only>
            <ion-icon name="search"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-segment color="danger" v-model="favorites">
          <ion-segment-button value="featured">
            Featured
          </ion-segment-button>
          <ion-segment-button value="recent">
            Recent
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>

      <ion-toolbar no-border-top>
        <ion-segment v-model="apps">
          <ion-segment-button value="paid">
            Paid
          </ion-segment-button>
          <ion-segment-button value="free">
            Free
          </ion-segment-button>
          <ion-segment-button value="top">
            Top
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>

      <ion-toolbar no-border-top>
        <ion-searchbar></ion-searchbar>
      </ion-toolbar>

      <ion-toolbar no-border-top color="primary">
        <ion-searchbar></ion-searchbar>
      </ion-toolbar>

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
      demo: 'Toolbar',
      favorites: 'recent',
      apps: 'free'
    }
  }
}
</script>
