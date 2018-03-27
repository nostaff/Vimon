<template>
  <vm-page v-nav="{title: 'Cards'}">

    <vm-content class="cards-bg">

        <vm-card>

            <vm-card-header>
                Header
            </vm-card-header>

            <vm-card-content>
                The British use the term "header", but the American term "head-shot" the English simply refuse to adopt.
            </vm-card-content>

        </vm-card>

        <vm-card class="cards-list-demo">
            <vm-card-header>
            Explore Nearby
            </vm-card-header>

            <vm-list>
                <vm-item>
                    <vm-icon name='cart' slot="item-start"></vm-icon>
                    Shopping
                </vm-item>

                <vm-item>
                    <vm-icon name='medical' slot="item-start"></vm-icon>
                    Hospital
                </vm-item>

                <vm-item>
                    <vm-icon name='cafe' slot="item-start"></vm-icon>
                    Cafe
                </vm-item>

                <vm-item>
                    <vm-icon name='paw' slot="item-start"></vm-icon>
                    Dog Park
                </vm-item>

                <vm-item>
                    <vm-icon name='beer' slot="item-start"></vm-icon>
                    Pub
                </vm-item>

                <vm-item>
                    <vm-icon name='planet' slot="item-start"></vm-icon>
                    Space
                </vm-item>

            </vm-list>
        </vm-card>


        <vm-card>

            <img src="../../static/img/nin-live.png"/>

            <vm-card-content>
            <vm-card-title>
                Nine Inch Nails Live
            </vm-card-title>
            <p>
                The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.
            </p>
            </vm-card-content>

            <vm-row no-padding>
            <vm-col>
                <vm-button clear small color="danger" icon-start>
                <vm-icon name='star'></vm-icon>
                Favorite
                </vm-button>
            </vm-col>
            <vm-col text-center>
                <vm-button clear small color="danger" icon-start>
                <vm-icon name='musical-notes'></vm-icon>
                Listen
                </vm-button>
            </vm-col>
            <vm-col text-right>
                <vm-button clear small color="danger" icon-start>
                <vm-icon name='share-alt'></vm-icon>
                Share
                </vm-button>
            </vm-col>
            </vm-row>

        </vm-card>

        <vm-card>

            <div>
            <img src="../../static/img/badu-live.png"/>
            </div>

            <vm-card-content>
            <vm-card-title>
                Erykah Badu
            </vm-card-title>
            <p>
            American singer-songwriter, record producer, activist, and actress, Badu's style is a prime example of neo-soul.
            </p>
            </vm-card-content>

            <vm-row no-padding>
            <vm-col>
                <vm-button clear small color="danger" icon-start>
                <vm-icon name='star'></vm-icon>
                Favorite
                </vm-button>
            </vm-col>
            <vm-col text-center>
                <vm-button clear small color="danger" icon-start>
                <vm-icon name='musical-notes'></vm-icon>
                Listen
                </vm-button>
            </vm-col>
            <vm-col text-right>
                <vm-button clear small color="danger" icon-start>
                <vm-icon name='share-alt'></vm-icon>
                Share
                </vm-button>
            </vm-col>
            </vm-row>

        </vm-card>


        <div class="card-background-page">

            <vm-card>
                <img src="../../static/img/card-saopaolo.png"/>
                <div class="card-title">São Paulo</div>
                <div class="card-subtitle">41 Listings</div>
            </vm-card>

            <vm-card>
                <img src="../../static/img/card-amsterdam.png"/>
                <div class="card-title">Amsterdam</div>
                <div class="card-subtitle">64 Listings</div>
            </vm-card>

        </div>

        <div class="social-cards">

            <vm-card>

                <vm-item>
                    <vm-avatar slot="item-start"><img src="../../static/img/marty-avatar.png"></vm-avatar>
                    <vm-label>
                        <h2>Marty McFly</h2>
                        <p>November 5, 1955</p>
                    </vm-label>
                </vm-item>

                <img src="../../static/img/advance-card-bttf.png">

                <vm-card-content>
                    <p>Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.</p>
                </vm-card-content>

                <vm-row>
                    <vm-col>
                        <vm-button color="primary" clear small icon-start>
                            <vm-icon name='thumbs-up'></vm-icon>
                            12 Likes
                        </vm-button>
                    </vm-col>
                    <vm-col>
                        <vm-button color="primary" clear small icon-start>
                            <vm-icon name='text'></vm-icon>
                            4 Comments
                        </vm-button>
                    </vm-col>
                    <vm-col align-self-center text-center>
                        <vm-note>
                            11h ago
                        </vm-note>
                    </vm-col>
                </vm-row>

            </vm-card>
        </div>

    </vm-content>
  </vm-page>
