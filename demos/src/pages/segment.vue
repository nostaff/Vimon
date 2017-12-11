<template>
    <ion-page>
        <ion-header>

            <ion-navbar no-border-bottom>
                <ion-title>Segment</ion-title>
            </ion-navbar>

            <ion-toolbar no-border-top>
                <ion-segment v-model="appType">
                    <ion-segment-button value="Paid">
                        Paid
                    </ion-segment-button>
                    <ion-segment-button value="Free">
                        Free
                    </ion-segment-button>
                    <ion-segment-button value="Top">
                        Top
                    </ion-segment-button>
                </ion-segment>
            </ion-toolbar>

        </ion-header>

        <ion-content class="outer-content">
            <ion-list>
                <ion-list-header>{{ appType }}</ion-list-header>
                <ion-item v-for="(item, index) in getItems(appType)" :key="index">
                    {{ item.name }}
                    <ion-button outline slot="item-end">{{ item.price }}</ion-button>
                </ion-item>
            </ion-list>

            <ion-card>
                <ion-card-header>
                    {{ safari }}
                </ion-card-header>
                <ion-card-content>
                    <ion-segment v-model="safari" color="dark">
                        <ion-segment-button value="Bookmarks">
                            <ion-icon name="book"></ion-icon>
                        </ion-segment-button>
                        <ion-segment-button value="Reading List">
                            <ion-icon ios="ios-glasses-outline" md="md-glasses"></ion-icon>
                        </ion-segment-button>
                        <ion-segment-button value="Shared Links">
                            <ion-icon ios="ios-at-outline" md="md-at"></ion-icon>
                        </ion-segment-button>
                    </ion-segment>
                    <ion-list style="margin: 0" inset>
                        <ion-item v-for="(sItem,index) in getSafariItems(safari)" :key="index">
                            <ion-icon slot="item-start" :name="sItem.icon" color="primary"></ion-icon>
                            {{ sItem.name }}
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>

        <ion-footer>
            <ion-toolbar no-border-bottom>
                <ion-title>
                    Weather: {{ weather == 'sunny' ? '96' : '77' }}°
                    <ion-icon :name="weather" color="danger"></ion-icon>
                </ion-title>
            </ion-toolbar>
            <ion-toolbar no-border-top no-border-bottom>
                <ion-segment v-model="weather" color="danger">
                    <ion-segment-button value="sunny">
                        Sunny
                    </ion-segment-button>
                    <ion-segment-button value="rainy" checked>
                        Rainy
                    </ion-segment-button>
                </ion-segment>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
    export default {
      data () {
        return {
          appType: 'Paid',
          safari: 'Shared Links',
          weather: 'sunny',

          apps: {
            'Paid': [
              {
                name: 'Monopoly',
                price: '$0.99'
              },
              {
                name: 'Angry Birds',
                price: '$2.99'
              }
            ],
            'Free': [
              {
                name: 'Snapchat',
                price: 'GET'
              },
              {
                name: 'Instagram',
                price: 'OPEN'
              }
            ],
            'Top': [
              {
                name: 'Spotify',
                price: 'OPEN'
              },
              {
                name: 'Pandora',
                price: 'GET'
              }
            ]
          },

          items: {
            'Bookmarks': [
              {
                name: 'Favorites',
                icon: 'ios-star-outline'
              },
              {
                name: 'History',
                icon: 'ios-clock-outline'
              }
            ],
            'Reading List': [
              {
                name: 'Terms of Service',
                icon: 'create'
              },
              {
                name: 'User Guide',
                icon: 'book'
              }
            ],
            'Shared Links': [
              {
                name: 'Ionic Framework',
                icon: 'ionic'
              },
              {
                name: 'Learn Angular',
                icon: 'logo-angular'
              }
            ]
          }
        }
      },

      methods: {
        getItems (type) {
          return this.apps[type]
        },

        getSafariItems (type) {
          return this.items[type]
        }
      }
    }
</script>
