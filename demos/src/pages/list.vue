<template>
    <ion-page v-nav="{title: 'List 列表'}">
        <ion-content class="outer-content">

            <ion-list>
                <ion-list-header>
                    Settings
                    <ion-button clear icon-only slot="item-end">
                        <ion-icon name="cog"></ion-icon>
                    </ion-button>
                </ion-list-header>
                <ion-item-group>
                <ion-item>
                    <ion-icon name="plane" slot="item-start" color="danger"></ion-icon>
                    <ion-label slot="item-label">Airplane Mode</ion-label>
                    <ion-toggle slot="item-end" color="secondary"></ion-toggle>
                </ion-item>
                <ion-item>
                    <ion-icon name="wifi" slot="item-start" color="primary"></ion-icon>
                    <ion-label slot="item-label">Wi-Fi</ion-label>
                    <ion-note slot="item-end">The Interwebz</ion-note>
                </ion-item>
                <ion-item>
                    <ion-icon name="bluetooth" slot="item-start" color="primary"></ion-icon>
                    <ion-label slot="item-label">Bluetooth</ion-label>
                    <ion-note slot="item-end">Off</ion-note>
                </ion-item>
                </ion-item-group>
                <ion-item-divider color="primary">
                    Other Settings
                    <ion-button slot="item-end" outline color="light">Clear</ion-button>
                </ion-item-divider>
                <ion-item>
                    <ion-icon name="call" slot="item-start" color="secondary"></ion-icon>
                    <ion-label slot="item-label">Cellular</ion-label>
                </ion-item>
                <ion-item>
                    <ion-icon name="link" slot="item-start" color="secondary"></ion-icon>
                    <ion-label slot="item-label">Personal Hotspot</ion-label>
                    <ion-note slot="item-end">Off</ion-note>
                </ion-item>
            </ion-list>
            <ion-list radio-group>
                <ion-list-header>
                    Silence Phone
                </ion-list-header>
                <ion-item>
                    <ion-label slot="item-label" color="dark">Always</ion-label>
                    <ion-radio slot="item-content" value="always" checked></ion-radio>
                </ion-item>
                <ion-item>
                    <ion-label slot="item-label" color="dark">Only while phone is locked</ion-label>
                    <ion-radio slot="item-content" value="locked"></ion-radio>
                </ion-item>
            </ion-list>
            <ion-list>
                <ion-list-header>
                    Apps Installed
                </ion-list-header>
                <ion-item>
                    <ion-icon name="ionic" slot="item-start" color="primary"></ion-icon>
                    <ion-label slot="item-label">Ionic View</ion-label>
                    <ion-button outline slot="item-end">Uninstall</ion-button>
                </ion-item>
                <ion-item>
                    <ion-icon name="brush" slot="item-start" color="primary"></ion-icon>
                    <ion-label slot="item-label">Ionic Creator</ion-label>
                    <ion-button outline slot="item-end">Uninstall</ion-button>
                </ion-item>
                <ion-item>
                    <ion-icon name="logo-octocat" slot="item-start" color="dark"></ion-icon>
                    <ion-label slot="item-label">Hubstruck</ion-label>
                    <ion-button outline slot="item-end">Uninstall</ion-button>
                </ion-item>
                <ion-item>
                    <ion-icon name="paw" slot="item-start" color="danger"></ion-icon>
                    <ion-label slot="item-label">Barkpark</ion-label>
                    <ion-button outline slot="item-end">Uninstall</ion-button>
                </ion-item>
            </ion-list>


            <ion-list title="Item Group">
                <ion-item-group title="A" color="primary">
                    <ion-item>
                        <ion-label slot="item-label">AngolaAngola00000</ion-label>
                    </ion-item>
                    <ion-item>Angola</ion-item>
                    <ion-item>Argentina</ion-item>
                </ion-item-group>

                <ion-item-group title="B" color="secondary">
                    <ion-item>Angola</ion-item>
                    <ion-item>Argentina</ion-item>
                    <ion-item>Angola</ion-item>
                </ion-item-group>
            </ion-list>

            <ion-list title="Inset" inset>
                <ion-item>Terminator II</ion-item>
                <ion-item>The Empire Strikes Back</ion-item>
                <ion-item>Blade Runner</ion-item>
            </ion-list>

            <ion-list title="no lines" no-lines>
                <ion-item>
                    小标题
                </ion-item>
                <ion-item>
                    正文
                    <ion-note slot="item-end">note</ion-note>
                </ion-item>
                <ion-item  detail-push>
                    文字
                    <ion-note slot="item-end">note</ion-note>
                </ion-item>
                <ion-item link="/home">
                    带link的文字
                    <ion-note slot="item-end">note</ion-note>
                </ion-item>

                <ion-item>
                    带badge的文字
                    <ion-badge slot="item-end" color="primary">5</ion-badge>
                </ion-item>
            </ion-list>

            <ion-list>
                <ion-item>
                    <ion-icon slot="item-start" name="leaf"></ion-icon>
                    Herbology
                    <ion-icon slot="item-end" name="rose"></ion-icon>
                </ion-item>
            </ion-list>

            <ion-list title="Multi Lines">
                <ion-item detail-push>
                    <ion-avatar slot="item-start">
                        <img src="http://ionicframework.com/dist/preview-app/www/assets/img/spengler.jpg">
                    </ion-avatar>
                    <h2>Cher</h2>
                    <p>Ugh. As if.</p>
                </ion-item>
                <ion-item>
                    <ion-avatar slot="item-start">
                        <img src="http://ionicframework.com/dist/preview-app/www/assets/img/spengler.jpg">
                    </ion-avatar>
                    <h2>Finn</h2>
                    <h3>Don't Know What To Do!</h3>
                    <p>I've had a pretty messed up day. If we just...</p>
                </ion-item>
                <ion-item>
                    <ion-thumbnail slot="item-start">
                        <img src="http://ionicframework.com/dist/preview-app/www/assets/img/thumbnail-rotla.png">
                    </ion-thumbnail>
                    <h2>My Neighbor Totoro</h2>
                    <p>Hayao Miyazaki • 1988</p>
                    <ion-button slot="item-end">View</ion-button>
                </ion-item>
                <ion-item is-link>
                    <ion-thumbnail slot="item-start">
                        <img src="http://ionicframework.com/img/docs/siamese-dream.jpg">
                    </ion-thumbnail>
                    <h2>Pretty Hate Machine</h2>
                    <p>Nine Inch Nails</p>
                    <ion-button slot="item-end" clear>View</ion-button>
                </ion-item>
            </ion-list>

            <ion-list title="item sliding">
                <ion-item-sliding :key="index" v-for="(chat, index) in chats" key="index">
                    <ion-item>
                        <ion-avatar slot="item-start">
                            <img :src="chat.img">
                        </ion-avatar>
                        <h2>{{chat.name}}</h2>
                        <p>{{chat.message}}</p>
                        <ion-note  slot="item-end">
                            {{chat.time}}
                        </ion-note>
                    </ion-item>
                    <ion-item-options>
                        <ion-button color="secondary" @click.native="optionClicked($event)">
                            <ion-icon name="menu"></ion-icon>
                            More
                        </ion-button>
                        <ion-button color="dark" @click.native="optionClicked($event)">
                            <ion-icon name="volume-off"></ion-icon>
                            Mute
                        </ion-button>
                        <ion-button color="danger" @click.native="optionClicked($event)">
                            <ion-icon name="trash"></ion-icon>
                            Delete
                        </ion-button>
                    </ion-item-options>
                    <ion-item-options side="left">
                        <ion-button color="primary" @click.native="optionClicked($event)">
                            <ion-icon name="archive"></ion-icon>
                            Archive
                        </ion-button>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>

            <ion-list class="chat-sliding-demo">
                <ion-list-header>
                    Reorder
                    <ion-button slot="item-end" outline @click.native="toggleEdit()">{{editButton}}</ion-button>
                </ion-list-header>
                <ion-item-group reorder="true" :reorderEnabled="editing" @onItemReorder="reorderData($event)">
                    <ion-item :key="song" v-for="song in songs">
                        <h2>{{ song.title }}</h2>
                        <p>{{ song.band }} • {{ song.album }}</p>
                    </ion-item>
                </ion-item-group>
            </ion-list>
        </ion-content>

        <ion-footer>
            <ion-toolbar>
                <ion-title>Scrolls with the content</ion-title>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>


