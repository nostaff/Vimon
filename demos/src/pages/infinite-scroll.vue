<template>
    <vm-page v-nav="{title: 'Infinite Scroll'}">
        <vm-content>
            <vm-list>
                <vm-item v-for="(item,index) in items" :key="index">{{item}}</vm-item>
            </vm-list>

            <vm-infinite-scroll @onInfinite="doInfinite($event)"
                                 threshold="100px"
                                 loadingSpinner="bubbles"
                                 loadingText="Loading more data...">
            </vm-infinite-scroll>
        </vm-content>
    </vm-page>
</template>

<script type="text/javascript">
import {Button, Icon, List, Item, InfiniteScroll} from 'vimon'
export default {
  components: {
    'vm-button': Button,
    'vm-icon': Icon,
    'vm-list': List,
    'vm-item': Item,
    'vm-infinite-scroll': InfiniteScroll
  },
  data () {
    return {
      items: [],

      data: [
        'Fast Times at Ridgemont High',
        'Peggy Sue Got Married',
        'Raising Arizona',
        'Moonstruck',
        'Fire Birds',
        'Honeymoon in Vegas',
        'Amos & Andrew',
        'It Could Happen to You',
        'Trapped in Paradise',
        'Leaving Las Vegas',
        'The Rock',
        'Con Air',
        'Face/Off',
        'City of Angels',
        'Gone in Sixty Seconds',
        'The Family Man',
        'Windtalkers',
        'Matchstick Men',
        'National Treasure',
        'Ghost Rider',
        'Grindhouse',
        'Next',
        'Kick-Ass',
        'Drive Angry'
      ]
    }
  },
  methods: {
    doInfinite (infiniteScroll) {
      this.getAsyncData().then(newData => {
        for (var i = 0; i < newData.length; i++) {
          this.items.push(newData[i])
        }

        infiniteScroll.complete()

        if (this.items.length > 90) {
          infiniteScroll.enable(false)
        }
      })
    },
    getData () {
      // return mock data synchronously
      let data = []
      for (var i = 0; i < 20; i++) {
        data.push(this._getRandomData())
      }
      return data
    },

    getAsyncData () {
      // async receive mock data
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.getData())
        }, 500)
      })
    },

    _getRandomData () {
      let i = Math.floor(Math.random() * this.data.length)
      return this.data[i]
    }
  },
  created () {
    this.items = this.getData()
  }
}
</script>
