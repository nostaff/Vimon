<template>
  <vm-page v-nav="{title: 'List'}">
    <vm-content class="outer-content">

      <vm-list>
        <vm-list-header>Features</vm-list-header>
        <vm-item title="Detail none" link="/button" value="Button" detail-none></vm-item>
        <vm-item title="Title" value="Value" label="Label" link="/button"></vm-item>
      </vm-list>

      <vm-list>
        <vm-list-header>
          Settings
          <vm-button clear icon-only slot="item-end">
            <vm-icon name="cog"></vm-icon>
          </vm-button>
        </vm-list-header>
        <vm-item-group>
          <vm-item>
            <vm-icon name="plane" slot="item-start" color="danger"></vm-icon>
            <vm-label>Airplane Mode</vm-label>
            <vm-toggle slot="item-end" color="secondary"></vm-toggle>
          </vm-item>
          <vm-item>
            <vm-icon name="wifi" slot="item-start" color="primary"></vm-icon>
            <vm-label>Wi-Fi</vm-label>
            <vm-note slot="item-end">The Interwebz</vm-note>
          </vm-item>
          <vm-item>
            <vm-icon name="bluetooth" slot="item-start" color="primary"></vm-icon>
            <vm-label>Bluetooth</vm-label>
            <vm-note slot="item-end">Off</vm-note>
          </vm-item>
        </vm-item-group>
        <vm-item-divider color="primary">
          Other Settings
          <vm-button slot="item-end" outline color="light">Clear</vm-button>
        </vm-item-divider>
        <vm-item>
          <vm-icon name="call" slot="item-start" color="secondary"></vm-icon>
          <vm-label>Cellular</vm-label>
        </vm-item>
        <vm-item>
          <vm-icon name="link" slot="item-start" color="secondary"></vm-icon>
          <vm-label>Personal Hotspot</vm-label>
          <vm-note slot="item-end">Off</vm-note>
        </vm-item>
      </vm-list>
      <vm-list radio-group>
        <vm-list-header>
          Silence Phone
        </vm-list-header>
        <vm-item>
          <vm-label color="dark">Always</vm-label>
          <vm-radio value="always" checked></vm-radio>
        </vm-item>
        <vm-item>
          <vm-label color="dark">Only while phone is locked</vm-label>
          <vm-radio slot="item-end" value="locked"></vm-radio>
        </vm-item>
      </vm-list>
      <vm-list>
        <vm-list-header>
          Apps Installed
        </vm-list-header>
        <vm-item>
          <vm-icon name="ionic" slot="item-start" color="primary"></vm-icon>
          <vm-label>Ionic View</vm-label>
          <vm-button outline slot="item-end">Uninstall</vm-button>
        </vm-item>
        <vm-item>
          <vm-icon name="brush" slot="item-start" color="primary"></vm-icon>
          <vm-label>Ionic Creator</vm-label>
          <vm-button outline slot="item-end">Uninstall</vm-button>
        </vm-item>
        <vm-item>
          <vm-icon name="logo-octocat" slot="item-start" color="dark"></vm-icon>
          <vm-label>Hubstruck</vm-label>
          <vm-button outline slot="item-end">Uninstall</vm-button>
        </vm-item>
        <vm-item>
          <vm-icon name="paw" slot="item-start" color="danger"></vm-icon>
          <vm-label>Barkpark</vm-label>
          <vm-button outline slot="item-end">Uninstall</vm-button>
        </vm-item>
      </vm-list>

      <vm-list title="Item Group">
        <vm-item-group title="A" color="primary">
          <vm-item>
            <vm-label>AngolaAngola00000</vm-label>
          </vm-item>
          <vm-item>Angola</vm-item>
          <vm-item>Argentina</vm-item>
        </vm-item-group>

        <vm-item-group title="B" color="secondary">
          <vm-item>Angola</vm-item>
          <vm-item>Argentina</vm-item>
          <vm-item>Angola</vm-item>
        </vm-item-group>
      </vm-list>

      <vm-list title="Inset" inset>
        <vm-item>Terminator II</vm-item>
        <vm-item>The Empire Strikes Back</vm-item>
        <vm-item>Blade Runner</vm-item>
      </vm-list>

      <vm-list>
        <vm-item>
          <vm-icon slot="item-start" name="leaf"></vm-icon>
          Herbology
          <vm-icon slot="item-end" name="rose"></vm-icon>
        </vm-item>
      </vm-list>

      <vm-list title="Multi Lines">
        <vm-item detail-push>
          <vm-avatar slot="item-start">
            <img src="/static/avatar/1.png">
          </vm-avatar>
          <vm-label>
            <h2>Cher</h2>
            <p>Ugh. As if.</p>
          </vm-label>
        </vm-item>
        <vm-item>
          <vm-avatar slot="item-start">
            <img src="/static/avatar/2.png">
          </vm-avatar>
          <vm-label>
            <h2>Finn</h2>
            <h3>Don't Know What To Do!</h3>
            <p>I've had a pretty messed up day. If we just...</p>
          </vm-label>
        </vm-item>
        <vm-item>
          <vm-thumbnail slot="item-start">
            <img src="/static/avatar/3.png">
          </vm-thumbnail>
          <vm-label>
            <h2>My Neighbor Totoro</h2>
            <p>Hayao Miyazaki • 1988</p>
          </vm-label>
          <vm-button slot="item-end">View</vm-button>
        </vm-item>
        <vm-item is-link>
          <vm-thumbnail slot="item-start">
            <img src="/static/avatar/4.png">
          </vm-thumbnail>
          <vm-label>
            <h2>Pretty Hate Machine</h2>
            <p>Nine Inch Nails</p>
          </vm-label>
          <vm-button slot="item-end" clear>View</vm-button>
        </vm-item>
      </vm-list>

      <vm-list title="item sliding">
        <vm-item-sliding :key="index" v-for="(chat, index) in chats">
          <vm-item>
            <vm-avatar slot="item-start">
              <img :src="chat.img">
            </vm-avatar>
            <vm-label>
              <h2>{{chat.name}}</h2>
              <p>{{chat.message}}</p>
            </vm-label>
            <vm-note slot="item-end">
              {{chat.time}}
            </vm-note>
          </vm-item>
          <vm-item-options>
            <vm-button color="secondary" @click="optionClicked($event, 'menu')">
              <vm-icon name="menu"></vm-icon>
              More
            </vm-button>
            <vm-button color="dark" @click="optionClicked($event, 'volume-off')">
              <vm-icon name="volume-off"></vm-icon>
              Mute
            </vm-button>
            <vm-button color="danger" @click="optionClicked($event, 'trash')">
              <vm-icon name="trash"></vm-icon>
              Delete
            </vm-button>
          </vm-item-options>
          <vm-item-options side="left">
            <vm-button color="primary" @click="optionClicked($event, 'archive')">
              <vm-icon name="archive"></vm-icon>
              Archive
            </vm-button>
          </vm-item-options>
        </vm-item-sliding>
      </vm-list>

      <vm-list class="chat-sliding-demo">
        <vm-list-header>
          Reorder
          <vm-button slot="item-end" outline @click="toggleEdit()">{{editButton}}</vm-button>
        </vm-list-header>
        <vm-item-group reorder="true" :reorder-enabled="editing" @onItemReorder="reorderItems($event)">
          <vm-item :key="index" v-for="(song, index) in songs">
            <vm-label>
              <h2>{{ song.title }}</h2>
              <p>{{ song.band }} • {{ song.album }}</p>
            </vm-label>
          </vm-item>
        </vm-item-group>
      </vm-list>

    </vm-content>
  </vm-page>
</template>

<script type="text/javascript">
import {Button, Icon, List, ListHeader, Item, ItemGroup, ItemDivider, ItemSliding, ItemOptions, Label, Avatar, Note, Radio, Toggle, Thumbnail} from 'vimon'
export default {
  components: {
    'vm-avatar': Avatar,
    'vm-button': Button,
    'vm-icon': Icon,
    'vm-list': List,
    'vm-list-header': ListHeader,
    'vm-item': Item,
    'vm-item-group': ItemGroup,
    'vm-item-divider': ItemDivider,
    'vm-item-sliding': ItemSliding,
    'vm-item-options': ItemOptions,
    'vm-label': Label,
    'vm-note': Note,
    'vm-radio': Radio,
    'vm-toggle': Toggle,
    'vm-thumbnail': Thumbnail
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
