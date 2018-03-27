<template>
    <vm-page>
        <vm-header>

            <vm-navbar no-border-bottom>
                <vm-title>Segment</vm-title>
            </vm-navbar>

            <vm-toolbar no-border-top>
                <vm-segment v-model="appType">
                    <vm-segment-button value="Paid">
                        Paid
                    </vm-segment-button>
                    <vm-segment-button value="Free">
                        Free
                    </vm-segment-button>
                    <vm-segment-button value="Top">
                        Top
                    </vm-segment-button>
                </vm-segment>
            </vm-toolbar>

        </vm-header>

        <vm-content class="outer-content">
            <vm-list>
                <vm-list-header>{{ appType }}</vm-list-header>
                <vm-item v-for="(item, index) in getItems(appType)" :key="index">
                    {{ item.name }}
                    <vm-button outline slot="item-end">{{ item.price }}</vm-button>
                </vm-item>
            </vm-list>

            <vm-card>
                <vm-card-header>
                    {{ safari }}
                </vm-card-header>
                <vm-card-content>
                    <vm-segment v-model="safari" color="dark">
                        <vm-segment-button value="Bookmarks">
                            <vm-icon name="book"></vm-icon>
                        </vm-segment-button>
                        <vm-segment-button value="Reading List">
                            <vm-icon ios="ios-glasses-outline" md="md-glasses"></vm-icon>
                        </vm-segment-button>
                        <vm-segment-button value="Shared Links">
                            <vm-icon ios="ios-at-outline" md="md-at"></vm-icon>
                        </vm-segment-button>
                    </vm-segment>
                    <vm-list style="margin: 0" inset>
                        <vm-item v-for="(sItem,index) in getSafariItems(safari)" :key="index">
                            <vm-icon slot="item-start" :name="sItem.icon" color="primary"></vm-icon>
                            {{ sItem.name }}
                        </vm-item>
                    </vm-list>
                </vm-card-content>
            </vm-card>
        </vm-content>

        <vm-footer>
            <vm-toolbar no-border-bottom>
                <vm-title>
                    Weather: {{ weather == 'sunny' ? '96' : '77' }}°
                    <vm-icon :name="weather" color="danger"></vm-icon>
                </vm-title>
            </vm-toolbar>
            <vm-toolbar no-border-top no-border-bottom>
                <vm-segment v-model="weather" color="danger">
                    <vm-segment-button value="sunny">
                        Sunny
                    </vm-segment-button>
                    <vm-segment-button value="rainy" checked>
                        Rainy
                    </vm-segment-button>
                </vm-segment>
            </vm-toolbar>
        </vm-footer>
    </vm-page>
</template>

<script type="text/javascript">
import {Button, Icon, List, ListHeader, Item, Toolbar, Navbar, Segment, SegmentButton, Card, CardHeader, CardContent} from 'vimon'
export default {
  components: {
    'vm-button': Button,
    'vm-icon': Icon,
    'vm-list': List,
    'vm-list-header': ListHeader,
    'vm-item': Item,
    'vm-toolbar': Toolbar,
    'vm-navbar': Navbar,
    'vm-segment': Segment,
    'vm-segment-button': SegmentButton,
    'vm-card': Card,
    'vm-card-header': CardHeader,
    'vm-card-content': CardContent
  },
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