</template>

<script type="text/javascript">
import {Button, Icon, List, Item, Label, Avatar, Note, Card, CardHeader, CardTitle, CardContent, Row, Column} from 'vimon'
export default {
  components: {
    'vm-avatar': Avatar,
    'vm-button': Button,
    'vm-icon': Icon,
    'vm-list': List,
    'vm-item': Item,
    'vm-label': Label,
    'vm-note': Note,
    'vm-card': Card,
    'vm-card-header': CardHeader,
    'vm-card-title': CardTitle,
    'vm-card-content': CardContent,
    'vm-row': Row,
    'vm-col': Column
  },
  data () {
    return {
      editing: false,
      editButton: 'Edit',
      chats: [
        {
          img: require('../../static/img/avatar-cher.png'),
          name: 'Cher',
          message: 'Ugh. As if.',
          time: '9:38 pm'
        },
        {
          img: require('../../static/img/avatar-dionne.png'),
          name: 'Dionne',
          message: 'Mr. Hall was way harsh.',
          time: '8:59 pm'
        },
        {
          img: require('../../static/img/avatar-murray.png'),
          name: 'Murray',
          message: 'Excuse me, "Ms. Dione."',
          time: 'Wed'
        }
      ],
      songs: [
        {
          title: 'Everything Beta',
          band: 'Phoria',
          album: 'Volition'
        },
        {
          title: 'Bohemian Rhapsody',
          band: 'Queen',
          album: 'A Night at the Opera'
        },
        {
          title: "Don't Stop Believin'",
          band: 'Journey',
          album: 'Escape'
        },
        {
          title: 'Smells Like Teen Spirit',
          band: 'Nirvana',
          album: 'Nevermind'
        },
        {
          title: 'All You Need Is Love',
          band: 'The Beatles',
          album: 'Magical Mystery Tour'
        },
        {
          title: 'Hotel California',
          band: 'The Eagles',
          album: 'Hotel California'
        },
        {
          title: 'The Hand That Feeds',
          band: 'Nine Inch Nails',
          album: 'With Teeth'
        }
      ]
    }
  },
  methods: {
    optionClicked (ev, name) {
      console.log('Clicked ' + name)
    },
    toggleEdit () {
      this.editing = !this.editing
      if (this.editing) {
        this.editButton = 'Done'
      } else {
        this.editButton = 'Edit'
      }
    },
    reorderItems (indexes) {
      let element = this.songs[indexes.from]
      this.songs.splice(indexes.from, 1)
      this.songs.splice(indexes.to, 0, element)
    }
  }
}
</script>

<style lang="scss">
.ion-content.cards-bg {
    background-color: #f4f4f7;
}

.ion-card.cards-list-demo .ion-card-header {
  color: map-get($colors, primary);
}

.card-background-page {

  .ion-card {
    position: relative;
    text-align: center;
  }

  .card-title {
    position: absolute;
    top: 36%;
    font-size: 2.0em;
    width: 100%;
    font-weight: bold;
    color: #fff;
  }

  .card-subtitle {
    font-size: 1.0em;
    position: absolute;
    top: 52%;
    width: 100%;
    color: #fff;
  }

}

.social-cards .ion-col {
    padding: 0;
  }
</style>
