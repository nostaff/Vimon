<template>
    <ion-page v-nav="{title: 'Refresher'}">
        <ion-content>
            <ion-refresher slot="refresher"
                           :enabled="enabled"
                           pullingText="Pull to refresh..." r
                           efreshingText="Refreshing..."
                           @onRefresh="doRefresh($event)"
                           @onStart="doStart($event)"
                           @onPull="doPulling($event)"></ion-refresher>
            <div padding class="state" text-center>
                <p>状态: {{enabled}}</p>
                <ion-button small outline @click.native="toggleDisabled">禁用/启用</ion-button>
            </div>
            <ion-list>
                <ion-item v-for="(item,index) in items" :key="index">{{item}}</ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<style scoped lang="scss">
    .state {
        background: #fff;
    }
</style>
<script type="text/javascript">
    export default{
      data () {
        return {
          items: [],
          enabled: true,

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
        toggleDisabled () {
          this.enabled = !this.enabled
        },
        doRefresh (refresher) {
          console.log('DOREFRESH', refresher)

          this.getAsyncData().then((newData) => {
            for (var i = 0; i < newData.length; i++) {
              this.items.unshift(newData[i])
            }

            refresher.complete()
          })
        },

        doPulling (refresher) {
          console.log('DOPULLING', refresher.progress)
        },

        doStart (refresher) {
          console.log('STARTING', refresher.progress)
        },

        getData () {
          // return mock data synchronously
          let data = []
          for (var i = 0; i < 20; i++) {
            data.unshift(this._getRandomData())
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

        console.log(this.items)
      }
    }
</script>