<script>
    import { reorderArray } from 'vimon/util/util'
    export default{
      data () {
        return {
          editing: false,
          editButton: 'Edit',
          chats: [{
            img: 'http://ionicframework.com/docs/pages/pages/item-sliding/www/assets/avatar-cher.png',
            name: 'Cher',
            message: 'Ugh. As if.',
            time: '9:38 pm'
          }, {
            img: 'http://ionicframework.com/docs/pages/pages/item-sliding/www/assets/avatar-dionne.png',
            name: 'Dionne',
            message: 'Mr. Hall was way harsh.',
            time: '8:59 pm'
          }, {
            img: 'http://ionicframework.com/docs/pages/pages/item-sliding/www/assets/avatar-murray.png',
            name: 'Murray',
            message: 'Excuse me, "Ms. Dione."',
            time: 'Wed'
          }, {
            img: 'http://ionicframework.com/dist/preview-app/www/assets/img/thumbnail-rotla.png',
            name: 'Rotla',
            message: 'That\'s OK',
            time: 'Yesterday'
          }],
          songs: [
            {
              title: 'Everything Beta',
              band: 'Phoria',
              album: 'Volition'
            },
            {
              title: 'Hello',
              band: 'Adele',
              album: '25'
            },
            {
              title: 'Bohemian Rhapsody',
              band: 'Queen',
              album: 'A Night at the Opera'
            },
            {
              title: 'Don\'t Stop Believin\'',
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
            },
            {
              title: 'Who Are You',
              band: 'The Who',
              album: 'Who Are You'
            }]
        }
      },
      methods: {
        optionClicked (ev) {
          console.log(ev.target)
        },
        toggleEdit () {
          this.editing = !this.editing
          if (this.editing) {
            this.editButton = 'Done'
          } else {
            this.editButton = 'Edit'
          }
        },
        reorderData (indexes) {
          this.songs = reorderArray(this.songs, indexes.from, indexes.to)
        }
      }
    }
</script>
